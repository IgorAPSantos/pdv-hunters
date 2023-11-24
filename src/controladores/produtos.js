const knex = require('../conexoes/bancodedados')
const s3 = require('../conexoes/s3')

const cadastrarProduto = async (req, res) => {
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body
    const { file } = req
    try {
        const categoria = await knex('categorias').where({ id: categoria_id }).first()
        if (!categoria) {
            return res.status(404).json({ mensagem: 'Não foi possível encontrar a categoria informada.' })
        }

        const produtoJaExiste = await knex('produtos').where({ descricao }).first()
        if (produtoJaExiste) {
            return res.status(400).json({ mensagem: 'Este produto já está cadastrado.' })
        }

        const produto = {
            descricao,
            quantidade_estoque,
            valor,
            categoria_id
        }

        if (file) {
            const novaImagem = await s3.uploadFile(
                `imagens/${file.originalname}`,
                file.buffer,
                file.mimetype
            )
            produto.produto_imagem = novaImagem.url
        }

        const novoProduto = await knex('produtos').insert(produto).returning('*')
        if (!novoProduto) {
            return res.status(400).json({ mensagem: 'Não foi possível cadastrar o produto.' })
        }

        return res.json({ novoProduto: novoProduto[0] })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            mensagem: 'Erro interno do servidor.'
        })
    }
}

const editarProduto = async (req, res) => {
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body
    const { id } = req.params
    const { file } = req

    try {
        const produto = await knex('produtos').where({ id }).first()

        if (!produto) {
            return res.status(404).json({ mensagem: 'Produto não encontrado.' })
        }

        const categoria = await knex('categorias').where({ id: categoria_id }).first()

        if (!categoria) {
            return res.status(404).json({ mensagem: 'Categoria não encontrada.' })
        }

        const produtoJaExiste = await knex('produtos').where({ descricao }).andWhere('id', '!=', id).first()

        if (produtoJaExiste) {
            return res.status(400).json({ mensagem: 'Este produto já está cadastrado.' })
        }
        const produtoModelo = {
            descricao,
            quantidade_estoque,
            valor,
            categoria_id
        }

        if (file) {
            const novaImagem = await s3.uploadFile(
                `imagens/${file.originalname}`,
                file.buffer,
                file.mimetype
            )
            produtoModelo.produto_imagem = novaImagem.url
        }
        const produtoAtualizado = await knex('produtos').update(produtoModelo).where({ id }).returning('*')

        if (!produtoAtualizado) {
            return res.status(400).json({ mensagem: 'Não foi possível atualizar o produto.' })
        }

        return res.json({ produtoAtualizado: produtoAtualizado[0] })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            mensagem: 'Erro interno do servidor.'
        })
    }
}

const listarProdutos = async (req, res) => {
    const { categoria_id } = req.query
    try {
        if (categoria_id) {
            const categoria = await knex('categorias').where({ id: categoria_id }).first()

            if (!categoria) {
                return res.status(404).json({ mensagem: 'Categoria não encontrada.' })
            }

            const produtos = await knex('produtos').where({ categoria_id }).orderBy("id")
            if (produtos.length < 1) {
                return res.status(404).json({ mensagem: 'Produto(s) não encontrado(s).' })
            }
            return res.json(produtos)
        }
        const produtos = await knex('produtos').orderBy("id")
        return res.json(produtos)

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            mensagem: 'Erro interno do servidor.'
        })
    }
}

const detalharProduto = async (req, res) => {
    const { id } = req.params

    try {
        const produto = await knex('produtos').select('produtos.*', 'categorias.descricao as categoria_nome')
            .join('categorias', 'produtos.categoria_id', 'categorias.id')
            .where('produtos.id', id).first()

        if (!produto) {
            return res.status(404).json({ mensagem: `Produto não foi encontrado.` })
        }

        return res.status(200).json(produto)
    } catch (error) {
        console.log(error)
        return res.status(404).json({ mensagem: "Erro interno do servidor." })
    }
}

const excluirProduto = async (req, res) => {
    const { id } = req.params

    try {
        const produtoDeletar = await knex('produtos').where({ id }).first()

        if (!produtoDeletar) {
            return res.status(404).json({ mensagem: `Produto não foi encontrado.` })
        }

        const produtoEmPedido = await knex('pedido_produtos').where({ produto_id: id }).first()

        if (produtoEmPedido) {
            return res.status(400).json({ mensagem: `Não foi posível excluir o produto pois o mesmo se encontra em um pedido.` })
        }
        const { produto_imagem, ...produtoDel } = produtoDeletar

        if (produto_imagem != null) {
            const imagens = await s3.listFiles()
            const imagem = imagens.find(img => img.url === produto_imagem)
            await s3.deleteFile(imagem.path)
        }

        await knex('produtos').where({ id }).del()

        return res.status(201).json({ produtoExcluido: produtoDel })

    } catch (error) {
        console.log(error)
        return res.status(200).json({ mensagem: "Erro interno do servidor" })
    }
}

module.exports = {
    cadastrarProduto,
    editarProduto,
    listarProdutos,
    detalharProduto,
    excluirProduto
}