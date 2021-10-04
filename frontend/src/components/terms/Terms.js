import React, {useEffect, useState} from 'react';
import ReactMarkdown from 'react-markdown'
import Footer from '../footer/Footer';
import logo from '../../res/img/logo.svg';
import './Terms.scss';

export default function Terms() {
    const [markdown, setMarkdown] = useState('');

    useEffect(() => {
      window.scrollTo(0,0);
      const termsPath = require("../../res/docs/terms.md");
      fetch(termsPath)
        .then(response => response.text())
        .then(text => {
          setMarkdown(text)
        });
    }, [])

    return (
      <div className='terms'>
        <div className="container">
          <img src={logo} className="terms-logo" alt="NetWatch logo"/>
          <ReactMarkdown>{markdown}</ReactMarkdown>
        </div>
        <Footer/>
      </div>
    );
}