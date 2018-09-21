import React from 'react';
import './Navigation.css';
const Navigation = ({onRouteChanged, isSignedIn}) => {
  if(isSignedIn) {
    return (
      <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
        <p className='f3 link dim underline pa3 pointer'
           onClick={() => onRouteChanged('signout')}>
          Signout
        </p>
      </nav>
    );
  } else {
    return (
      <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
        <p className='f3 link dim underline pa3 pointer'
           onClick={() => onRouteChanged('signin')}>
          Signin
        </p>
        <p className='f3 link dim underline pa3 pointer'
           onClick={() => onRouteChanged('register')}>
          Register
        </p>
      </nav>
    );
  }
};

export default Navigation;