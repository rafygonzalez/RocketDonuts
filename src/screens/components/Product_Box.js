import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const Product_Box = props => {
  const Item = props.item;
  if (props.imageBackground) {
    return (
      <TouchableOpacity
        onPress={props.onPress}
        style={[styles.item_box_lg_container]}>
        <Image source={props.imgSrc} style={styles.imgSrc} />

        <View style={styles.item_name_lgcontainer}>
          <Text style={styles.item_name_lgtext}>{props.item_name}</Text>
        </View>
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity
        onPress={props.onPress}
        style={[styles.item_box_container]}>
        <View style={[styles.svg_container]}>
          <Item width={wp('19.79%')} height={hp('10.04%')} />
        </View>
        <View style={styles.item_name_container}>
          <Text style={styles.item_name_text}>{props.item_name}</Text>
        </View>
      </TouchableOpacity>
    );
  }
};

const styles = StyleSheet.create({
  img: {},
  item_name_lgtext: {
    fontFamily: 'Rockwell',
    fontSize: wp('6%'),
    color: 'white',
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  item_name_text: {
    fontFamily: 'Rockwell',
    fontSize: wp('5%'),
    textAlign: 'center',
  },
  item_box_lg_container: {
    borderRadius: 3,
    borderWidth: 0.5,
    borderColor: '#C7C8D6',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginVertical: 8,
    marginHorizontal: 8,
    width: wp('83%'),
    height: hp('17%'),
  },
  imgSrc: {
    width: wp('83%'),
    height: hp('17%'),
  },
  item_box_container: {
    borderRadius: 3,
    borderWidth: 0.5,
    borderColor: '#C7C8D6',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    marginVertical: 8,
    marginHorizontal: 8,
    width: wp('39.61%'),
    height: hp('22%'),
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('1%'),
  },
  svg_container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  item_name_lgcontainer: {
    marginTop: 8,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
  item_name_container: {
    marginTop: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
