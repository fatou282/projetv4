import React from 'react';

function DeleteMessage({ messageId, onDelete }) {
    const handleDelete = () => {
        // Appeler la fonction onDelete en passant l'identifiant du message à supprimer
        onDelete(messageId);
    };

    return (
        <button onClick={handleDelete}>Supprimer</button>
    );
}

export default DeleteMessage;
