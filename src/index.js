require('dotenv').config();
const express = require('express');
const cors = require('cors')

const app = express();
const rotas = require('./rotas')

app.use(cors())
app.use(express.json());
app.use(rotas)

app.listen(process.env.PORT, () => {
     console.log(`Servidor esta de pe na porta ${process.env.PORT}`)
}) 