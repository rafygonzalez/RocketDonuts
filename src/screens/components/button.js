import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const button_base = {
  marginVertical: 8,
  borderRadius: 3,
  width: '100%',
  minHeight: 64,
  maxHeight: 65,
  justifyContent: 'center',
  alignItems: 'center',
  flex: 1,
  flexDirection: 'row',
};

const styles = StyleSheet.create({
  button: {
    ...button_base,
    backgroundColor: '#24F4C4',
  },
  button_facebook: {
    ...button_base,
    backgroundColor: '#3240E6',
  },
  button_google: {
    ...button_base,
    backgroundColor: '#FC5345',
  },
  button_simple: {
    ...button_base,
    backgroundColor: '#EDEEF4',
  },
  text: {
    textAlign: 'center',
    fontFamily: 'Rockwell',
    color: 'white',
    fontSize: 18,
  },
  text_simple: {
    textAlign: 'center',
    fontFamily: 'Rockwell',
    color: 'black',
    fontSize: 18,
  },
  leftIcon: {
    position: 'absolute',
    left: 32,
  },
});

function CustomButton(props) {
  return (
    <TouchableOpacity
      style={
        props.button_style === 'primary'
          ? styles.button
          : props.button_style === 'facebook'
          ? styles.button_facebook
          : props.button_style === 'google'
          ? styles.button_google
          : styles.button_simple
      }
      onPress={props.onPress}
      underlayColor="#fff">
      <View style={styles.leftIcon}>{props.left_icon}</View>

      <Text
        style={
          props.button_style === 'primary' ||
          props.button_style === 'facebook' ||
          props.button_style === 'google'
            ? styles.text
            : styles.text_simple
        }>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
}

export default CustomButton;
