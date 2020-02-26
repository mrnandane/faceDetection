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
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';

const ParticlesOptions = ParticleOption;



const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
};

class App extends Component {
  constructor() {
    super();

    this.state = initialState;
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
    fetch('http://localhost:3000/imageUrl', {
      method: 'post',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({
        input: this.state.input
      })
    })
    .then(response => response.json())
      .then(response => {
        this.displayFaceBox(this.calculateFaceLocation(response))

        fetch('http://localhost:3000/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
        .then(res => res.json())
        .then(count => {
            this.setState(Object.assign(this.state.user, {entries: count}));
        })
        .catch(err => console.log)
      })
      .catch(err => console.error(err));
  };

  routeChanged = (route) => {
    if(route === 'home') {
      this.setState({isSignedIn: true});
    } else {
      this.setState(initialState);
    }
    this.setState({route: route});
  };

  setUserProfile = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    })
  }
  render() {
    const { imageUrl, box, route, isSignedIn, user } = this.state;
    return (
      <div className="App">
        <Particles className="particles-bg" params={ParticlesOptions}/>
        <Navigation isSignedIn={isSignedIn} onRouteChanged={this.routeChanged}/>
        { route === 'home' ?
          <div>
            <Logo/>
            <Rank entries={user.entries} name={user.name}/>
            <ImageLinkForm className='w-80'
                           onlinkChange={this.onImageLinkChange}
                           onlinkSubmit={this.onImageLinkSubmit}/>
            <FaceRecognition id={'faceImage'} imageUrl={imageUrl} faceBox={box}/>
          </div> :
          (
            route === 'signin' ?
              <Signin onRouteChanged={this.routeChanged} setUserProfile={this.setUserProfile}/> :
              <Register onRouteChanged={this.routeChanged} setUserProfile={this.setUserProfile}/>
          )
        }
      </div>
    );
  }
}

export default App;
