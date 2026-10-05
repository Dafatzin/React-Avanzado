import { createContext, useReducer } from 'react';

const initialState= {
    messages: [],
    history: [],
    loading: false,
    error: null,
}

function chatReducer(state, action){
    switch (action.type){
        case 'SEND_MESSAGE':
            return {
                ...state,
                messages:[...state.messages, { role: 'user', content: action.payload }],
                history: [...state.history, action.payload.slice(0, 50)],
                loading: true,
                error: null,
            }

            case 'SEND_SUCCESS':

            return{
               ...state,
               messages: [...state.messages, { role: 'assistant', content: action.payload}],
               loading: false, 
            }

            case 'SEND_ERROR':

            return{
            ...state,
            loading: false,
            error: action.payload,
        }

        case 'CLEAR_MESSAGES':
            return{
            ...state,
            messages: [],
            }
        default:
            return state;
    }
}

export const ChatContext = createContext(null)

export function ChatProvider({ children }){
    const [state, dispatch] = useReducer(chatReducer, initialState)

    return(
    <ChatContext.Provider value={{ state, dispatch }}>
        {children}
    </ChatContext.Provider>
    )
}
