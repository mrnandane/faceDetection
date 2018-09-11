import React from 'react';

const ImageLinkForm = () => {
  return (
    <div className=''>
      <p className='f3 center'>
        {'This will detect faces in your picture. Give it a try.'}
      </p>
      <div className='w-70 center pb4'>
        <input type='text' className='f4 pa2 w-70 center'/>
        <button className='w-30 f4 link ph3 pv2 dib white bg-light-blue'> Find </button>
      </div>
    </div>
  );
};

export default ImageLinkForm;