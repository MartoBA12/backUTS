const express = require('express')
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
require('dotenv').config()

const app = express()

//Caprurar el Body
app.use(bodyparser.urlencoded({
    ectended: false
}))
app.use(bodyparser.json())

//Coneccion a la base de datos
const url = `mongodb+srv://${process.env.USUARIO}:${process.env.PASSWORD}@cluster0.r92vs0a.mongodb.net/${process.env.DBNAME}`
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('conectado a la Base de Datos!!!'))
.catch((error) => console.log('Error: ' + error))

//Creacion e Importacion de Rutas
const authRoutes = require('./routes/auth')

//Rutas del middleware
app.use('/api/user', authRoutes)


//Ruta Raiz
app.get('/', (req, res) =>{
    res.json({
        estado: true,
        mensaje: 'Si funciona... vamos a comer!!!'
    })
})

//Arrancamos el servidor
const PORT = process.env.PORT || 9000
app.listen(PORT, () =>{
    console.log(`Escuchando en el puerto: ${PORT}`)
})