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
import Finish from '../components/Complete_Order/Finish';
import API from '../../firebase/api';
import {connect} from 'react-redux';

const MakeOrder = props => {
  const {
    optionHandler,
    pickerOnChangeValue,
    handleSteps,
    FinishOrder,
    Global_OnChange,
  } = props; // functions

  const {address, orderId, step, option, payment_method, amount} = props; // States

  if (step == 1) {
    return <SelectAnOption optionHandler={optionHandler} />;
  } else if (step == 2 && option == 'delivery') {
    return (
      <SelectAnAddress
        pickerOnChangeValue={pickerOnChangeValue}
        address={address}
      />
    );
  } else if (step == 2 && option == 'factory') {
    return (
      <SelectPayment
        optionHandler={handleSteps}
        pickerOnChangeValue={pickerOnChangeValue}
        payment_method={payment_method}
        Global_OnChange={Global_OnChange}
        amount={amount}
      />
    );
  } else if (
    step == 3 &&
    (payment_method == 'transferencia' || payment_method == 'pago_movil')
  ) {
    return <ShowBankData optionHandler={handleSteps} datos={payment_method} />;
  } else if (
    step == 3 &&
    (payment_method == 'bs' || payment_method == 'dolar')
  ) {
    return <Finish orderId={orderId} FinishOrder={FinishOrder} />;
  } else if (step == 4) {
    return <AttachScreenshot optionHandler={handleSteps} />;
  }
};

class CompleteOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      option: null,
      address: '',
      payment_method: 'transferencia',
      amount: '',
      orderId: '',
      makingOrder: false,
    };
    this.handleSteps = this.handleSteps.bind(this);
    this.optionHandler = this.optionHandler.bind(this);
    this.pickerOnChangeValue = this.pickerOnChangeValue.bind(this);
    this.Global_OnChange = this.Global_OnChange.bind(this);
    this.FinishOrder = this.FinishOrder.bind(this);
  }

  handleSteps() {
    const {step, payment_method} = this.state;

    if (
      (step == 2 && payment_method == 'bs') ||
      (step == 2 && payment_method == 'dolar')
    ) {
      let order = {};
      order.order = this.props.order.order;
      order.totalPrice = this.props.order.totalPrice;
      order.quantity = this.props.order.orderQuantity;
      order.payment_method = this.state.payment_method;
      order.cashAmount = this.state.amount;
      order.usdAverage = this.props.global.usdAverage;
      order.date = new Date();
      API.makeAnOrder(order).then(id => {
        this.setState({orderId: id, step: this.state.step + 1});
      });
    } else {
      this.setState({step: this.state.step + 1});
    }
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
  FinishOrder() {
    this.props.navigation.navigate('Inicio');
  }
  render() {
    const {step, option, payment_method} = this.state;
    return (
      <LinearGradient colors={['#242441', '#55537B']} style={styles.background}>
        <View style={styles.container}>
          <Stars />
          <View style={styles.Logo_Container}>
            <Logo width={wp('80%')} height={wp('80%') * 0.5} />
            <MakeOrder
              //states
              step={this.state.step}
              option={this.state.option}
              payment_method={this.state.payment_method}
              address={this.state.address}
              orderId={this.state.orderId}
              amount={this.state.amount}
              //functions
              optionHandler={this.optionHandler}
              pickerOnChangeValue={this.pickerOnChangeValue}
              handleSteps={this.handleSteps}
              FinishOrder={this.FinishOrder}
              Global_OnChange={this.Global_OnChange}
            />
          </View>
        </View>
      </LinearGradient>
    );
  }
}

/*  {step == 1 ? (
              <SelectAnOption optionHandler={this.optionHandler} />
            ) : step == 2 && option == 'delivery' ? (
              <SelectAnAddress
                pickerOnChangeValue={this.pickerOnChangeValue}
                address={this.state.address}
              />
            ) : step == 2 && option == 'factory' ? (
              <SelectPayment
                optionHandler={this.handleSteps}
                pickerOnChangeValue={this.pickerOnChangeValue}
                payment_method={this.state.payment_method}
                Global_OnChange={this.Global_OnChange}
                amount={this.state.amount}
              />
            ) : step == 3 && payment_method == 'transferencia' ? (
              <ShowBankData
                optionHandler={this.handleSteps}
                datos="transferencia"
              />
            ) : step == 3 && payment_method == 'pago_movil' ? (
              <ShowBankData
                optionHandler={this.handleSteps}
                datos="pago_movil"
              />
            ) : step == 3 && payment_method == 'bs' ? (
              <Finish
                orderId={this.state.orderId}
                FinishOrder={this.FinishOrder}
              />
            ) : step == 3 && payment_method == 'dolar' ? (
              <Finish
                orderId={this.state.orderId}
                FinishOrder={this.FinishOrder}
              />
            ) : (
              step == 4 && <AttachScreenshot optionHandler={this.handleSteps} />
            )} */
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
export default connect(mapStateToProps)(CompleteOrder);
