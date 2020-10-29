import React, { Component } from 'react'
import db from '../server/firebase'
import Chat from "./chatbox"

export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            chats: [],
            message: '',

        }

        this.chatboxRef = React.createRef()
        this.refreshChat = this.refreshChat.bind(this)
    }
    
    
    handleChange = e => {
        this.setState({[e.target.name]: e.target.value})
    }
    
    handleSubmit = e => {
        e.preventDefault()
        if(this.state.message !=='') {
            const chatRef = db.collection('chat')
            const chat = {
                message: this.state.message,
                user: "Tom",
            }
            chatRef.doc(new Date().getTime().toString()).set(chat)
            this.setState({message: ''})
        }
        this.refreshChat()
    }

    refreshChat() {
        const chatRef = db.collection('chat').get()
        chatRef.then((querySnapshot) => {
            const doc = querySnapshot.docs.map((doc) => {
                return {id: doc.id, ...doc.data()}
            })
            this.setState({chats: doc})
        })
    }

    componentDidMount() {
        this.refreshChat()

        // const chatbox = this.chatboxRef.current
    }
    
    render() {
        
    const chatRef = db.collection('chat').get()
    chatRef.


        return (
            <div>
                <header>
                    <h1>Home</h1>
                    <a href="/login">Login</a>
                    <a href="/soundbox">Soundbox</a>
                    <a href="/chat">Chat</a>
                </header>
                <div className="chat">
                    <div className="chatbox" ref={this.chatboxRef}>
                        <Chat refreshChat={this.refreshChat} chats={this.state.chats} />
                    </div>
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" name="message" id="message" value={this.state.message} onChange={this.handleChange} />
                    </form>
                </div>
            </div>
        )
    }
}
