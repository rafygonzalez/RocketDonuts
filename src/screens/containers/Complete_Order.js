import React, {Component} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import Stars from '../../../assets/svg/Stars.svg';
import Logo from '../../../assets/svg/Logo_With_Planets.svg';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import SelectAnOption from '../components/Complete_Order/SelectAnOption';
import SelectAnAddress from '../components/Complete_Order/SelectAnAddress';
import SelectPayment from '../components/Complete_Order/SelectPayment';

class CompleteOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      option: null,
      address: '',
      payment_method: '',
    };
    this.handleSteps = this.handleSteps.bind(this);
    this.optionHandler = this.optionHandler.bind(this);
    this.pickerOnChangeValue = this.pickerOnChangeValue.bind(this);
  }
  handleSteps() {
    this.setState({step: this.state.step + 1});
  }
  optionHandler(option) {
    this.setState({option});
    this.handleSteps();
  }
  pickerOnChangeValue(value, name) {
    this.setState({[name]: value});
  }
  render() {
    const {step, option} = this.state;
    return (
      <LinearGradient colors={['#242441', '#55537B']} style={styles.background}>
        <View style={styles.container}>
          <Stars />
          <View style={styles.Logo_Container}>
            <Logo width={wp('90%')} height={wp('90%') * 0.5} />
            {step == 1 ? (
              <SelectAnOption optionHandler={this.optionHandler} />
            ) : step == 2 && option == 'delivery' ? (
              <SelectAnAddress
                pickerOnChangeValue={this.pickerOnChangeValue}
                address={this.state.address}
              />
            ) : step == 2 && option == 'factory' ? (
              <SelectPayment
                pickerOnChangeValue={this.pickerOnChangeValue}
                payment_method={this.state.payment_method}
              />
            ) : null}
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
export default CompleteOrder;
