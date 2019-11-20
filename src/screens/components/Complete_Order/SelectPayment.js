import React from 'react';
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

const Buttons = props => {
  return (
    <View style={{width: '100%'}}>
      <Button
        title="Continuar"
        button_style="primary"
        onPress={() => {
          props.optionHandler();
        }}
      />
    </View>
  );
};
const Layout = props => {
  return props.children;
};
getCurrentDate = () => {
  const today = new Date();
  return {
    Fecha: `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`,
    Hora: `${today.getHours()}:${today.getMinutes()}`,
  };
};

const Input = props => {
  if (props.payment_method == 'bs' || props.payment_method == 'dolar') {
    return (
      <TextInput
        title="Por favor, ingresa el monto para poder entregarte cambio."
        onChangeText={text => props.Global_OnChange(text, 'amount')}
        value={props.amount}
      />
    );
  } else {
    return null;
  }
};
const SelectPayment = props => {
  const {orderQuantity} = props;
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
          <View style={styles.detail_description_container}>
            <Text style={styles.detail_description_title}>Fecha:</Text>
            <Text style={styles.detail_description_value}>
              {getCurrentDate().Fecha}
            </Text>
          </View>
          <View style={styles.detail_description_container}>
            <Text style={styles.detail_description_title}>Hora:</Text>
            <Text style={styles.detail_description_value}>
              {getCurrentDate().Hora}
            </Text>
          </View>

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
        </View>
      </Body>
      <View style={{height: '1%'}} />
      <Body
        title="Selecciona un metodo de pago"
        onBack={props.onBack}
        buttons_component={<Buttons optionHandler={props.optionHandler} />}>
        <ScrollView
          style={styles.scroll_view}
         >
          <Picker
            title={'Metodo de pago'}
            selectedValue={props.payment_method}
            onValueChange={(itemValue, itemIndex) =>
              props.pickerOnChangeValue(itemValue, 'payment_method')
            }
            Picker_Items={[
              {label: 'Transferencia', value: 'transferencia'},
              {label: 'Pago Móvil', value: 'pago_movil'},
              {label: 'Efectivo Bs.S', value: 'bs'},
              {label: 'Efectivo Dólares', value: 'dolar'},
            ]}
          />
          <Input payment_method={props.payment_method} />
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
    fontFamily: 'OpenSans-Bold',
    fontSize: wp('5%'),
    color: '#151619',
    marginBottom: hp('1%'),
  },
  detail_description_container: {flexDirection: 'row'},
  detail_description_title: {
    fontFamily: 'OpenSans-Bold',
    fontSize: wp('4%'),
    color: '#151619',
    marginRight: wp('3%'),
  },
  detail_description_value: {
    fontFamily: 'OpenSans-Regular',
    fontSize: wp('4%'),
    color: '#707070',
  },
  detail_total: {
    marginTop: hp('2%'),
    fontFamily: 'OpenSans-Regular',
    fontSize: wp('4%'),
  },
  description: {
    fontFamily: 'OpenSans-regular',
    fontSize: wp('4%'),
    textAlign: 'center',
    color: '#313045',
  },
  title: {
    fontFamily: 'OpenSans-Bold',
    fontSize: wp('4%'),
    textAlign: 'center',
    color: '#313045',
    marginVertical: hp('2%'),
  },
});
const mapStateToProps = reducers => {
  return reducers.order;
};
export default connect(mapStateToProps)(SelectPayment);
