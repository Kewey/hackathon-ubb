import React, { Component } from 'react'
import BDD, { FirebaseContext } from "../server/index"

class Chat extends Component {
    

    console.log("BDD")

    render() {
        return (
            <div>
               <h1>Chat</h1> 
                <FirebaseContext.Consumer>

                </FirebaseContext.Consumer>
            </div>
        )
    }
}

export default Chat;