import React, { Component } from 'react'
import db from '../server/firebase';
import "./chatbox.css"

class Chat extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: "Jordan"
        }
    }

    
    render() {        
        const list = this.props.chats.map((msg) => (
            <div key={msg.id} className={msg.user === this.state.user ? "current" : null}>
                <p>{msg.message}</p>
                <span>{msg.user}</span>
            </div>
        ))

        return (list)
    }
}

export default Chat;