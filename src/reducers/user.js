const USER_EMAIL = 'USER_EMAIL';

const INITIAL_STATE = { email: '' };

const user = (state = INITIAL_STATE, { payload, type }) => {
  switch (type) {
  case USER_EMAIL:
    return { ...state, email: payload };
  default:
    return state;
  }
};

export default user;
