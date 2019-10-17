import React from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
const styles = StyleSheet.create({
  title: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#76799E',
    marginVertical: 8,
  },
  textInput_simple: {
    backgroundColor: '#F9F9F9',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#A2A8DF',
    height: 40,
  },
});

function CustomTextInput(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
      <TextInput
        style={styles.textInput_simple}
        onChangeText={props.onChangeText}
        value={props.value}
        autoCompleteType={props.autoCompleteType}
        secureTextEntry={props.secureTextEntry}
      />
    </View>
  );
}

export default CustomTextInput;
