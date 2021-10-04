import React, {useEffect, useState} from 'react';
import ReactMarkdown from 'react-markdown'
import Footer from '../footer/Footer';
import logo from '../../res/img/logo.svg';
import './Support.scss';

export default function Privacy() {
    const [markdown, setMarkdown] = useState('');

    useEffect(() => {
      window.scrollTo(0,0);
      const supportPath = require("../../res/docs/support.md");
      fetch(supportPath)
        .then(response => response.text())
        .then(text => {
          setMarkdown(text)
        });
    }, [])

    return (
      <div className='support'>
        <div className="container">
          <img src={logo} className="support-logo" alt="NetWatch logo"/>
          <ReactMarkdown>{markdown}</ReactMarkdown>
        </div>
        <Footer/>
      </div>
    );
}