import {persistStore, persistReducer} from 'redux-persist';
import {combineReducers, createStore, applyMiddleware} from 'redux';
import signReducer from './modules/signReducer';
import orderReducer from './modules/orderReducer';
import globalReducer from './modules/globalReducer';
import AsyncStorage from '@react-native-community/async-storage';
import thunk from 'redux-thunk';
const orderPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['CompleteOrder'],
};
const signPersistConfig = {
  key: 'sign',
  storage: AsyncStorage,
};
const reducer = combineReducers({
  signReducer: persistReducer(signPersistConfig, signReducer),
  order: persistReducer(orderPersistConfig, orderReducer),
  globalReducer: globalReducer,
});
const store = createStore(reducer, applyMiddleware(thunk));
const persistor = persistStore(store);

export {store, persistor};
