import {combineReducers} from 'redux';
import signReducer from './signReducer';
import orderReducer from './orderReducer';
export default combineReducers({
  signReducer,
  orderReducer,
});
