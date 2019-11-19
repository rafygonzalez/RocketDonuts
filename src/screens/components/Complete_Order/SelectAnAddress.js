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
const SelectAnAddress = props => {
  return (
    <Body
      title="Selecciona tu dirección"
      onBack={props.onBack}
      buttons_component={<Buttons />}>
      <Text style={styles.title}>¿Donde deseas que aterricemos?</Text>
      <Text style={styles.description}>
        Selecciona la dirección de tu preferencia para que nuestro astronauta
        pueda encontrarte.
      </Text>
      <View style={{width: '100%', marginVertical: '5%'}}>
        <Picker
          title={'Mis Direcciones'}
          selectedValue={props.address}
          onValueChange={(itemValue, itemIndex) =>
            props.pickerOnChangeValue(itemValue, 'address')
          }
          Picker_Items={[
            {label: 'Anzoategui, Lecheria, Club de vela', value: '0'},
          ]}
        />
      </View>
    </Body>
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
    marginVertical: hp('3%'),
  },
});
export default SelectAnAddress;
