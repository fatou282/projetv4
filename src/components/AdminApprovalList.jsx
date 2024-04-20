import React from 'react';
{/*import '../styles/AdminApprovalList.css';*/}

function AdminApprovalList({ usersToApprove, onApprove, onReject }) {
    return (
        <div className='admin-approval-list'>
            <h2>Approbation des utilisateurs</h2>
            <ul>
                {usersToApprove.map(user => (
                    <li key={user.id}>
                        {user.username}
                        <button onClick={() => onApprove(user.id)}>Approuver</button>
                        <button onClick={() => onReject(user.id)}>Rejeter</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AdminApprovalList;
