import React from 'react';
import {Picker, StyleSheet, View, Text} from 'react-native';
const Layout = props => {
  return props.children;
};
const CustomPicker = props => {
  return (
    <Layout>
      <Text style={styles.title}> {props.title} </Text>
      <View style={styles.picker_container}>
        <Picker
          style={styles.picker}
          selectedValue={props.selectedValue}
          onValueChange={props.onValueChange}>
          {props.Picker_Items.map(Item => {
            return <Picker.Item label={Item.label} value={Item.value} />;
          })}
        </Picker>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#76799E',
    marginVertical: 8,
  },
  picker: {
    bottom: 7,
  },
  picker_container: {
    backgroundColor: '#F9F9F9',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#A2A8DF',
    height: 40,
  },
});
export default CustomPicker;
