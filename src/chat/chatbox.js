import React, { Component } from 'react'
import "./chatbox.css"

class ChatBox extends Component {
    render() {
        const list = 
        this.props.chats.map((msg) => (
            msg.user === "Tom Siatka" ?
            <div key={msg.id} className="chat-item">
                <div className="chat-header">
                    <img src="https://uploads.lebonbon.fr/source/LAo.jpg" alt="Le dieu" />
                    <span>{msg.user}</span>
                </div>
                <div className="card">
                    <p>{msg.message}</p>
                </div>
            </div>            
            :
            <div key={msg.id} className="chat-item">
                <span>{msg.user} : </span><p>{msg.message}</p>
            </div>
        ))
        return (list)
    }
}

export default ChatBox;