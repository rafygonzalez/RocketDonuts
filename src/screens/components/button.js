import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';

const styles = StyleSheet.create({
  button: {
    marginBottom: 16,
    backgroundColor: '#24F4C4',
    borderRadius: 3,
    width: '100%',
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button_facebook: {
    marginBottom: 16,
    backgroundColor: '#3240E6',
    borderRadius: 3,
    width: '100%',
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button_google: {
    marginBottom: 16,
    backgroundColor: '#FC5345',
    borderRadius: 3,
    width: '100%',
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button_simple: {
    marginBottom: 16,
    backgroundColor: '#EDEEF4',
    borderRadius: 3,
    width: '100%',
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
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
