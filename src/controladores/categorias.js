const knex = require('../conexoes/bancodedados')

const listarCategorias = async (req, res) => {

  try {
    const categorias = await knex('categorias')

    if (!categorias) {
      return res.status(404).json({ mensagem: 'Categoria(s) nao encontrada(s).' })
    }
    
    return res.status(200).json(categorias) 
  } catch(error) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor.' })
  }
}

module.exports = {
  listarCategorias
}