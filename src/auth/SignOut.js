
import React, { Component } from 'react';
import {auth} from '../server/firebase'

class SignOut extends Component {
    render() {
        return (
            auth.currentUser && (
            <button onClick={() => auth.signOut()}>Se déconnecter</button>
            )
        )
    }
}
export default SignOut;