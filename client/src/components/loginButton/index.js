import React from 'react'

import { useAuth0 } from '@auth0/auth0-react'

import { LogInLinks } from './LoginStyle';



const LogInButton = () =>{

   const {loginWithRedirect} =useAuth0();

   return <LogInLinks className="buttonLog"  onClick={() => loginWithRedirect()}>

       Iniciar Sesión

   </LogInLinks>

}



export default LogInButton;