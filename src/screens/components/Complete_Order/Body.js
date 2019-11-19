import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Divider from '../Divider';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import BackArrow from '../../../../assets/svg/BackArrow_Black.svg';
const Body = props => {
  return (
    <View style={styles.body_container}>
      <TouchableOpacity onPress={() => {}}>
        <View style={styles.body_top}>
          {props.onBack !== false && <BackArrow width={24} height={24} />}
          <Text style={styles.body_title}>{props.title}</Text>
        </View>
      </TouchableOpacity>

      <Divider />
      {props.children}
      {props.buttons_component}
    </View>
  );
};
const styles = StyleSheet.create({
  body_top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  body_title: {
    fontFamily: 'Rockwell',
    fontSize: wp('5%'),
    textAlign: 'center',
    color: '#313045',
    marginLeft: '4%',
  },
  body_container: {
    backgroundColor: 'white',
    borderRadius: 3,
    borderWidth: 0.5,
    borderColor: '#C7C8D6',
    width: '95%',
    alignItems: 'center',
    paddingHorizontal: wp('5%'),
    paddingVertical: wp('5%'),
  },
});
export default Body;
