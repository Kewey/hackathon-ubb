
import React, { Component } from 'react';
import firebase from "firebase"
import {auth} from '../server/firebase'

class SignIn extends Component {
    constructor(props) {
        super(props)
        this.state={

        }
    }
        signInWithGoogle = () => {
          const provider = new firebase.auth.GoogleAuthProvider();
          auth.signInWithPopup(provider);
        }
        render() {
        return (
          <button onClick={this.signInWithGoogle}>Se connecter avec Google</button>
        )
      }
    }

export default SignIn;