import React, { Component } from 'react'
import db from '../server/firebase'
import ChatBox from "./chatbox"
import sendIcon from "../assets/icons/send.png"
import logoUBB from "../assets/icons/logoUBB.png"
import logoSP from "../assets/icons/logosp.png"
import UserProvider, { UserContext } from '../providers/UserProvider'


export default class Chat extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: this.props.user,
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
                user: this.state.user.displayName,
            }
            chatRef.doc(new Date().getTime().toString()).set(chat)
            this.setState({message: ''})
        }
    }

    scrollToBottom = () => {
        this.lastMsg.scrollIntoView({behavior: "smooth"})
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
    
    render() {
        return (
            <div>
                <div className="highlight-match">
                    <div className="row">
                        <div className="col">
                            <h5>UBB</h5>
                            <img src={logoUBB} alt="Equipe UBB"/>
                        </div>
                        <div className="col">
                            <strong>7 - 0</strong>
                            <p>00:79:32</p>
                        </div>
                        <div className="col">
                            <h5>Sélection Paloise</h5>
                            <img src={logoSP} alt="Equipe Sélection Paloise"/>
                        </div>
                    </div>
                </div>
                <div className="chat">
                    <div className="chatbox" ref={this.chatboxRef}>
                        <ChatBox chats={this.state.chats} currentUser={this.state.user} />
                        <div ref={(el) => {this.lastMsg = el}}></div>
                    </div>
                    <div className="chat-footer">
                        <form autoComplete="off" onSubmit={this.handleSubmit}>
                            <input type="text" placeholder="Tapez votre message" name="message" id="message" value={this.state.message} onChange={this.handleChange} />
                            <button><img src={sendIcon} alt="Envoyer"/></button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

UserContext.contextType = UserProvider

