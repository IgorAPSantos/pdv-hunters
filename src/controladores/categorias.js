const knex = require('../conexoes/bancodedados')

const listarCategorias = async (req, res) => {

  try {
    const categorias = await knex('categorias')

    if (!categorias) {
      return res.status(404).json({ mensagem: 'Categorias nao encontradas' })
    }
    
    return res.status(200).json(categorias) 
  } catch(error) {
    console.log(error)
    return res.status(500).json({ mensagem: 'Erro interno do servidor' })
  }
}

module.exports = {
  listarCategorias
}