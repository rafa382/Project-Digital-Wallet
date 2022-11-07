import { SUCCESS, GET_COINS, ADD_EXPENSES } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  quotation: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SUCCESS:
    return {
      ...state,
      quotation: [action.data],
    };
  case GET_COINS:
    return {
      ...state,
      currencies: action.currency,
    };
  case ADD_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.expenses],
    };
  default:
    return state;
  }
};

export default wallet;
