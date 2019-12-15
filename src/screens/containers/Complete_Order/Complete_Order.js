import React, {Component} from 'react';
import {View, StyleSheet, BackHandler} from 'react-native';
import Stars from '../../../../assets/svg/Stars.svg';
import Logo from '../../../../assets/svg/Logo_With_Planets.svg';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {connect} from 'react-redux';
import {
  getScreen,
  setCurrentScreenAction,
} from '../../../../redux/actions/orderActions';
import {bindActionCreators} from 'redux';
class CompleteOrder extends Component {
  constructor(props) {
    super(props);
    this.backHandler = null;
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackPress,
    );
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  handleBackPress = () => {
    const {currentScreen} = this.props.order.CompleteOrder;
    if (currentScreen == 'Finish') {
      this.props.navigation.navigate('Inicio');
    } else if (currentScreen == 'SelectAnOption') {
      this.props.actions.setCurrentScreenAction(null);
      this.props.navigation.navigate('ShoppingCart');
    } else {
      this.props.actions.getScreen('back', false);
    }

    return true;
  };
  render() {
    const {CompleteOrder} = this.props.order;
    const Screen =
      CompleteOrder.currentScreen == null
        ? CompleteOrder.Screens['SelectAnOption'].component
        : CompleteOrder.Screens[CompleteOrder.currentScreen].component;
    return (
      <LinearGradient colors={['#242441', '#55537B']} style={styles.background}>
        <View style={styles.container}>
          <Stars />
          <View style={styles.Logo_Container}>
            <Logo width={wp('80%')} height={wp('80%') * 0.5} />
            <Screen
              navigation={this.props.navigation}
              onBack={() => this.props.actions.getScreen('back', false)}
            />
          </View>
        </View>
      </LinearGradient>
    );
  }
}
const styles = StyleSheet.create({
  ActivityIndicator: {
    marginTop: 32,
  },
  Logo_Container: {
    flex: 1,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    backgroundColor: '#313045',
    height: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
});
const mapStateToProps = reducers => {
  return {order: reducers.order, global: reducers.globalReducer};
};
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({getScreen, setCurrentScreenAction}, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(CompleteOrder);
