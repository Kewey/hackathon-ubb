import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import UserProvider from '../providers/UserProvider';
import SignIn from './SignIn'

function Login(props) {
    const user = useContext(UserProvider)
    return (
        <div>
            <h1>Login</h1>
            {user ? 
            <Redirect to={props.location.state ? props.location.state.from.pathname : "/chat"} /> 
            : 
            <SignIn />
            }
        </div>
    )
}

export default Login;