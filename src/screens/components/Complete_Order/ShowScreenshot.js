import React from 'react';
import {View, Text, StyleSheet, Image, ProgressBarAndroid} from 'react-native';
import Body from './Body';
import Button from '../../../ui/components/button';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {connect} from 'react-redux';
import {getScreen, makeAnOrder} from '../../../../redux/actions/orderActions';
import {bindActionCreators} from 'redux';
const Buttons = props => {
  return (
    <View style={{width: '100%'}}>
      <Button
        title="Aceptar"
        button_style="primary"
        onPress={async () => {
          await props.actions.makeAnOrder();

          props.actions.getScreen('next', true);
        }}
      />
    </View>
  );
};
const ShowScreenshot = props => {
  ////console.log(props.avatarSource);
  return (
    <Body
      title="Captura de pantalla"
      onBack={props.onBack}
      buttons_component={<Buttons {...props} />}>
      <Text style={styles.title}>Vista previa</Text>
      <View style={styles.uploadAvatar_container}>
        <Image
          source={{
            uri:
              props.CompleteOrder.Screens['AttachScreenShot'].selectedOption
                .imageSource.uri,
          }}
          style={styles.uploadAvatar}
        />
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
const mapStateToProps = reducers => {
  return reducers.order;
};
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({getScreen, makeAnOrder}, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(ShowScreenshot);
