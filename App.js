import React from 'react';
import {
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './redux/store';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator, DrawerItems} from 'react-navigation-drawer';

//Screns
import WelcomeScreen from './src/screens/containers/Welcome';
import LoginScreen from './src/screens/containers/Login';

import LoginWithPhone from './src/sections/containers/LoginWithPhone';
import RegisterScreen from './src/screens/containers/Register';
import RegisterWithPhone from './src/sections/containers/RegisterWithPhone';
import Register_EmailNotVerified from './src/sections/components/Register_EmailNotVerified';

import HomeScreen from './src/screens/containers/Home';
import OrderScreen from './src/screens/containers/Order';
import CustomDonut from './src/screens/containers/CustomDonut';
import CustomBagel from './src/screens/containers/CustomBagel';
import ShoppingCart from './src/screens/containers/Shopping_Cart';

import ProfileScreen from './src/screens/containers/Profile';
//
import Loading from './src/screens/containers/Splash';
import firebase from 'react-native-firebase';

import HomeIcon from './assets/svg/Home.svg';
import OrderIcon from './assets/svg/Order.svg';
import SignOutIcon from './assets/svg/sign-out-option.svg';
import HeaderBanner from './src/sections/components/Header_Banner';
import AccountCircle from './assets/svg/account_circle.svg';
const signOut = () => {
  firebase.auth().signOut();
};

const DrawerWithLogoutButton = props => {
  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
      <SafeAreaView forceInset={{top: 'always', horizontal: 'never'}}>
        <HeaderBanner menu back_button={false} />
        <DrawerItems {...props} />
      </SafeAreaView>
      <TouchableOpacity onPress={() => signOut()}>
        <View style={stylesButton.item}>
          <View style={stylesButton.iconContainer}>
            <SignOutIcon width={24} height={24} />
          </View>
          <Text style={stylesButton.label}>Cerrar Sesión</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

const stylesButton = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    margin: 16,
    fontWeight: 'bold',
    color: 'rgba(0, 0, 0, .87)',
  },
  iconContainer: {
    marginHorizontal: 16,
    width: 24,
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
  },
});

const MainDrawer = createDrawerNavigator(
  {
    Inicio: {
      screen: HomeScreen,
      navigationOptions: {
        drawerIcon: () => <HomeIcon width={24} height={24} />,
      },
    },
    'Mi Pedido': {
      screen: OrderScreen,
      navigationOptions: {
        drawerIcon: () => <OrderIcon width={24} height={24} />,
      },
    },
    'Mi Perfil': {
      screen: ProfileScreen,
      navigationOptions: {
        drawerIcon: () => <AccountCircle width={24} height={24} />,
      },
    },
  },
  {
    contentComponent: DrawerWithLogoutButton,
  },
);
const AuthStack = createStackNavigator(
  {
    Welcome: {
      screen: WelcomeScreen,
    },
    Login: {
      screen: LoginScreen,
    },
    LoginWithPhone: {
      screen: LoginWithPhone,
    },
    Register: {
      screen: RegisterScreen,
    },
    RegisterWithPhone: {
      screen: RegisterWithPhone,
    },
    Register_EmailNotVerified: {
      screen: Register_EmailNotVerified,
    },
  },
  {
    headerMode: 'none',
  },
);
const NavigationApp = createStackNavigator(
  {
    App: MainDrawer,
    CustomDonut: {
      screen: CustomDonut,
    },
    CustomBagel: {
      screen: CustomBagel,
    },
    ShoppingCart: ShoppingCart,
  },
  {
    headerMode: 'none',
  },
);
const AppSwitch = createSwitchNavigator({
  Auth: {
    screen: AuthStack,
  },
  App: {
    screen: NavigationApp,
  },
});
const AppContainer = createAppContainer(AppSwitch);

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {}

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
