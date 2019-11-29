import React, {useState} from 'react';
import {
  Modal,
  Text,
  TouchableHighlight,
  View,
  Alert,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Layout from '../Layout';
import OrderDetail from '../Order_Detail';
import {getDonut, getDonutDescription} from '../Donuts_List';
import Divider from '../Divider';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default Modal_Order = props => {
  const {totalPrice, totalPriceUSD, quantity} = props.order;
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.modalVisible}
      onRequestClose={() => {
        props.toggleModal();
      }}>
      <View style={styles.area_container}>
        <View style={styles.body_container}>
          <View></View>
          <Divider />
          <TouchableOpacity>
            <Text>Ver Soporte de Pago Adjuntado</Text>
          </TouchableOpacity>
          <Divider />
          <ScrollView
            persistentScrollbar={true}
            style={{
              maxHeight: hp('17%'),
              backgroundColor: '#EDEEF4',
            }}>
            {props.order.order.map((Item, index) => {
              return (
                <Layout key={index}>
                  <OrderDetail
                    item={getDonut(Item.cover, Item.topping, Item.type)}
                    item_name={`${Item.type} x ${Item.quantity}`}
                    description={getDonutDescription(
                      Item.type,
                      Item.topping,
                      Item.cover,
                      Item.filling,
                    )}
                    key={index}
                  />
                </Layout>
              );
            })}
          </ScrollView>
          <Divider />
          <View style={styles.detail_container}>
            <Text style={styles.detail_title}>Detalles del pedido</Text>
            {quantity.totalDonut !== 0 && (
              <View style={styles.detail_description_container}>
                <Text style={styles.detail_description_title}>
                  Cant. Donas:
                </Text>
                <Text style={styles.detail_description_value}>
                  {quantity.totalDonut}
                </Text>
              </View>
            )}
            {quantity.totalBagel !== 0 && (
              <View style={styles.detail_description_container}>
                <Text style={styles.detail_description_title}>
                  Cant. Rosquillas:
                </Text>
                <Text style={styles.detail_description_value}>
                  {' '}
                  {quantity.totalBagel}
                </Text>
              </View>
            )}

            <View
              style={[
                styles.detail_description_container,
                {marginTop: hp('1%')},
              ]}>
              <Text style={styles.detail_description_title}>Total Bs.S:</Text>
              <Text style={styles.detail_description_value}>{totalPrice}</Text>
            </View>
            <View style={[styles.detail_description_container]}>
              <Text style={styles.detail_description_title}>
                Total Dólares:
              </Text>
              <Text style={styles.detail_description_value}>
                {totalPriceUSD}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};
/*       */
const styles = StyleSheet.create({
  area_container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  loading_text: {
    fontFamily: 'Poppins-Regular',
    color: '#313045',
    fontSize: wp('5'),
    marginBottom: '15%',
  },
  body_container: {
    zIndex: 0,
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 3,
    borderWidth: 0.5,
    borderColor: '#C7C8D6',
    width: wp('85%'),
    height: hp('70%'),
    paddingHorizontal: wp('5%'),
    paddingVertical: wp('5%'),
  },
  detail_container: {
    alignItems: 'center',
  },
  detail_title: {
    fontFamily: 'Poppins-Bold',
    fontSize: wp('4%'),
    color: '#313045',
    marginBottom: hp('1%'),
  },
  detail_description_container: {flexDirection: 'row'},
  detail_description_title: {
    fontFamily: 'Poppins-Bold',
    fontSize: wp('4%'),
    color: '#313045',
    marginRight: wp('3%'),
  },
  detail_description_value: {
    fontFamily: 'Poppins-Regular',
    fontSize: wp('4%'),
    color: '#707070',
  },
  detail_total: {
    marginTop: hp('2%'),
    fontFamily: 'Rockwell',
    fontSize: wp('4%'),
  },
});
