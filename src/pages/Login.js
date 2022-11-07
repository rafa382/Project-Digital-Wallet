import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      inputEmail: '',
      inputPassword: '',
      isLoginButtonDisable: true,
    };
    this.verificationUserData = this.verificationUserData.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    }, () => this.verificationUserData());
  }

  verificationUserData() {
    const emailFormat = /\S+@\S+\.\S+/;
    const caracteres = 6;
    const { inputEmail, inputPassword } = this.state;
    if (emailFormat.test(inputEmail) && caracteres <= inputPassword.length) {
      this.setState({ isLoginButtonDisable: false });
    } else {
      this.setState({ isLoginButtonDisable: true });
    }
  }

  render() {
    const { isLoginButtonDisable, inputEmail, inputPassword } = this.state;
    const { userEmail, history } = this.props;
    return (
      <div className="login-cart">
        <form>
          <h1 className="text-login">
            Digital Wallet
            <img src="https://cdn-icons-png.flaticon.com/512/2933/2933116.png" className="money-img" alt="money" />
          </h1>
          <input
            className="inputs"
            type="email"
            data-testid="email-input"
            name="inputEmail"
            placeholder="Email"
            onChange={ this.handleChange }
            value={ inputEmail }
          />
          <input
            className="inputs"
            data-testid="password-input"
            type="password"
            name="inputPassword"
            placeholder="Senha"
            onChange={ this.handleChange }
            value={ inputPassword }
          />
          <button
            className="login-button"
            type="button"
            disabled={ isLoginButtonDisable }
            onClick={ () => {
              userEmail(inputEmail);
              history.push('/carteira');
            } }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  userEmail: (state) => dispatch(actions.userEmail(state)),
});

Login.propTypes = {
  userEmail: PropTypes.func.isRequired,
  history: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
