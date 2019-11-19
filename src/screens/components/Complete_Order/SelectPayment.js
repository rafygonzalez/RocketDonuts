import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Body from './Body';
import Button from '../../../ui/components/button';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Picker from '../../../ui/components/picker';
const Buttons = props => {
  return (
    <View style={{width: '100%'}}>
      <Button title="Continuar" button_style="primary" onPress={() => {}} />
    </View>
  );
};
const Layout = props => {
  return props.children;
};
const SelectPayment = props => {
  return (
    <Layout>
      <Body title="Detalles de tu pedido" onBack={false}>
        <Text style={styles.title}>Detalles de tu pedido</Text>
      </Body>
      <View style={{height: '1%'}} />
      <Body
        title="Selecciona un metodo de pago"
        onBack={props.onBack}
        buttons_component={<Buttons />}>
        <View style={{width: '100%', marginVertical: '3%'}}>
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
        </View>
      </Body>
    </Layout>
  );
};
const styles = StyleSheet.create({
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
export default SelectPayment;
