import {createStore} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import reducer from './modules/index';
import AsyncStorage from '@react-native-community/async-storage';
// const store = createStore(reducer, {
//   suggestionList: [],
//   categoryList: [],
// })

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['navigation'],
};

const persistedReducer = persistReducer(persistConfig, reducer);
const initialState = {};

const store = createStore(persistedReducer, initialState);
const persistor = persistStore(store);

export {store, persistor};
