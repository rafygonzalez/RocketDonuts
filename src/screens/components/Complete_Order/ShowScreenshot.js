import React from 'react';
import {View, Text, StyleSheet, Image, ProgressBarAndroid} from 'react-native';
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
        title="Aceptar"
        button_style="primary"
        onPress={() => props.optionHandler()}
      />
    </View>
  );
};
const ShowScreenshot = props => {
  //console.log(props.avatarSource);
  return (
    <Body
      title="Captura de pantalla"
      onBack={props.onBack}
      buttons_component={<Buttons optionHandler={props.optionHandler} />}>
      <Text style={styles.title}>Vista previa</Text>
      <View style={styles.uploadAvatar_container}>
        <Image source={{uri: props.avatarSource}} style={styles.uploadAvatar} />
      </View>

      {props.uploading && (
        <View style={{width: '100%'}}>
          <Text style={styles.title}>
            {props.uploadProgress == 100
              ? 'Completado'
              : `Subiendo ${props.uploadProgress.toFixed(2)} %`}
          </Text>

          <ProgressBarAndroid
            styleAttr="Horizontal"
            indeterminate={false}
            progress={props.uploadProgress / 100}
          />
        </View>
      )}
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
    fontFamily: 'Poppins-Bold',
    fontSize: wp('4%'),
    textAlign: 'center',
    color: '#313045',
    marginVertical: hp('1%'),
  },
});
export default ShowScreenshot;
