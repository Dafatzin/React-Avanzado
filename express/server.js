import express from 'express'
import cors from 'cors'
import chatRouter from './routes/chat.js'

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`)
    next()
})

app.get('/', (req, res) => {
    res.send('Servidor Express funcionando')
})

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', mensaje: 'El backend está vivo'})  
})

app.use('/api/chat', chatRouter) 
    
app.use((req, res) => {
    res.status(404).json({ error: `Ruta ${req.method} ${req.originalUrl} no encontrada`})
})

app.use((err, req, res, next) => {
    console.error(err)
    res.status(500).json({ error: 'No se pudo conectar con Ollama'})
})

app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`))