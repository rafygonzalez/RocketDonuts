import {createStore} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import {combineReducers} from 'redux';
import signReducer from './modules/signReducer';
import orderReducer from './modules/orderReducer';
import globalReducer from './modules/globalReducer';
import AsyncStorage from '@react-native-community/async-storage';

const orderPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['order'],
};

const reducer = combineReducers({
  signReducer: persistReducer(orderPersistConfig, signReducer),
  order: persistReducer(orderPersistConfig, orderReducer),
  globalReducer: globalReducer,
});

const initialState = {};

const store = createStore(reducer, initialState);
const persistor = persistStore(store);

export {store, persistor};
