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
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.scrollToBottom = this.scrollToBottom.bind(this)
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
    }

    componentDidMount() {
        const chatRef = db.collection('chat')
        chatRef.onSnapshot((query) => {
            let chat = [...this.state.chats]
            query.docChanges().forEach(change => {
                if (change.type === "added") {
                    chat.push({id: change.doc.id ,...change.doc.data()})
                }
            })
            this.setState({chats : chat})
        })
        this.scrollToBottom()
    }

    componentDidUpdate() {
        this.scrollToBottom()
    }

    scrollToBottom = () => {
        this.lastMsg.scrollIntoView({behavior: "smooth"})
    }
    
    render() {

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
                        <Chat chats={this.state.chats} />
                        <div ref={(el) => {this.lastMsg = el}}></div>
                    </div>
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" name="message" id="message" value={this.state.message} onChange={this.handleChange} />
                    </form>
                </div>
            </div>
        )
    }
}
