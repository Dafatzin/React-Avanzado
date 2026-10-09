import { Router } from 'express'

const router = Router()
const OLLAMA_URL = 'http://localhost:11434/api/chat'
const MODEL = 'deepseek-r1:1.5b'

router.post('/', async (req, res, next) => {
    try {
        const { messages } = req.body
        if(!Array.isArray(messages) || messages.length === 0) {
           return res.status(400).json({error: 'Se requiere un arreglo "messages'})   
        }

        const response = await fetch(OLLAMA_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ model: MODEL, messages, stream: false }),
        })

        if(!response.ok) {
            return res.status(502).json({ error: `Ollama respondió ${response.status}`})
        }

        res.json(await response.json())
    } catch (err) {
       next(err)
    }
})

export default router 