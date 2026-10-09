import { useChat } from '../desarrollo/useChat'

const API_URL = 'http://localhost:3000/api/chat'

export function useOllama() {
    const { state, dispatch } = useChat()

    const sendMessage = async (userMessage) => {
        if (!userMessage.trim()) return

        dispatch({ type: 'SEND_MESSAGE', payload: userMessage })

        try {

        const messagesForApi = [ ...state.messages, 
            { role: 'user' , content: userMessage },
        ].map(({ role, content }) => ({ role, content} ))

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                messages: messagesForApi
            }),
        })

        if (!response.ok){
            throw new Error(`Error del servidor: ${response.status}`)
        }
        const data = await response.json()

        dispatch({type: 'SEND_SUCCESS', payload: data.message.content})
      } catch (err) {
        dispatch({
        type: 'SEND_ERROR',
        payload: err.message || 'No se pudo conectar con Ollama',
        })
      }
    }

    return { sendMessage }
}
 
