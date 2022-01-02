import React, { useEffect } from 'react'
import Footer from '../footer/Footer';
import logo from '../../res/img/logo.svg';
import playStoreBadge from '../../res/img/google-play-badge.png';
import './Download.scss';

export default function Download() {
  useEffect(() => {
    window.scrollTo(0,0);
  }, []);

  return (
    <div className="download">
      <div className="download-header container">
        <div className="download-header-content">
          <img src={logo} className="download-header-logo" alt="NetWatch logo"/>
          <h1 className="download-title">Download</h1>
          <p className="download-text">
            NetWatch is part of a research project at Georgia Tech, and you can sign up to be interviewed about
            your experience with the app when you download it. While using NetWatch, your recording data will be anonymized 
            and stored on Georgia Tech servers, and will <strong>not</strong> contain any personally identifiable information. 
            By downloading and using the app, you are agreeing to the <a href='#/privacy'>privacy policy </a> and <a href='#/terms'> 
            terms and conditions</a>.
          </p>
          <div>
            <a href="">
              <img src={playStoreBadge} className="download-button" alt="Play store badge"/>
            </a>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}
