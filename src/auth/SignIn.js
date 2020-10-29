import React from 'react';

function SignIn(props) {
  login() {
    props.signInWithGoogle
  }
  
  return (
    <button onClick={login()}>Se connecter avec Google</button>
  )
}

export default SignIn;