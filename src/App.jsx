import { ChatProvider } from './desarrollo/ChatContext'
import  History from './components/history'
import Chat from './components/Chat'

function App() {
  return (
    <ChatProvider>
    <div className="h-screen flex bg-gray-700">
    <History />
    <Chat />
    </div>
    </ChatProvider>
  )
}

export default App 

