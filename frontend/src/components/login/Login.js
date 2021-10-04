import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { Button, Form } from 'semantic-ui-react';
import api from '../../utils/api';
import loginImage from '../../res/img/login.jpg';
import logo from '../../res/img/logo.svg';
import './Login.scss';

export default function Login() {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    api.verify()
      .then(result => {
        if (result === 1) {
          history.push('/dashboard')
        }
      });
  }, [history]);

  function login() {
    if (username.length > 0 && password.length > 0) {
      api.login(username, password)
      .then(result => {
        if (result === 1) {
          setShowAlert(false);
          history.push('/dashboard')
        } else {
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
          }, 3000);
        }
      });
    }
  }

  // Update id and password fields while typing
  function handleFormChange(event) {
    if (event.target.name === 'username') {
      setUsername(event.target.value);
    }
    if (event.target.name === 'password') {
      setPassword(event.target.value);
    }
  }

  return (
    <div className='login'>
      <img className='login-picture' src={loginImage} alt='Person staring at a lake'/>
      <div className='login-form'>
        <img src={logo} className='login-logo' alt='NetWatch logo'/>
        <p className='login-text'>Welcome to NetWatch</p>
        <Form>
          <Form.Field className='login-field'>
            <label>Username</label>
            <input name='username' onChange={handleFormChange} required/>
          </Form.Field>
          <Form.Field className='login-field'>
            <label>Password</label>
            <input name='password' onChange={handleFormChange} type='password' required/>
          </Form.Field>
          <div className={['login-alert', showAlert && 'alert-showing'].join(' ')}>
            <p className='alert-title'>Login Failed</p>
            <p className='alert-text'>Your username or password was incorrect.</p>
          </div>
          <Button className='login-button' type='submit' onClick={login}>Log In</Button>
          <Link className='link-blue go-home' to='/'>Go home</Link>
        </Form>
      </div>
    </div>
  )
}