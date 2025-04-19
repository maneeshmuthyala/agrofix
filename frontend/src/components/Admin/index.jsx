import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';
import './index.css';

class Admin extends Component {
  state = {
    email: '',
    password: '',
    errorMsg: '',
    isLoggedIn: false,
    isLoading: false, 
  };

  onChangeUsername = event => {
    this.setState({ email: event.target.value });
  };

  onChangePassword = event => {
    this.setState({ password: event.target.value });
  };

  submitForm = event => {
    event.preventDefault();
    this.setState({ isLoading: true }); 

    const { email, password } = this.state;

    setTimeout(() => {
      if (email === 'Maneesh' && password === 'Mani@123') {
        Cookies.set("is_admin", true);
        this.setState({ isLoggedIn: true, errorMsg: '', isLoading: false });
      } else {
        this.setState({ errorMsg: 'Invalid Admin', isLoading: false });
      }
    }, 1000);
  };

  renderPasswordField = () => {
    const { password } = this.state;

    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="password-input-field"
          value={password}
          onChange={this.onChangePassword}
          placeholder="Password"
        />
      </>
    );
  };

  renderUsernameField = () => {
    const { email } = this.state;

    return (
      <>
        <label className="input-label" htmlFor="email">
          NAME
        </label>
        <input
          type="text"
          id="email"
          className="username-input-field"
          value={email}
          onChange={this.onChangeUsername}
          placeholder="Email"
        />
      </>
    );
  };

  render() {
    const { errorMsg, isLoggedIn, isLoading } = this.state;

    if (isLoggedIn) {
      return <Redirect to="/admin-page" />;
    }

    if (isLoading) {
      return (
        <div className="login-form-container">
          <p className="loading-text">Loading...</p>
        </div>
      );
    }

    return (
      <div className="login-form-container">
        <img
          src="https://res.cloudinary.com/dvmcsww2y/image/upload/v1744964376/greengrocer_eqqyuz.jpg"
          className="login-img"
          alt="website login"
        />
        <form className="form-container" onSubmit={this.submitForm}>
          <h1>AgroFix</h1>
          <div className="input-container">{this.renderUsernameField()}</div>
          <div className="input-container">{this.renderPasswordField()}</div>
          <div className="bt-co">
            <button type="submit" className="login-button">
              SignIn
            </button>
          </div>
          <p className="error-message">{errorMsg}</p>
        </form>
      </div>
    );
  }
}

export default Admin;
