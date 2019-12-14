import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const Item_Box_Small = props => {
  const Item = props.item;
  return (
    <TouchableOpacity onPress={props.onPress} style={[styles.container]}>
      <View style={styles.svgContainer}>
        <Item width={wp('8.16%')} height={hp('4.34%')} />
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.text]}>{props.item_name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp('42%'),
    height: hp('5.53%'),
    borderRadius: 3,
    borderWidth: 0.5,
    borderColor: '#C7C8D6',
    marginTop: 16,
    backgroundColor: '#F9F7F4',
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
  },
  svgContainer: {justifyContent: 'center', alignItems: 'center'},
  textContainer: {
    justifyContent: 'center',
    marginLeft: '7%',
  },
  text: {fontFamily: 'Rockwell', color: 'black', fontSize: wp('5%')},
});
export default Item_Box_Small;
