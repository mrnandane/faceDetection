import React from 'react';
import logo from './logo.svg';
import Tilt from 'react-tilt';
import './Logo.css';

const Options = {
  reverse:        false,  // reverse the tilt direction
  max:            55,     // max tilt rotation (degrees)
  perspective:    100,   // Transform perspective, the lower the more extreme the tilt gets.
  scale:          1.1,      // 2 = 200%, 1.5 = 150%, etc..
  speed:          200,    // Speed of the enter/exit transition
  transition:     true,   // Set a transition on enter/exit.
  axis:           null,   // What axis should be disabled. Can be X or Y.
  reset:          true,  // If the tilt effect has to be reset on exit.
  easing:         "cubic-bezier(.03,.98,.52,.99)",    // Easing on enter/exit.
};

const Logo = () => {
    return (
      <div className="ml4 mb4 mr4">
        <Tilt className="Tilt" options={Options} style={{ height: 100, width: 100 }} >
          <div className="Tilt-inner center pa2">
           <img src={logo} className="App-logo" alt="logo" />
          </div>
        </Tilt>
      </div>
    )
}

export default Logo;