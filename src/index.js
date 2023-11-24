require('dotenv').config();
const express = require('express');

const app  = express();
const rotas = require('./rotas') 

app.set('views', 'views')
app.set('view engine', 'ejs')
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static('views'))
app.use(rotas)

app.listen(process.env.PORT, () => {
     console.log(`Servidor esta de pe na porta ${process.env.PORT}`)
}) 