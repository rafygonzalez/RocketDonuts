import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Body from './Body';
import Button from '../../../ui/components/button';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ImagePicker from 'react-native-image-picker';
import {connect} from 'react-redux';
import {getScreen} from '../../../../redux/modules/orderReducer';
import {bindActionCreators} from 'redux';
const errorHandlerUploadCapture = (resolve, reject, response) => {
  if (response.didCancel) {
    reject('User cancelled image picker');
    ////console.log('User cancelled image picker');
  } else if (response.error) {
    reject(response.error);
    ////console.log('ImagePicker Error: ', response.error);
  } else if (response.customButton) {
    ////console.log('User tapped custom button: ', response.customButton);
  } else {
    // You can also display the image using data:
    // const source = { uri: 'data:image/jpeg;base64,' + response.data };
    resolve({imageSource: response});
  }
};

function uploadCapture(mode) {
  return new Promise((resolve, reject) => {
    const options = {
      title: null,
      customButtons: null,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    if (mode == 'local') {
      ImagePicker.launchImageLibrary(options, response => {
        errorHandlerUploadCapture(resolve, reject, response);
      });
    } else if (mode == 'camera') {
      ImagePicker.launchCamera(options, response => {
        errorHandlerUploadCapture(resolve, reject, response);
      });
    }
    return false;
  });
}

const Buttons = props => {
  const handleCapture = async origin => {
    const response = await uploadCapture(origin);
    props.actions.getScreen('next', response);
  };
  return (
    <View style={{width: '100%'}}>
      <Button
        title="Adjuntar captura de pantalla"
        button_style="primary"
        onPress={() => handleCapture('local')}
      />
      <Button
        title="Tomar Foto con mi cámara"
        button_style="simple"
        onPress={() => {}}
        extra_style={{marginTop: '3%'}}
        onPress={() => handleCapture('camera')}
      />
    </View>
  );
};
const AttachScreenshot = props => {
  return (
    <Body
      title="Selecciona una opción"
      onBack={props.onBack}
      buttons_component={<Buttons {...props} />}>
      <Text style={styles.title}>
        Adjunta la captura de pantalla de la transferencia o toma una foto desde
        tu celular
      </Text>
    </Body>
  );
};
const styles = StyleSheet.create({
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: wp('4%'),
    textAlign: 'center',
    color: '#313045',
    marginVertical: hp('3%'),
  },
});
const mapStateToProps = reducers => {
  return reducers.order;
};
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({getScreen}, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(AttachScreenshot);
