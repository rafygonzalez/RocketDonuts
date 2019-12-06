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
      <Button
        title="Continuar"
        button_style="primary"
        onPress={() => props.onPress()}
      />
    </View>
  );
};

const SelectAnAddress = props => {
  const {addresses} = props;
  console.log(props.address);
  return (
    <Body
      title="Selecciona tu dirección"
      onBack={props.onBack}
      buttons_component={<Buttons onPress={props.optionHandler} />}>
      <Text style={styles.title}>¿Donde deseas que aterricemos?</Text>
      <Text style={styles.description}>
        Selecciona la dirección de tu preferencia para que nuestro astronauta
        pueda encontrarte.
      </Text>
      <View style={{width: '100%', marginVertical: '5%'}}>
        <Picker
          title={'Mis Direcciones'}
          selectedValue={props.address}
          onValueChange={(itemValue, itemIndex) => {
            console.log(itemIndex);
            props.pickerOnChangeValue(itemValue, 'address');
          }}
          Picker_Items={addresses}
        />
      </View>
    </Body>
  );
};

/*      {label: address.formatted_address, 
              value: address.LatLng
              }*/
const styles = StyleSheet.create({
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
    marginVertical: hp('3%'),
  },
});
export default SelectAnAddress;
