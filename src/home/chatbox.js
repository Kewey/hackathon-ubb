import React, { Component } from 'react'
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
                <span>{msg.user} :</span><p>{msg.message}</p>
            </div>
        ))

        return (list)
    }
}

export default Chat;