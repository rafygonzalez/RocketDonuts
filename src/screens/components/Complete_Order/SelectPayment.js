import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import Body from './Body';
import Button from '../../../ui/components/button';
import TextInput from '../../../ui/components/TextInput';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Picker from '../../../ui/components/picker';
import {connect} from 'react-redux';
import {getScreen} from '../../../../redux/modules/orderReducer';
import {bindActionCreators} from 'redux';
const Buttons = props => {
  const Button_Text_State = payment_method => {
    if (payment_method == 'bs' || payment_method == 'dolar') {
      return 'Realizar Pedido';
    } else {
      return 'Continuar';
    }
  };
  return (
    <View style={{width: '100%'}}>
      <Button
        title={Button_Text_State(props.payment_method)}
        button_style="primary"
        onPress={() => {
          props.selectPaymentMethod();
        }}
      />
    </View>
  );
};
const Layout = props => {
  return props.children;
};
const Input = props => {
  if (props.payment_method == 'bs' || props.payment_method == 'dolar') {
    return (
      <TextInput
        title="Por favor, ingresa el monto para poder entregarte cambio."
        onChangeText={amount => props.setAmount(amount)}
        value={props.amount}
      />
    );
  } else {
    return null;
  }
};
const paymentsMethods = [
  {label: 'Transferencia', value: 'transferencia'},
  {label: 'Pago Móvil', value: 'pago_movil'},
  {label: 'Efectivo Bs.S', value: 'efecbs'},
  {label: 'Efectivo Dólares', value: 'efecdolar'},
];
const SelectPayment = props => {
  const {orderQuantity} = props;

  const [payment_method, setPaymentMethod] = useState(paymentsMethods[0].value);
  const [amount, setAmount] = useState('');

  const pickerOnChangeValue = value => {
    setPaymentMethod(value);
  };
  const selectPaymentMethod = () => {
    props.actions.getScreen('next', payment_method);
  };

  return (
    <Layout>
      <Body title="Detalles de tu pedido" onBack={false}>
        <View style={styles.detail_container}>
          {orderQuantity.totalDonut !== 0 && (
            <View style={styles.detail_description_container}>
              <Text style={styles.detail_description_title}>Cant. Donas:</Text>
              <Text style={styles.detail_description_value}>
                {orderQuantity.totalDonut}
              </Text>
            </View>
          )}
          {orderQuantity.totalBagel !== 0 && (
            <View style={styles.detail_description_container}>
              <Text style={styles.detail_description_title}>
                Cant. Rosquillas:
              </Text>
              <Text style={styles.detail_description_value}>
                {' '}
                {orderQuantity.totalBagel}
              </Text>
            </View>
          )}

          <View
            style={[
              styles.detail_description_container,
              {marginTop: hp('1%')},
            ]}>
            <Text style={styles.detail_description_title}>Total Bs.S:</Text>
            <Text style={styles.detail_description_value}>
              {props.totalPrice}
            </Text>
          </View>
          <View style={[styles.detail_description_container]}>
            <Text style={styles.detail_description_title}>Total Dólares:</Text>
            <Text style={styles.detail_description_value}>
              {props.totalPriceUSD}
            </Text>
          </View>
        </View>
      </Body>
      <View style={{height: '1%'}} />
      <Body
        title="Selecciona un metodo de pago"
        onBack={props.onBack}
        buttons_component={
          <Buttons
            selectPaymentMethod={selectPaymentMethod}
            payment_method={payment_method}
            optionHandler={props.optionHandler}
          />
        }>
        <ScrollView style={styles.scroll_view}>
          <Picker
            title={'Metodo de pago'}
            selectedValue={payment_method}
            onValueChange={(itemValue, itemIndex) =>
              pickerOnChangeValue(itemValue)
            }
            Picker_Items={paymentsMethods}
          />
          <Input
            payment_method={payment_method}
            amount={amount}
            setAmount={setAmount}
          />
        </ScrollView>
      </Body>
    </Layout>
  );
};
const styles = StyleSheet.create({
  scroll_view: {
    width: '100%',
    maxHeight: hp('20%'),
    marginBottom: '6%',
  },
  detail_container: {
    alignItems: 'center',
  },
  detail_title: {
    fontFamily: 'Poppins-Bold',
    fontSize: wp('4%'),
    color: '#313045',
    marginBottom: hp('1%'),
  },
  detail_description_container: {flexDirection: 'row'},
  detail_description_title: {
    fontFamily: 'Poppins-Bold',
    fontSize: wp('4%'),
    color: '#313045',
    marginRight: wp('3%'),
  },
  detail_description_value: {
    fontFamily: 'Poppins-Regular',
    fontSize: wp('4%'),
    color: '#707070',
  },
  detail_total: {
    marginTop: hp('2%'),
    fontFamily: 'Rockwell',
    fontSize: wp('4%'),
  },
  description: {
    fontFamily: 'Rockwell',
    fontSize: wp('4%'),
    textAlign: 'center',
    color: '#313045',
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: wp('4%'),
    textAlign: 'center',
    color: '#313045',
    marginVertical: hp('2%'),
  },
});
const mapStateToProps = reducers => {
  return reducers.order;
};
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({getScreen}, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(SelectPayment);
