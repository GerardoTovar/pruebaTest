import 'dotenv/config'
import './mongo.js'
// import { fileURLToPath } from 'url'
import express from 'express'
// import path from 'path'
import cors from 'cors'
// RUTAS
import taskRouter from './routes/Task.js'

// CREA EL SERVIDOR DE EXPRESS
const app = express()
// CONFIGURACION DE CORS
app.use(cors())
// CARPETA PUBLICA
app.use(express.static('public'))
// LECTURA Y PARSEO DEL BODY
app.use(express.json())

// RUTAS
app.use('/api/task', taskRouter)

/*
  app.use('*', (req, res) => {
  // OPTENEMOS LA RAIZ DEL DIRECTORIO
    const __dirname = path.dirname(fileURLToPath(import.meta.url))
    res.sendFile(path.resolve(__dirname, 'public/index.html'))
  })
*/
export default app
