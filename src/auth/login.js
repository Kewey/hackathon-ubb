import React from 'react';
import { Redirect } from 'react-router-dom';
import SignIn from './SignIn'

function Login(props) {
    return (
        <div>
            <h1>Login</h1>
            <section>
                {props.user ? <Redirect to={props.location.state ? props.location.state.from.pathname : "/chat"} /> : <SignIn signInWithGoogle={props.signInWithGoogle}  />}
            </section>
        </div>
    )
}

export default Login;