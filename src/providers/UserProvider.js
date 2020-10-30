import React,  { Component, createContext } from "react";
import { auth } from "../server/firebase"


export default class UserProvider extends Component {
    state = {
        user: null
    }

    componentDidMount() {
        auth.onAuthStateChanged(userAuth => {
            this.setState({user: userAuth})
        })
    }

    render() {
        return (
            <UserContext.Provider value={this.state.user}>
                {this.props.children}
            </UserContext.Provider>
        )
    }
}


export const UserContext = createContext({user : null})