import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Body from './Body';
import Button from '../../../ui/components/button';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const Buttons = props => {
  return (
    <View style={{width: '100%'}}>
      <Button title="Aceptar" button_style="primary" onPress={() => {}} />
    </View>
  );
};
const ShowScreenshot = props => {
  return (
    <Body
      title="Captura de pantalla"
      onBack={props.onBack}
      buttons_component={<Buttons optionHandler={props.optionHandler} />}>
      <Text style={styles.title}>Vista previa</Text>
      <View style={styles.uploadAvatar_container}>
        <Image source={props.avatarSource} style={styles.uploadAvatar} />
      </View>
    </Body>
  );
};
const styles = StyleSheet.create({
  uploadAvatar_container: {
    width: '100%',
    height: hp('30%'),
    backgroundColor: '#EDEEF4',
    marginVertical: hp('2%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadAvatar: {
    width: '100%',
    height: hp('30%'),
    resizeMode: 'contain',
  },
  title: {
    fontFamily: 'OpenSans-Bold',
    fontSize: wp('4%'),
    textAlign: 'center',
    color: '#313045',
    marginVertical: hp('2%'),
  },
});
export default ShowScreenshot;
