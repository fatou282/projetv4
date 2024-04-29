import '../styles/MessageForm.css'
import { useState } from 'react';

function MessageForm({onMessageSubmit, currentUser}){
    const [messageContent, setMessageContent] = useState("");

    function handleMessageSent(e){
        setMessageContent(e.target.value);
    }
    function handleSubmit(event){
        event.preventDefault();
        const currentDate = new Date();
        const stringifiedDate = `${currentDate.getFullYear()}-${currentDate.getMonth()+1}-${currentDate.getDate()} à ${currentDate.getHours()}:${currentDate.getMinutes()}`;
        
        const message = {
            id : Math.random().toString(),
            author : currentUser.username ? currentUser.username : "anonymous_user",
            content : messageContent,
            date: stringifiedDate
        }
        onMessageSubmit(message);
    }
    return(
        <div className='message-form'>
            <h2>Ajouter un nouveau message</h2>
        <form 
            onSubmit={handleSubmit}
            className='message-form'>
            
            <label>Contenu du message</label>
            <input 
                type='text'
                value={messageContent}
                onChange={handleMessageSent}/>
            <button type='submit'>Envoyer</button>
        </form>
        </div>
    )

}


export default MessageForm;