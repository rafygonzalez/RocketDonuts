import {USD_AVERAGE, CURRENT_USER} from '../modules/globalReducer';

export const setCurrentUser = userData => ({
  type: CURRENT_USER,
  payload: userData,
});
export const setUSDAverage = average => ({
  type: USD_AVERAGE,
  payload: average,
});
