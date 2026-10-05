import { useState } from 'react'
import { useChat } from '../desarrollo/useChat'
import { useOllama } from '../hooks/useOllama'

function Chat() {
    const { state } = useChat()
    const { sendMessage } = useOllama()
    const [input, setInput] = useState('')
    
    const handleSubmit = (e) => {
    e.preventDefault()
    if (!input.trim() || state.loading) return
    sendMessage(input)
    setInput('')
    }
    return (
    <div className="flex-1 flex flex-col h-full">
     <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {state.messages.length === 0 && (
        <p className="text-gray-400 text-sm text-center mt-10">
            Empieza a chatear escribiendo algo  </p>
        )}

        {state.messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm whitespace-pre-wrap ${
            msg.role === 'user'
            ? 'bg-purple-600 text-white'
            : 'bg-gray-100  text-gray-800'
            }`}>

        {msg.content}
        </div> 
        </div> 
        ))}

        {state.loading && (
        <div className="flex justify-start">
        <div className="bg-gray-100 text-gray-500 rounded-2xl px-4 py-2 text-sm">
            Pensando...
            </div>
            </div>
        )}

        {state.error && (
        <div className="flex justify-center">
        <div className="bg-red-50 text-red-600 rounded-lg px-4 py-2 text-xs">
            Error: {state.error} 
        </div>
        </div>
        )}
     </div>

     <form onSubmit={handleSubmit} className="border-t border-gray-200 p-4 flex gap-2">
     <input type="text" value={input} onChange={(e) => setInput(e.target.value)} 
     placeholder="Escribe tu mensaje..." disabled={state.loading} className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 disabled:opacity-50"
     />
     <button type="submit" disabled={state.loading} className="bg-black hover:bg-cyan-700 disabled:opacity-50 text-white font-medium px-4 py-2 rounded-lg text-sm transition-colors">
        Enviar
     </button>
     </form>
    </div>
    ) 
}

export default Chat 