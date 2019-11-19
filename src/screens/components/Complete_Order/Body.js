import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Divider from '../Divider';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Body = props => {
  return (
    <View style={styles.body_container}>
      <View>
        <Text style={styles.body_title}>{props.title}</Text>
      </View>
      <Divider />
      {props.children}
      {props.buttons_component}
    </View>
  );
};
const styles = StyleSheet.create({
  body_title: {
    fontFamily: 'Rockwell',
    fontSize: wp('5%'),
    textAlign: 'center',
    color: '#313045',
  },
  body_container: {
    backgroundColor: 'white',
    borderRadius: 3,
    borderWidth: 0.5,
    borderColor: '#C7C8D6',
    width: '90%',
    alignItems: 'center',
    paddingHorizontal: wp('5%'),
    paddingVertical: wp('5%'),
  },
});
export default Body;
