import React, { useEffect, useState } from 'react'
import { Modal, Button } from 'semantic-ui-react';
import Footer from '../footer/Footer';
import Screenshots from '../screenshots/Screenshots';
import logo from '../../res/img/logo.svg';
import appStoreBadge from '../../res/img/app-store-badge.png';
import playStoreBadge from '../../res/img/google-play-badge.png';
import './Download.scss';

export default function Download() {

  const [showModal, setShowModal] = useState(false);
  const [choiceMade, setChoiceMade] = useState(false);

  const researchHeader = 'We’d love to chat with you!'
  const downloadHeader = 'Download the app!'
  const researchBlurb = 'NetWatch is part of a research study, and we\'d love to talk to you about your experience using the app. Your feedback would be invaluable for improving the app and also helping the research team build better tools for measuring and understanding connectivity in the future. Would you like to sign up to be interviewed about your experience with NetWatch?'
  const downloadBlurb = 'You can download the app on the Google Play or Apple App Store using the following links. Happy hiking :)'

  useEffect(() => {
    window.scrollTo(0,0);
  }, []);

  useEffect(() => {
    if (!showModal) {
      setChoiceMade(showModal);
    }
  }, [showModal]);

  return (
    <div className="download">
      <div className="download-header container">
        <div className="download-header-content">
          <img src={logo} className="download-header-logo" alt="HikerNet logo"/>
          <h1 className="download-title">Download</h1>
          <p className="download-text">
            NetWatch is part of a research project at Georgia Tech, and you can sign up to be interviewed about
            your experience with the app when you download it. While using NetWatch, your recording data will be anonymized 
            and stored on Georgia Tech servers, and will <strong>not</strong> contain any personally identifiable information. 
            By downloading and using the app, you are agreeing to the <a href='#/privacy'>privacy policy </a> and <a href='#/terms'> 
            terms and conditions</a>.
          </p>
          <div>
            <img onClick={() => setShowModal(true)} src={appStoreBadge} className="download-button" alt="App store badge"/>
            <img onClick={() => setShowModal(true)} src={playStoreBadge} className="download-button" alt="Play store badge"/>
          </div>
          <Modal
            onClose={() => setShowModal(false)}
            onOpen={() => setShowModal(true)}
            open={showModal}
          >
            <Modal.Header>{choiceMade ? downloadHeader : researchHeader}</Modal.Header>
            <Modal.Content>
              <Modal.Description>
                <p className='download-text'>{choiceMade ? downloadBlurb : researchBlurb}</p>
                { choiceMade &&
                  <div>
                    <a href="" rel="no re">
                      <img src={appStoreBadge} className="download-button" alt="App store badge"/>
                    </a>        
                    <a href="">
                      <img src={playStoreBadge} className="download-button" alt="Play store badge"/>
                    </a>
                  </div>
                }
              </Modal.Description>
            </Modal.Content>
            { !choiceMade &&
              <Modal.Actions>
                <a href="" target="_blank" rel="noopener">
                  <Button
                    content="Yes!"
                    labelPosition='right'
                    icon='thumbs up'
                    positive
                    onClick={() => setChoiceMade(true)}
                  />
                </a>
                <Button
                  content = "No."
                  labelPosition='right'
                  icon='thumbs down'
                  negative 
                  onClick={() => setChoiceMade(true)}
                />
              </Modal.Actions>  
            }
          </Modal>
        </div>
        <Screenshots/>
      </div>
      <Footer/>
    </div>
  )
}
