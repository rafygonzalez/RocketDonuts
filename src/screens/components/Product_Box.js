import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {BoxShadow} from 'react-native-shadow';
const shadowOpt = {
  width: 164,
  height: 180,
  color: '#000',
  border: 2,
  radius: 6,
  opacity: 0.2,
  x: 0,
  y: 1,
  style: {
    marginVertical: 8,
    marginHorizontal: 8,
  },
};

export const Product_Box = props => {
  return (
    <BoxShadow setting={shadowOpt}>
      <TouchableOpacity
        onPress={props.onPress}
        style={styles.item_box_container}>
        <View style={styles.svg_container}>{props.item}</View>
        <View style={styles.item_name_container}>
          <Text style={styles.item_name_text}>{props.item_name}</Text>
        </View>
      </TouchableOpacity>
    </BoxShadow>
  );
};

const styles = StyleSheet.create({
  item_name_text: {
    fontFamily: 'Rockwell',
    fontSize: 30,
    textAlign: 'center',
  },
  item_box_container: {
    borderRadius: 3,
    borderWidth: 0.5,
    borderColor: '#C7C8D6',
    width: 164,
    height: 178,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
  },
  svg_container: {
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  item_name_container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
