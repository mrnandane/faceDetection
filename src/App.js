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

const ParticlesOptions = ParticleOption;

const app = new Clarifai.App({
  // TODO: never commit api key.. for security purpose
  // ideally is should come from environment or should be encrypted somewhere
  apiKey: '456'
});

class App extends Component {
  constructor() {
    super();

    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin'
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const width = Number(document.getElementById('faceImage').width);
    const height = Number(document.getElementById('faceImage').height);

    console.log('clarifaiFace', clarifaiFace);

    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    console.log('box', box);
    this.setState({box: box});
  }

  onImageLinkChange = (event) => {
    console.log('link..', event.target.value);
    this.setState({input: event.target.value});
  }

  onImageLinkSubmit = () => {
    this.setState({imageUrl: this.state.input});
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
      .catch(err => console.error(err));
  }

  routeChanged = (route) => {
    this.setState({route: route});
  }

  render() {
    return (
      <div className="App">
        <Particles className="particles-bg" params={ParticlesOptions}/>
        { this.state.route === 'signin' ?
          <Signin onSigninClicked={this.routeChanged}/> :
          <div>
            <Navigation onSignoutClicked={this.routeChanged}/>
            <Logo/>
            <Rank />
            <ImageLinkForm className='w-80'
                           onlinkChange={this.onImageLinkChange}
                           onlinkSubmit={this.onImageLinkSubmit}/>
            <FaceRecognition id={'faceImage'} imageUrl={this.state.imageUrl} faceBox={this.state.box}/>
          </div>
        }
      </div>
    );
  }
}

export default App;
