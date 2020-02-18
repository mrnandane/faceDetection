import React, { Component } from 'react';
import Logo from './components/Logo/Logo'
import './App.css';
import Navigation from "./components/Navigation/Navigation";
import Rank from "./components/Rank/Rank";
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import 'tachyons';
import Particles from 'react-particles-js';
import ParticleOption from './JSON/particles';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Clarifai from 'clarifai';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';

const ParticlesOptions = ParticleOption;

const app = new Clarifai.App({
  // TODO: never commit api key.. for security purpose
  // ideally is should come from environment or should be encrypted somewhere
  apiKey: '609c69e065e443168cd60e7ca89bcb1e'
});

class App extends Component {
  constructor() {
    super();

    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false
    }
  }

  componentDidMount() {
    fetch('http://localhost:3000/')
    .then(res => res.json())
    .then(console.log);
  }
  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const width = Number(document.getElementById('faceImage').width);
    const height = Number(document.getElementById('faceImage').height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  };

  displayFaceBox = (box) => {
    this.setState({box: box});
  };

  onImageLinkChange = (event) => {
    this.setState({input: event.target.value});
  };

  onImageLinkSubmit = () => {
    this.setState({imageUrl: this.state.input});
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
      .catch(err => console.error(err));
  };

  routeChanged = (route) => {
    if(route === 'home') {
      this.setState({isSignedIn: true});
    } else {
      this.setState({isSignedIn: false});
    }
    this.setState({route: route});
  };

  render() {
    const { imageUrl, box, route, isSignedIn } = this.state;
    return (
      <div className="App">
        <Particles className="particles-bg" params={ParticlesOptions}/>
        <Navigation isSignedIn={isSignedIn} onRouteChanged={this.routeChanged}/>
        { route === 'home' ?
          <div>
            <Logo/>
            <Rank />
            <ImageLinkForm className='w-80'
                           onlinkChange={this.onImageLinkChange}
                           onlinkSubmit={this.onImageLinkSubmit}/>
            <FaceRecognition id={'faceImage'} imageUrl={imageUrl} faceBox={box}/>
          </div> :
          (
            route === 'signin' ?
              <Signin onRouteChanged={this.routeChanged}/> :
              <Register onRouteChanged={this.routeChanged}/>
          )
        }
      </div>
    );
  }
}

export default App;
