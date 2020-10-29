import React from 'react';
import SignIn from './SignIn'
import SignOut from './SignOut'
import {auth} from '../server/firebase'
import { useAuthState } from 'react-firebase-hooks/auth';



function Login(props) { 
    const [user] = useAuthState(auth);
          return (
            <div>
                <h1>Login</h1>
             <section>
             {user ? <SignOut /> : <SignIn />}
           </section>
           </div>
        );
    }

export default Login;