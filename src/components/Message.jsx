import '../styles/Message.css'

function Message({author, content, date}){
    return(
        <li className='message-item'>
           <p>Le {date} : {author} a écrit "{content}" </p> 
        </li>
    )

}


export default Message;