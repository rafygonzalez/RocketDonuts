import React from 'react';
import {View, Text, StyleSheet, Image, ProgressBarAndroid} from 'react-native';
import Body from './Body';
import Button from '../../../ui/components/button';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {connect} from 'react-redux';
import {
  getScreen,
  makeAnOrder,
  onListenerUpload,
  uploadCaptureToStorage,
} from '../../../../redux/actions/orderActions';
import {bindActionCreators} from 'redux';
const Buttons = props => {
  if (props.CompleteOrder.orderStatus.status == 'UPLOADING') {
    return null;
  }
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
  console.log(props.CompleteOrder.orderStatus.status);
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

      {props.CompleteOrder.orderStatus.status == 'UPLOADING' && (
        <View style={{width: '100%'}}>
          <Text style={styles.title}>
            {`Subiendo ${props.CompleteOrder.orderStatus.value} %`}
          </Text>
          <ProgressBarAndroid
            styleAttr="Horizontal"
            indeterminate={false}
            progress={props.CompleteOrder.orderStatus.value}
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
