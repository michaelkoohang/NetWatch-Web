import React, {useEffect, useState} from 'react';
import ReactMarkdown from 'react-markdown'
import Footer from '../footer/Footer';
import logo from '../../res/img/logo.svg';
import './Privacy.scss';

export default function Privacy() {
    const [markdown, setMarkdown] = useState('');

    useEffect(() => {
      window.scrollTo(0,0);
      const privacyPath = require("../../res/docs/privacy.md");
      fetch(privacyPath)
        .then(response => response.text())
        .then(text => {
          setMarkdown(text)
        });
    }, [])

    return (
      <div className='privacy'>
        <div className="container">
          <img src={logo} className="privacy-logo" alt="NetWatch logo"/>
          <ReactMarkdown>{markdown}</ReactMarkdown>
        </div>
        <Footer/>
      </div>
    );
}