import React from 'react';
import { signInWithGoogle } from '../server/firebase';

function SignIn(props) {  
  return (
    <button onClick={signInWithGoogle}>Se connecter avec Google</button>
  )
}

export default SignIn;