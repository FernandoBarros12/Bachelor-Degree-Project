import React from 'react'

import { useAuth0 } from '@auth0/auth0-react'

import { LogOutLinks } from './LogOutStyle';



const LogoutButton = () =>{

   const {logout} =useAuth0();

   return <LogOutLinks  onClick={() => logout({ returnTo: window.location.origin })}>

       Cerrar Sesion

   </LogOutLinks>

}



export default LogoutButton