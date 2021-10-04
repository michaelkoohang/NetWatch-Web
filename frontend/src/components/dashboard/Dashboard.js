import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Icon, Transition } from 'semantic-ui-react';
import { isNil, map } from 'lodash';
import Overview from './overview/Overview';
import Recordings from './recordings/Recordings';
import api from '../../utils/api';
import icon from '../../res/img/logo.svg';
import './Dashboard.scss';

export default function Dashboard() {
  
  // Hooks for keeping track of tabs and navigating based on authentication status
  const [currentTab, setCurrentTab] = useState(localStorage.getItem('current_tab'));
  const history = useHistory();
  const tabs = {
    OVERVIEW: {
      name: 'Overview',
      action: () => setCurrentTab('Overview'),
      icon: 'chart line',
      html: <Overview />
    },
    RECORDINGS: {
      name: 'Recordings',
      action: () => setCurrentTab('Recordings'),
      icon: 'tree',
      html: <Recordings />
    }
  }

  useEffect(() => {
    const tab = localStorage.getItem('current_tab');
    if (isNil(tab)) {
      setCurrentTab(tabs.OVERVIEW.name);
      localStorage.setItem('current_tab', tabs.OVERVIEW.name);
    }
    api.verify()
      .then(success => {
        if (success === 0) {
          history.push('/');
          history.push('/login');
        }
      })
      .catch(err => {
        console.log(err);
        history.push('/login');
      });
  }, [history, tabs]);

  useEffect(() => {
    localStorage.setItem('current_tab', currentTab);
  }, [currentTab]);

  function logout() {
    api.logout()
      .then(() => {
        history.push('/login')
      });
  }

  return (
    <div className="data">
      <div className="side-panel">
        <div className='side-panel-header'>
          <img className='side-panel-icon' src={icon} alt='NetWatch logo'></img>
          <h2 className='side-panel-title'>NetWatch</h2>
        </div>
        <div className='side-panel-nav'>
          <h4 className='side-panel-heading'>Data</h4>
          { map(tabs, (tab, key) => (
              <button className='side-panel-link' onClick={tab.action} key={key}>
                <Icon name={tab.icon}/> {tab.name}
              </button>
            ))
          }
          <h4 className='side-panel-heading'>Profile</h4>
          <button className='side-panel-link' onClick={() => logout()}>
            <Icon name='sign-out'/> Logout
          </button>
        </div>
      </div>
      <div className="main-panel">
        { map(tabs, tab => (
            <Transition visible={currentTab === tab.name} animation='fade up' duration={500}>
              <div className='dash-container'>
                {tab.html}
              </div>
            </Transition>
          ))
        }
      </div>
    </div>
  );
}