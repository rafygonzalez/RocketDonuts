import React, {useState} from 'react';
import {
  Modal,
  Text,
  TouchableHighlight,
  View,
  Alert,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export default Modal_Loading = props => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
      }}>
      <View style={styles.area_container}>
        <View style={styles.body_container}>
          <Text style={styles.loading_text}>Cargando</Text>

          <ActivityIndicator size="large" color="#FF700F" />
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  area_container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  loading_text: {
    fontFamily: 'Poppins-Regular',
    color: '#313045',
    fontSize: wp('5'),
    marginBottom: '15%',
  },
  body_container: {
    zIndex: 0,
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 3,
    borderWidth: 0.5,
    borderColor: '#C7C8D6',
    width: wp('50%'),
    height: hp('20%'),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: wp('5%'),
    paddingVertical: wp('5%'),
  },
});
