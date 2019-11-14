import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
 
const CustomButton = (props) => {
    return (
      <TouchableOpacity
        style={[
          props.button_style === 'primary'
            ? styles.button
            : props.button_style === 'facebook'
            ? styles.button_facebook
            : props.button_style === 'google'
            ? styles.button_google
            : props.button_style === 'positive'
            ? styles.button_positive
            : props.button_style === 'negative'
            ? styles.button_negative
            : styles.button_simple,
          props.extra_style,
          {
           maxHeight:
              props.size == 'small' || props.size == 'medium'
                ? hp('4.5%')
                : hp('7%'),
                minHeight:
                props.size == 'small' || props.size == 'medium'
                  ? hp('4.5%')
                  : hp('7%'),
          },
          props.size == 'small'
            ? {
                maxWidth: wp('10%'),
              }
            : props.size == 'medium' && {
                maxWidth: wp('20%'),
              },
        ]}
        onPress={props.onPress}
        underlayColor="#fff">
        <View style={styles.leftIcon}>{props.left_icon}</View>

        <Text
          style={[
            props.button_style === 'primary' ||
            props.button_style === 'facebook' ||
            props.button_style === 'positive' ||
            props.button_style === 'negative'
              ? styles.text
              : styles.text_simple,
            {fontSize: wp('5%')},
          ]}>
          {props.title}
        </Text>
      </TouchableOpacity>
    );
  }

const button_base = {
  borderRadius: 3,
  justifyContent: 'center',
  alignItems: 'center',
  flex: 1,
  width: '100%',
  flexDirection: 'row',
};

const styles = StyleSheet.create({
  button: {
    ...button_base,
    backgroundColor: '#FA8219',
  },
  button_facebook: {
    ...button_base,
    backgroundColor: '#3240E6',
  },
  button_google: {
    ...button_base,
    backgroundColor: 'white',
  },
  button_simple: {
    ...button_base,
    backgroundColor: '#64D1BD',
  },
  button_positive: {
    ...button_base,
    backgroundColor: '#34E64F',
  },
  button_negative: {
    ...button_base,
    backgroundColor: '#D9343A',
  },
  text: {
    textAlign: 'center',
    fontFamily: 'Rockwell',
    color: 'white',
  },
  text_simple: {
    textAlign: 'center',
    fontFamily: 'Rockwell',
    color: 'white',
  },
  leftIcon: {
    position: 'absolute',
    left: '3%',
  },
});
export default CustomButton;
