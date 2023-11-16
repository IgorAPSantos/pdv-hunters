const knex = require('../conexoes/bancodedados')

const cadastrarCliente = async (req, res) => {
  const { nome, email, cpf } = req.body

  try {
    const emailJaExiste = await knex('clientes').where({ email }).first()

    if (emailJaExiste) {
      return res.status(400).json({ mensagem: "Este email já está cadastrado." })
    }

    const cpfJaExiste = await knex('clientes').where({ cpf }).first()

    if (cpfJaExiste) {
      return res.status(400).json({ mensagem: "Este CPF já está cadastrado." })
    }

    const novoCliente = {
      nome: nome.trim(),
      email,
      cpf
    }

    await knex('clientes').insert(novoCliente)

    return res.status(200).json({ novoCliente })

  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor." })
  }
};

const editarCliente = async (req, res) => {
  const { nome, email, cpf } = req.body;
  const { id } = req.params;

  try {
    const cliente = await knex('clientes').where({ id }).first()

    if (!cliente) {
      return res.status(404).json({ mensagem: 'Cliente não encontrado.' })
    }

    const cpfJaExiste = await knex('clientes').where({ cpf }).whereNot('id', id).first()
    const emailJaExiste = await knex('clientes').where({ email }).whereNot('id', id).first()

    if (cpfJaExiste) {
      return res.status(400).json({ mensagem: 'Este CPF já está cadastrado.' })
    }

    if (emailJaExiste) {
      return res.status(400).json({ mensagem: 'Este email já está cadastrado.' })
    }

    const clienteAtualizado = await knex('clientes').update({
      nome: nome.trim(),
      email,
      cpf
    }).where({ id }).returning('*')

    return res.json({ clienteAtualizado: clienteAtualizado[0] })

  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor." })
  }
};

const listarClientes = async (req, res) => {

  try {
    const clientes = await knex('clientes')

    if (!clientes) {
      return res.status(404).json({ mensagem: 'Cliente(s) nao encontrado(s).' })
    }

    return res.json(clientes)
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor.' })
  }

};

const detalharCliente = async (req, res) => {
  const { id } = req.params;

  try {
    const cliente = await knex('clientes').where({ id }).first()

    if (!cliente) {
      return res.status(404).json({ mensagem: 'Cliente não encontrado.' })
    }

    return res.json(cliente)

  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor." })
  }
};

const editarEnderecoCliente = async (req, res) => {
  const { cep, rua, numero, bairro, cidade, estado } = req.body
  const { id } = req.params

  if (!cep && !rua && !numero && !bairro && !cidade && !estado) {
    return res.status(400).json({ mensagem: 'É necessário preencher pelo menos um dos campos de endereço.' })
  }

  try {
    const cliente = await knex('clientes').where({ id }).first()
    if (!cliente) {
      return res.status(404).json({ mensagem: 'Cliente não encontrado.' })
    }
    const novoEndereco = {
      cep: cep ?? cliente.cep,
      rua: rua ?? cliente.rua,
      numero: numero ?? cliente.numero,
      bairro: bairro ?? cliente.bairro,
      cidade: cidade ?? cliente.cidade,
      estado: estado ?? cliente.estado,
    }

    const clienteAtualizado = await knex('clientes').where({ id }).update(novoEndereco).returning('*')

    return res.json(clienteAtualizado)
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor." })
  }
}
module.exports = {
  cadastrarCliente,
  editarCliente,
  listarClientes,
  detalharCliente,
  editarEnderecoCliente
}