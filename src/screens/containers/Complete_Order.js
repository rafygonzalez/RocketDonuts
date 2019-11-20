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
import ShowBankData from '../components/Complete_Order/ShowBankData';
import AttachScreenshot from '../components/Complete_Order/AttachScreenshot';

class CompleteOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      option: null,
      address: '',
      payment_method: '',
      amount:''
    };
    this.handleSteps = this.handleSteps.bind(this);
    this.optionHandler = this.optionHandler.bind(this);
    this.pickerOnChangeValue = this.pickerOnChangeValue.bind(this);
    this.Global_OnChange = this.Global_OnChange.bind(this);
  }
  handleSteps() {
    const {step, option} = this.state;
    if(step == 2 && option == 'factory'){

    }
    this.setState({step: this.state.step + 1});
  }
  optionHandler(option) {
    this.setState({option});
    this.handleSteps();
  }
  pickerOnChangeValue(value, name) {
    this.setState({[name]: value});
  }
  Global_OnChange(text, name) {
    this.setState({[name]: text});
  }
  render() {
    const {step, option} = this.state;
    return (
      <LinearGradient colors={['#242441', '#55537B']} style={styles.background}>
        <View style={styles.container}>
          <Stars />
          <View style={styles.Logo_Container}>
            <Logo width={wp('80%')} height={wp('80%') * 0.5} />
            {step == 1 ? (
              <SelectAnOption optionHandler={this.optionHandler} />
            ) : step == 2 && option == 'delivery' ? (
              <SelectAnAddress
                pickerOnChangeValue={this.pickerOnChangeValue}
                address={this.state.address}
              />
            ) : step == 2 && option == 'factory' ? (
              <SelectPayment optionHandler={this.handleSteps}
                pickerOnChangeValue={this.pickerOnChangeValue}
                payment_method={this.state.payment_method}
                Global_OnChange={this.Global_OnChange}
                amount={this.state.amount}
              />
            ) : step == 3 ?
               <ShowBankData optionHandler={this.handleSteps}/>
               : step == 4 &&
               <AttachScreenshot optionHandler={this.handleSteps}/>
            }
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
