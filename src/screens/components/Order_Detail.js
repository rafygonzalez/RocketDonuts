import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
const OrderDetail = (props) => {

    const Item = props.item;
    return (
      <View
        style={{
          paddingVertical: 16,
          paddingHorizontal: 32,
        }}>
        <View style={styles.container}>
          <View style={styles.svgContainer}>
            <Item width={wp('16.32%')} height={hp('8.68%')} />
          </View>
          <View style={styles.textContainer}>
            <Text style={(styles.text)}>
              {props.item_name}
            </Text>
          </View>
        </View>

        <Text
          style={(styles.textDescription)}>
          {props.description}
        </Text>
      </View>
    );
  
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  svgContainer: {justifyContent: 'center', alignItems: 'center'},
  textContainer: {
    justifyContent: 'center',
    marginLeft: '10%',
  },
  text: {fontFamily: 'Poppins-Bold', color: 'gray',fontSize: wp('6%')},
  textDescription: {fontFamily: 'Poppins-Regular', color: 'black',fontSize: wp('4%'), marginTop:hp('2%')},
});
export default OrderDetail;
