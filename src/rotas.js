const express = require('express')
const rota = express.Router()

const { listarCategorias } = require('./controladores/categorias')
const { cadastrarUsuario, detalharPerfilUsuarioLogado, editarUsuario, } = require('./controladores/usuarios')
const { cadastrarProduto, editarProduto, listarProdutos, detalharProduto, excluirProduto } = require('./controladores/produtos')
const validarRequisicao = require('./intermediarios/validarRequisicao')
const usuarioSchema = require('./validacoes/usuarioSchema')
const loginSchema = require('./validacoes/loginSchema')
const produtoSchema = require('./validacoes/produtoSchema')
const loginUsuario = require('./controladores/login')
const verificarUsuarioLogado = require('./intermediarios/validarUsuarioLogado')
const clienteSchema = require('./validacoes/clienteSchema')
const { cadastrarCliente, editarCliente, listarClientes, detalharCliente, editarEnderecoCliente } = require('./controladores/clientes')
const enderecoClienteSchema = require('./validacoes/enderecoClienteSchema')

rota.post('/usuario', validarRequisicao(usuarioSchema), cadastrarUsuario)
rota.post('/login', validarRequisicao(loginSchema), loginUsuario)
rota.get('/categoria', listarCategorias)

rota.use(verificarUsuarioLogado)

rota.get('/usuario', detalharPerfilUsuarioLogado)
rota.put('/usuario', validarRequisicao(usuarioSchema), editarUsuario)

rota.post('/produto', validarRequisicao(produtoSchema), cadastrarProduto)
rota.get('/produto', listarProdutos)
rota.put('/produto/:id', validarRequisicao(produtoSchema), editarProduto)
rota.get('/produto/:id', detalharProduto)
rota.delete('/produto/:id', excluirProduto)

rota.post('/cliente', validarRequisicao(clienteSchema), cadastrarCliente)
rota.put('/cliente/:id/endereco', validarRequisicao(enderecoClienteSchema), editarEnderecoCliente)
rota.put('/cliente/:id', validarRequisicao(clienteSchema), editarCliente)
rota.get('/cliente', listarClientes)
rota.get('/cliente/:id', detalharCliente)

module.exports = rota
