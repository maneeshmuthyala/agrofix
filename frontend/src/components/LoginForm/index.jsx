import React, { Component } from 'react';
import Cookies from 'js-cookie';
import { Redirect, Link } from 'react-router-dom';
import './index.css';

class LoginForm extends Component {
  state = {
    email: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
    isLoading: false, 
  };

  onChangeUsername = event => {
    this.setState({ email: event.target.value });
  };

  onChangePassword = event => {
    this.setState({ password: event.target.value });
  };

  validateEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  validatePassword = password => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, { expires: 30 });
    this.setState({ showSubmitError: false, errorMsg: '' });
    this.props.history.replace('/');
  };

  onSubmitFailure = errorMsg => {
    this.setState({ showSubmitError: true, errorMsg });
  };

  submitForm = async event => {
    event.preventDefault();
    this.setState({ isLoading: true });

    const { email, password } = this.state;

    if (!this.validateEmail(email)) {
      this.setState({ isLoading: false });
      this.onSubmitFailure('Invalid email format');
      return;
    }

    if (!this.validatePassword(password)) {
      this.setState({ isLoading: false });
      this.onSubmitFailure(
        'Password must be at least 8 characters long, include an uppercase letter, a number, and a special character.'
      );
      return;
    }

    const url = 'https://agrofixbackend.onrender.com/login';
    const userDetails = { email, password };
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userDetails),
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();

      if (response.ok) {
        this.onSubmitSuccess(data.jwt_token);
      } else {
        this.onSubmitFailure(data.message || 'Invalid email or password');
      }
    } catch (error) {
      this.onSubmitFailure('Server error. Please try again later.');
    } finally {
      this.setState({ isLoading: false });
    }
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
          EMAIL
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
    const { showSubmitError, errorMsg, isLoading } = this.state;
    const jwtToken = Cookies.get('jwt_token');

    if (jwtToken) {
      return <Redirect to="/" />;
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
            <Link to="/admin">
              <button type="button" className="login-button">
                Admin
              </button>
            </Link>
          </div>
          {showSubmitError && <p className="error-message">*{errorMsg}</p>}
        </form>
      </div>
    );
  }
}

export default LoginForm;
