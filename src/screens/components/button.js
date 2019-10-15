import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#24F4C4',
    borderRadius: 3,
    width: '100%',
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button_simple: {
    marginVertical: 16,
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
      style={props.simple ? styles.button_simple : styles.button}
      onPress={!props.onPress ? null : () => {}}
      underlayColor="#fff">
      <Text style={props.simple ? styles.text_simple : styles.text}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
}

export default CustomButton;
