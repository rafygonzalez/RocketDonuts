import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
const Item_Box = (props) => {

    const Item = props.item;
    return (
      <View style={[styles.container]}>
        <View style={styles.svgContainer}>
          <Item width={wp('14.85%')} height={hp('4.21%')} />
        </View>
        <View style={styles.textContainer}>
          <Text style={[styles.text]}>
            {props.item_name}
          </Text>
        </View>
      </View>
    );
  
}
const styles = StyleSheet.create({
  container: {
    width: wp('82.85%'),
    height: hp('7.55%'),
    marginTop: 16,
    backgroundColor: '#48475B',
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
  },
  svgContainer: {justifyContent: 'center', alignItems: 'center'},
  textContainer: {
    justifyContent: 'center',
    marginLeft: '10%',
  },
  text: {fontFamily: 'Rockwell', color: 'white', fontSize: wp('6.8%')},
});
export default Item_Box;
