const express = require('express')
const rota = express.Router()

const controlador_categorias = require('./controladores/categorias')
const controlador_usuarios = require('./controladores/usuarios')
const controlador_loginUsuario = require('./controladores/login')
const controlador_produtos = require('./controladores/produtos')
const controlador_clientes = require('./controladores/clientes')
const controlador_pedidos = require('./controladores/pedidos')

const intermediario_validarRequisicao = require('./intermediarios/validarRequisicao')
const intermediario_verificarUsuarioLogado = require('./intermediarios/validarUsuarioLogado')
const intermediario_multer = require('./multer')

const usuarioSchema = require('./validacoes/usuarioSchema')
const loginSchema = require('./validacoes/loginSchema')
const produtoSchema = require('./validacoes/produtoSchema')
const clienteSchema = require('./validacoes/clienteSchema')
const enderecoClienteSchema = require('./validacoes/enderecoClienteSchema')
const pedidoSchema = require('./validacoes/pedidoSchema')


rota.post('/usuario', intermediario_validarRequisicao(usuarioSchema), controlador_usuarios.cadastrarUsuario)
rota.post('/login', intermediario_validarRequisicao(loginSchema), controlador_loginUsuario)
rota.get('/categoria', controlador_categorias.listarCategorias)

rota.use(intermediario_verificarUsuarioLogado)

rota.get('/usuario', controlador_usuarios.detalharPerfilUsuarioLogado)
rota.put('/usuario', intermediario_validarRequisicao(usuarioSchema), controlador_usuarios.editarUsuario)

rota.post('/produto', intermediario_multer.single('produto_imagem'), intermediario_validarRequisicao(produtoSchema), controlador_produtos.cadastrarProduto)
rota.get('/produto', controlador_produtos.listarProdutos)
rota.put('/produto/:id', intermediario_multer.single('produto_imagem'), intermediario_validarRequisicao(produtoSchema), controlador_produtos.editarProduto)
rota.get('/produto/:id', controlador_produtos.detalharProduto)
rota.delete('/produto/:id', controlador_produtos.excluirProduto)

rota.post('/cliente', intermediario_validarRequisicao(clienteSchema), controlador_clientes.cadastrarCliente)
rota.put('/cliente/:id/endereco', intermediario_validarRequisicao(enderecoClienteSchema), controlador_clientes.editarEnderecoCliente)
rota.put('/cliente/:id', intermediario_validarRequisicao(clienteSchema), controlador_clientes.editarCliente)
rota.get('/cliente', controlador_clientes.listarClientes)
rota.get('/cliente/:id', controlador_clientes.detalharCliente)

rota.post('/pedido', intermediario_validarRequisicao(pedidoSchema), controlador_pedidos.cadastrarPedido)
rota.get('/pedido', controlador_pedidos.listarPedidos)

module.exports = rota
