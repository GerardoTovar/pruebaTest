import mongoose from 'mongoose'
const { MONGO_DB_URI, MONGO_DB_URI_TEST, NODE_ENV } = process.env
const connectionString = NODE_ENV === 'test' ? MONGO_DB_URI_TEST : MONGO_DB_URI

if (!connectionString) {
  console.error(
    `Recuerda que tienes que tener un archivo .env con las variables de entorno definidas y el MONGO_DB_URI 
    servirá de connection string. En este ejemplo usamos MongoDB Atlas pero puedes usar cualquier base de datos 
    de MongoDB (local incluso).`
  )
} else {
  console.log(`Server running on ${NODE_ENV} environment`)
}

// conexión a mongodb
try {
  await mongoose.connect(connectionString)
  console.log('Database connected')
} catch (err) {
  console.error(err)
}

process.on('uncaughtException', (error) => {
  console.error(error)
  mongoose.disconnect()
})
