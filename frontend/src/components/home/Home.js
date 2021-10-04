import React, { useEffect } from 'react'
import { map } from 'lodash';
import Footer from '../footer/Footer';
import TeamCard from './teamCard/TeamCard'
import { Icon } from 'semantic-ui-react';
import netwatchRecord from '../../res/img/app/netwatch-record-ss.png';
import netwatchView from '../../res/img/app/netwatch-hikes-ss.png';
import netwatchAnalyze from '../../res/img/app/netwatch-detail-ss.png';
import bea from '../../res/img/headshots/bea.jpg';
import michael from '../../res/img/headshots/michael.jpg';
import cole from '../../res/img/headshots/cole.jpg';
import ellen from '../../res/img/headshots/ellen.jpg';
import logo from '../../res/img/logo.svg';
import './Home.scss';
import Screenshots from '../screenshots/Screenshots';

export default function Home() {
  useEffect(() => {
    window.scrollTo(0,0);
  }, [])

  const gtName = "Georgia Institute of Technology";
  const team = [
    {
      src: bea,
      alt: "Beatriz's picture",
      name: "Beatriz",
      position: "CS Ph.D. Student",
      affiliation: gtName,
      email: "bepa@gatech.edu"
    },
    {
      src: michael,
      alt: "Michael's picture",
      name: "Michael",
      position: "Software Engineer",
      affiliation: "Nike",
      email: "hello@michaelkoohang.com"
    },
    {
      src: cole,
      alt: "Cole's picture",
      name: "Cole",
      position: "MS-HCI Student",
      affiliation: gtName,
      email: "canderson373@gatech.edu"
    },
    {
      src: ellen,
      alt: "Ellen's picture",
      name: "Ellen",
      position: "CS Professor",
      affiliation: gtName,
      email: "ewz@cc.gatech.edu"
    }
  ]
  const privacyItems = {
    col1: [
      {
        icon: "id card",
        name: "Device ID"
      },
      {
        icon: "mobile alternate",
        name: "Device Info"
      },{
        icon: "location arrow",
        name: "Location Data"
      }
    ],
    col2: [
      {
        icon: "phone",
        name: "Network Carrier"
      },
      {
        icon: "wifi",
        name: "Network Status"
      },{
        icon: "server",
        name: "Operating System"
      }
    ]
  }

  const features = [
    {
      title: 'Record',
      icon: 'wifi',
      description: 'Record your connectivity while walking. Just hit start to begin and stop whenever you\'re done. It\'s that easy.',
      image: netwatchRecord
    },
    {
      title: 'View',
      icon: 'eye',
      description: 'View your connectivity data, including your total connectivity status. See everything at a glance, and more.',
      image: netwatchView
    },
    {
      title: 'Analyze',
      icon: 'search',
      description: 'Analyze your connectivity on a map. Find where you did and didn\'t have a connection. Cool, right? We think so too.',
      image: netwatchAnalyze
    }
  ]

  return (
    <div className="home">
      <div className="header container">
        <div className="header-content">
          <img src={logo} className="header-logo" alt="NetWatch logo"/>
          <h1 className="header-title">NetWatch</h1>
          <p className="text">
            NetWatch is a mobile app that allows you to record, view, and analyze cellular connectivity 
            while walking. The app is part of a research project at Georgia Tech focused on exploring 
            internet access in rural areas, and investigating new ways to measure cellular connectivity. 
            Download the app now to start measuring!
          </p>
          <a className="header-button" href="#/download">Download</a>        
          <a className="header-link link-blue"href="#/privacy">See privacy policy</a>
          <a className="header-link link-blue"href="#/terms">See terms and conditions</a>
          <a className="header-link dashboard-link link-green" href="#/dashboard">Dashboard</a>
        </div>
        <Screenshots/>
      </div>
      <div className='features'>
        <h1 className="features-title">Features</h1>
        <div className='features-row'>
          { map(features, (feature, i) => (
              <div className='feature' key={i}>
                <h2><Icon name={feature.icon}/> {feature.title}</h2>
                <p className='text'>{feature.description}</p>
                <img src={feature.image} key={i} className="feature-screenshot" alt="NetWatch screenshot"/>
              </div>
            ))
          }
        </div>
      </div>
      <div className="team">
        <h1 className="team-title">Meet the team.</h1>
        <div className="team-row">
          { map(team, member => (
              <TeamCard
                src={member.src}
                alt={member.alt}
                name={member.name}
                position={member.position}
                affiliation={member.affiliation}
                email={member.email}
              />
            ))
          }
        </div>
      </div>
      <div className='privacy-summary container'>
        <h1 className='privacy-title'>Privacy summary.</h1>
        <div className='privacy-summary-content'>
          <div className='privacy-summary-text'>
            <p>
              Your privacy is very important to us. When you install the app, you get a device ID 
              assigned to you to help us keep track of your recordings without knowing who you are. We 
              only collect your location while you record. Never before and never after.
            </p>
          </div>
          <div className='privacy-summary-icons'>
            { map(privacyItems, col => (
                <div className='privacy-summary-icons-col'>
                  { map(col, item => (
                      <p>
                        <Icon name={item.icon}/>
                        {item.name}
                      </p>
                    ))
                  }
                </div>
              ))
            }
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}
