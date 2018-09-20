import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({imageUrl, id, faceBox}) => {
  return (
    <div className='center ma'>
      <div className="absolute">
         <img id={id} alt={imageUrl} src={imageUrl} width='500px' height='auto'/>
          <div className='bounding-box' style={{
            top: faceBox.topRow,
            left: faceBox.leftCol,
            right: faceBox.rightCol,
            bottom: faceBox.bottomRow
          }}>
          </div>
      </div>
    </div>
  );
};

export default FaceRecognition;

