import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import fetchCurrency, { addExpenses } from '../actions';
import HeaderTable from '../components/HeaderTable';
import BodyTable from '../components/BodyTable';

class Wallet extends React.Component {
  constructor() {
    super();
    this.food = 'Alimentação';
    this.state = {
      expenses: {
        id: 0,
        value: 0,
        currency: 'USD',
        method: 'Dinheiro',
        description: '',
        tag: this.food,
        exchangeRates: [0],
      },
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmitButton = this.onSubmitButton.bind(this);
    this.sumExpenses = this.sumExpenses.bind(this);
  }

  componentDidMount() {
    const { getKeys } = this.props;
    getKeys();
  }

  onSubmitButton(event) {
    event.preventDefault();
    const { allQuotations, userExpenses, getKeys } = this.props;
    console.log(userExpenses);
    const { expenses } = this.state;
    getKeys();
    this.setState((prevState) => ({
      expenses: {
        id: prevState.expenses.id + 1,
        value: 0,
        currency: '',
        method: 'Dinheiro',
        description: '',
        tag: this.food,
        exchangeRates: 0,
      },
    }));
    userExpenses({ ...expenses, exchangeRates: allQuotations[0] });
  }

  sumExpenses() {
    const { wallet: { expenses } } = this.props;
    return expenses.reduce((acc, curr) => {
      acc += (
        curr.value * curr.exchangeRates[curr.currency].ask);
      return acc;
    }, 0);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState((prevState) => ({
      expenses: {
        ...prevState.expenses,
        [name]: value,
      },
    }));
  }

  render() {
    const { payload, allCurrencies } = this.props;
    const { expenses: { value, description, currency, method, tag } } = this.state;
    return (
      <div>
        <div className="header">
          <h1>
            Digital Wallet
            <img src="https://cdn-icons-png.flaticon.com/512/2933/2933116.png" className="money-img-wallet" alt="money" />
          </h1>
          <p data-testid="email-field">
            Email :
            { payload }
          </p>
          <div className="despesa-total">
            <p data-testid="total-field">
              Despesa Total: R$
              { this.sumExpenses().toFixed(2) }
            </p>
            <p data-testid="header-currency-field"> BRL </p>
          </div>
        </div>
        <form className="form">
          <label htmlFor="input-value">
            Valor
            <input
              className="inputs-form"
              data-testid="value-input"
              type="number"
              name="value"
              value={ value }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="input-description">
            Descrição
            <textarea
              className="inputs-form"
              data-testid="description-input"
              name="description"
              value={ description }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="currency-input">
            Moeda
            <select
              className="inputs-form"
              data-testid="currency-input"
              id="currency-input"
              name="currency"
              value={ currency }
              onChange={ this.handleChange }
            >
              { allCurrencies.length !== 0 && allCurrencies.map((code) => (
                <option
                  key={ `currency-${code}` }
                  value={ code }
                  data-testid={ code }
                >
                  {code}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="method-input">
            Método de pagamento
            <select
              className="inputs-form"
              data-testid="method-input"
              id="method-input"
              name="method"
              value={ method }
              onChange={ this.handleChange }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag-input">
            Tag
            <select
              data-testid="tag-input"
              className="inputs-form"
              id="tag-input"
              name="tag"
              value={ tag }
              onChange={ this.handleChange }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <button
            className="btn-adicionar"
            type="button"
            onClick={ this.onSubmitButton }
          >
            Adicionar despesa
          </button>
        </form>
        <HeaderTable />
        <BodyTable />
      </div>
    );
  }
}

Wallet.propTypes = {
  payload: PropTypes.shape.isRequired,
  getKeys: PropTypes.func,
  userExpenses: PropTypes.func,
  allCurrencies: PropTypes.arrayOf(PropTypes.object),
  allQuotations: PropTypes.arrayOf(PropTypes.object),
}.isRequired;

const mapStateToProps = (state) => ({
  payload: state.user.email,
  wallet: state.wallet,
  allQuotations: state.wallet.quotation,
  allCurrencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  userExpenses: (x) => dispatch(addExpenses(x)),
  getKeys: () => dispatch(fetchCurrency()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
