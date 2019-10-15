import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import reducer from './reducers/data';
import AsyncStorage from '@react-native-community/async-storage';
// const store = createStore(reducer, {
//   suggestionList: [],
//   categoryList: [],
// })

const persistConfig = {
  key: 'root',
  storage: AsyncStorage
}


const persistedReducer = persistReducer(persistConfig, reducer)
const initialState = {
  "categoryHidden": false,
  "selectedCategory": "ALL_ITEMS"
}
const store = createStore(persistedReducer,
  initialState)
const persistor = persistStore(store)


export { store, persistor };
