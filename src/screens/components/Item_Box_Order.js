import React, {Component} from 'react';
import {View, StyleSheet, Dimensions, Text} from 'react-native';
import Button from '../../ui/components/button';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Item_Box_Order = props => {
  const Item = props.item;

  return (
    <View style={[styles.container]}>
      <View style={styles.svgContainer}>
        <Item width={wp('14.85%')} height={hp('4.21%')} />
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.text]}>{props.item_name}</Text>
      </View>

      <Button
        title="+"
        button_style="positive"
        size="small"
        onPress={() => this.props.DonutIncrement(this.props.id)}
      />
      <Button
        title="-"
        button_style="negative"
        size="small"
        onPress={() => this.props.DonutDecrement(this.props.id)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp('82.85%'),
    height: hp('8.55%'),
    flex: 1,
    marginTop: 16,
    backgroundColor: '#48475B',
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  svgContainer: {justifyContent: 'center', alignItems: 'center'},
  textContainer: {
    justifyContent: 'center',
    marginHorizontal: '5%',
  },
  text: {fontFamily: 'Rockwell', color: 'white', fontSize: wp('6.8%')},
});
export default Item_Box_Order;
