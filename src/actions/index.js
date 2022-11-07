import fetchApi from '../services/index';

const USER_EMAIL = 'USER_EMAIL';

export const SUCCESS = 'SUCCESS';

export const GET_COINS = 'GET_COINS';

export const ADD_EXPENSES = 'ADD_EXPENSES';

export const userEmail = (payload) => ({ type: USER_EMAIL, payload });

export const fetchSuccess = (data) => ({
  type: SUCCESS,
  data,
});

export const getCurrency = (currency) => ({
  type: GET_COINS,
  currency,
});

export const addExpenses = (expenses) => ({
  type: ADD_EXPENSES,
  expenses,
});

const fetchCurrency = () => async (dispatch) => {
  const response = await fetchApi();
  const data = await response;
  dispatch(fetchSuccess(data));
  dispatch(getCurrency(Object.keys(data).filter((x) => x !== 'USDT')));
};

export default fetchCurrency;
