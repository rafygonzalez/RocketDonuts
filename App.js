import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './redux/store';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
//Screns
import WelcomeScreen from './src/screens/containers/Welcome';
import LoginScreen from './src/screens/containers/Login';

import LoginWithEmail from './src/sections/containers/LoginWithEmail';
import RegisterScreen from './src/screens/containers/Register';
import RegisterWithEmail from './src/sections/containers/RegisterWithEmail';
import SplashScreen from './src/screens/containers/Splash';
import HomeScreen from './src/screens/containers/Home';
//
import Loading from './src/screens/containers/Splash';
import firebase from 'react-native-firebase';

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
  },
  Welcome: {
    screen: WelcomeScreen,
  },
  Login: {
    screen: LoginScreen,
  },
  LoginWithEmail: {
    screen: LoginWithEmail,
  },
  Register: {
    screen: RegisterScreen,
  },
  RegisterWithEmail: {
    screen: RegisterWithEmail,
  },
  Splash: {
    screen: SplashScreen,
  },
});

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  async componentDidMount() {
    // TODO: You: Do firebase things
    // const { user } = await firebase.auth().signInAnonymously();
    // console.warn('User -> ', user.toJSON());
    // await firebase.analytics().logEvent('foo', { bar: '123'});
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={<Loading />} persistor={persistor}>
          <AppContainer />
        </PersistGate>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  logo: {
    height: 120,
    marginBottom: 16,
    marginTop: 64,
    padding: 10,
    width: 135,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  modules: {
    margin: 20,
  },
  modulesHeader: {
    fontSize: 16,
    marginBottom: 8,
  },
  module: {
    fontSize: 14,
    marginTop: 4,
    textAlign: 'center',
  },
});
