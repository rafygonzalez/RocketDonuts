import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput, Dimensions} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

const CustomTextInput = props => {
  return (
    <View style={styles.container}>
      <Text style={[styles.title, {fontSize: wp('4%')}]}>{props.title}</Text>
      <TextInput
        style={[
          styles.textInput_simple,
          {fontSize: wp('4%'), height: wp('10%')},
        ]}
        onChangeText={props.onChangeText}
        value={props.value}
        autoCompleteType={props.autoCompleteType}
        secureTextEntry={props.secureTextEntry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  title: {
    fontFamily: 'Rockwell',
    color: '#76799E',
    marginVertical: 8,
  },
  textInput_simple: {
    backgroundColor: '#F9F9F9',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#A2A8DF',
  },
});

export default CustomTextInput;
