import React from 'react';
import '../styles/Message.css';
import DeleteMessage from './DeleteMessage';

function Message({ id, author, content, date, onDeleteMessage }) {
    const handleDeleteMessage = () => {
        onDeleteMessage(id); // Passer l'identifiant du message à supprimer
    };

    return (
        <li className='message-item'>
            <p>Le {date} : {author} a écrit "{content}" </p>
            <DeleteMessage onDelete={handleDeleteMessage} />
        </li>
    );
}

export default Message;
