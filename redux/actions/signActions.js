import {
  INCREMENT_REQUESTED,
  INCREMENT,
  DECREMENT_REQUESTED,
  DECREMENT,
  SET_USER_DATA,
} from '../modules/signReducer';

export const setUserData = userData => dispatch => {
  dispatch({
    type: SET_USER_DATA,
    payload: userData,
  });
};
export const increment = () => dispatch => {
  dispatch({
    type: INCREMENT_REQUESTED,
  });

  dispatch({
    type: INCREMENT,
  });
};
export const incrementAsync = () => dispatch => {
  dispatch({
    type: INCREMENT_REQUESTED,
  });

  return setTimeout(() => {
    dispatch({
      type: INCREMENT,
    });
  }, 3000);
};

export const decrement = () => dispatch => {
  dispatch({
    type: DECREMENT_REQUESTED,
  });

  dispatch({
    type: DECREMENT,
  });
};

export const decrementAsync = () => dispatch => {
  dispatch({
    type: DECREMENT_REQUESTED,
  });

  return setTimeout(() => {
    dispatch({
      type: DECREMENT,
    });
  }, 3000);
};
