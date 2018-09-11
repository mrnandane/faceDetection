import React from 'react';
import './Navigation.css';
const Navigation = () => {
  return (
    <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
      <p className='f3 link dim underline pa3 pointer'>Signout</p>
    </nav>
  );
};

export default Navigation;