import express from 'express'
import cors from 'cors'

const app = express()
const PORT = 3000
const OLLAMA_URL = 'http://localhost:11434/api/chat'
const MODEL = 'deepseek-r1:1.5b'

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

app.post('/api/chat', async (req, res, next) => {
    try {
        const { messages } = req.body

        if (!Array.isArray(messages) || messages.length === 0) {
            return res.status(400).json({ error: 'Se requiere un arreglo "messages"' })
        }

        const response = await fetch(OLLAMA_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ model: MODEL, messages, stream:false }),
        })

        if (!response.ok) {
            return res.status(502).json({ error: `Ollama respondió ${response.status}` })
        }

        res.json(await response.json())
    } catch(err) {
        next(err)
    }
})

app.use((err, req, res, next) => {
    console.error(err)
    res.status(500).json({ error: 'No se pudo conectar con Ollama'})
})

app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`))