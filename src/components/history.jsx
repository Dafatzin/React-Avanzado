import { useChat } from '../desarrollo/useChat'

function History() {
    const { state, dispatch } = useChat()

    const handleClear = () => {
        dispatch({ type: 'CLEAR_MESSAGES' })
    }

    return (
    <div className="w-full md:w-64 h-full flex flex-col p-4 backdrop-blur-xl bg-black/60 border-r border-cyan-400/40 shadow-[0_0_20px_rgba(34,211,238,0.3)]">
    <div className="flex items-center justify-between mb-4">
    <h2 className="text-sm font-semibold text-cyan-400 tracking-wide">
        Historial
    </h2>
    <button onClick={handleClear} className="text-xs text-cyan-300/70 hover:text-cyan-300 transition-colors">
        Limpiar Chat
        </button>
        </div>
     
    {state.history.length === 0 ? (
        <p className="text-xs text-gray-400">
            Aún no hay consultas previas
        </p>
    ):(
        <ul className="space-y-2 overflow-y-auto">
        {state.history.map((item, index) => (
            <li key={index} className="text-sm text-cyan-300 bg-white/5 border border-cyan-400/20 rounded-lg px-3 py-2 truncate hover:border-cyan-400/50 hover:shadow-[0_0_10px_rgba(34,211,238,0.25)] transition-all">
             {item}
            </li>
        ))}
        </ul>
    )}
    </div>
    )
}

export default History