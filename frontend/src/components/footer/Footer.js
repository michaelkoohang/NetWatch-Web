import React from 'react'
import { Icon } from 'semantic-ui-react'
import './Footer.scss';

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer-copyright">
        <p className="footer-text">
          <Icon name="copyright"/>
          Georgia Institute of Technology
        </p>
        <p className="footer-text">
          Computing and Society Lab - 2021
        </p>
      </div>
      <div className="footer-links">
        <a className="footer-link" href="/">Home</a>
        <a className="footer-link" href='#/download'>Download</a>
        <a className="footer-link" href="#/privacy">Privacy Policy</a>
        <a className="footer-link" href="#/terms">Terms and Conditions</a>
        <a className="footer-link" href="#/support">Support</a>
        <a className="footer-link" 
          href="https://gvu.gatech.edu/research/labs/computing-and-society-lab"
          target="_blank"
          rel="noopener noreferrer"
        >Computing and Society Lab</a>
      </div>
    </div>
  )
}