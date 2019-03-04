import React, { Component } from 'react';
import Modal from 'react-responsive-modal';

class Auth extends Component {

  constructor(props) {
    super(props);
    this.state = {
      login: '',
      password: '',
      login_error: false,
      password_error: false,
      status: 'Login'
    };
  }

  validateEmail = (email) => {
    const _emailCheck = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const result = _emailCheck.test(email);
    this.setState({
      login_error: !result
    });
    return result;
  }

  validatePassword = (password) => {
    this.setState({
      password_error: password.length < 6
    });
    return password.length >= 6;
  }

  validate = () => {
    const result_login = this.validateEmail(this.state.login);
    const result_password = this.validatePassword(this.state.password);
    return result_login && result_password;
  }

  onSubmit = (event) => {
    event.preventDefault()
    this.validate() &&
      this.state.status === "Login" ?
        this.props.login({username : this.state.login, password : this.state.password})
        :
        this.props.signUp({username : this.state.login, password : this.state.password});
  }

  changeStatus = () => {
    this.setState({
      status: this.state.status === "Login" ? "Sign Up" : "Login"
    });
  }

  onPasswordChange = (event) => {
    if(this.state.password_error)
      this.validatePassword(event.target.value);
    this.setState({password: event.target.value});
  }

  onLoginChange = (event) => {
    if(this.state.login_error)
      this.validateEmail(event.target.value);
    this.setState({login: event.target.value});
  }

  render() {
    return (
      <Modal open={this.props.open} onClose={this.props.close} center>
          <h2>{this.state.status}</h2>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label htmlFor="email"> Login: </label>
              <input className={`form-control${!this.state.login_error ? '' :' is-invalid'}`}
                type="email"
                name="email"
                value={this.state.login}
                onChange={this.onLoginChange}
                required/>
            </div>
            <div className="form-group">
              <label htmlFor="password"> Password: </label>
              <input className={`form-control${!this.state.password_error ? '' :' is-invalid'}`}
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.onPasswordChange}
                required/>
            </div>
            <input type="submit" className="btn btn-primary" value="Submit" />
          </form>
          <p className="change-status" onClick={this.changeStatus}>{this.state.status === "Login" ? 'Or Create a Account' : 'Have accout? Login'}</p>
      </Modal>
    );
  }

}

export default Auth;
