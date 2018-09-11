import React, { Component } from 'react';
import Logo from './components/Logo/Logo'
import './App.css';
import Navigation from "./components/Navigation/Navigation";
import Rank from "./components/Rank/Rank";
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import 'tachyons';
import Particles from 'react-particles-js';
import { ParticleOption } from './JSON/particles';

const ParticlesOptions = ParticleOption;

class App extends Component {
  render() {
    return (
      <div className="App">
        <Particles className="particles-bg" params={ParticlesOptions}/>
        <Navigation />
        <Logo/>
        <Rank />
        <ImageLinkForm className='w-80'/>
        {/*<FaceRecognition />*/}
      </div>
    );
  }
}

export default App;
