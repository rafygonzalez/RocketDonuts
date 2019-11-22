import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const OrderDetail = props => {
  const Item = props.item;
  return (
    <View
      style={{
        paddingVertical: 16,
        paddingHorizontal: 32,
      }}>
      <View style={styles.container}>
        <View style={styles.svgContainer}>
          <Item width={wp('8.16%')} height={hp('4.34%')} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{props.item_name}</Text>
        </View>
      </View>

      <Text style={styles.textDescription}>{props.description}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  svgContainer: {justifyContent: 'center', alignItems: 'center'},
  textContainer: {
    justifyContent: 'center',
    marginLeft: '10%',
  },
  text: {fontFamily: 'Rockwell', color: '#313045', fontSize: wp('5.8%')},
  textDescription: {
    fontFamily: 'Poppins-Regular',
    color: 'black',
    fontSize: wp('3.5%'),
    marginTop: hp('2%'),
  },
});
export default OrderDetail;
