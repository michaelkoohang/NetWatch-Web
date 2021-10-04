import React from 'react';
import Lottie from 'react-lottie';
import campfire from '../../res/lottie/campfire.json'
import './Error.scss';

export default function Error() {
  const campfireOptions = {
    loop: true,
    autoplay: true, 
    animationData: campfire
  };

  return (
    <div className="error">
      <div className="error-animation">
        <Lottie options={campfireOptions}/>
      </div>
      <h1 className="error-title">Oops!</h1>
      <p className="error-text">We're still working on this page :) It'll be done soon!</p>
    </div>
  )
}