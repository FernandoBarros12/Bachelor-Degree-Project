import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Auth0Provider} from '@auth0/auth0-react'


ReactDOM.render(
  <Auth0Provider
    domain="co2-proyect-2021.us.auth0.com"
    clientId="5RNiCMsV8KmKg8JqxaqBlZ30ATvYQ8Gm"
    redirectUri={window.location.origin}
  >
    <App />
  </Auth0Provider>,
  document.getElementById('root')
);

