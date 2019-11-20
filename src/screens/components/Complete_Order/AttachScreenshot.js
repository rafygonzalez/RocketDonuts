import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Body from './Body';
import Button from '../../../ui/components/button';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const Buttons = props => {
  return (
    <View style={{width: '100%'}}>
      <Button
        title="Adjuntar captura de pantalla"
        button_style="primary"
        onPress={() => {
          props.optionHandler('delivery');
        }}
      />
      <Button
        title="Tomar Foto con mi cámara"
        button_style="simple"
        onPress={() => {
          props.optionHandler('factory');
        }}
        extra_style={{marginTop: '3%'}}
      />
    </View>
  );
};
const AttachScreenshot = props => {
  return (
    <Body
      title="Selecciona una opción"
      onBack={props.onBack}
      buttons_component={<Buttons optionHandler={props.optionHandler} />}>
      <Text style={styles.title}>Adjunta la captura de pantalla de la transferencia o toma una foto desde tu celular</Text>
    </Body>
  );
};
const styles = StyleSheet.create({
  title: {
    fontFamily: 'OpenSans-Bold',
    fontSize: wp('4%'),
    textAlign: 'center',
    color: '#313045',
    marginVertical: hp('3%'),
  },
});
export default AttachScreenshot;
