import '../styles/MessageList.css'
import { messageList } from '../datas/messageList'
import Message from './Message'
import { useState } from 'react'
import MessageForm from './MessageForm';

function MessageList({currentUser}){
    const [messages, setMessages] = useState(messageList);

    function handleMessageSubmit(newMessage){
        setMessages([...messages, newMessage]);
    }
    return(
        <div className='message-list'>
            <h1>Liste des messages</h1>
            <MessageForm onMessageSubmit={handleMessageSubmit} currentUser={currentUser}/>
            <ul>
                {messages.map((msg) => (
                    <Message
                        
                        key={msg.id} 
                        author={msg.author}
                        content={msg.content}
                        date={msg.date}
                    />
                ))}
            </ul>
        </div>
    )
}


export default MessageList;