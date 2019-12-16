import React, {Component} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Dimensions,
  Text,
  TouchableOpacity,
  Alert,
  BackHandler,
} from 'react-native';
import Estrellas from '../../../../assets/svg/Stars.svg';
import HeaderBanner from '../../../sections/components/Header_Banner';
import OrderDetail from '../../components/Order/Order_Detail';
import Button from '../../../ui/components/button';

import {
  getDonut,
  getDonutDescription,
} from '../../components/Custom_Products/Donuts_List';

//Redux
import {connect} from 'react-redux';

import Layout from '../../components/Layout';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {setCurrentScreen} from '../../../../redux/actions/orderActions';

import {withNavigationFocus} from 'react-navigation';

const isEqual = require('lodash/isEqual');

const Divider = () => {
  return (
    <View
      opacity={1}
      style={{
        width: '100%',
        borderBottomColor: '#ECEDF2',
        borderBottomWidth: 2,
        marginVertical: '5%',
      }}
    />
  );
};
class ShoppingCart extends Component {
  constructor(props) {
    super(props);
    this.state = {totalbs: 0, totalusd: 0};
    this.HeaderBanner_OnBack = this.HeaderBanner_OnBack.bind(this);
    this.DeleteOrder = this.DeleteOrder.bind(this);
    this.getCurrentDate = this.getCurrentDate.bind(this);
  }
  static navigationOptions = {
    header: null,
  };
  shouldComponentUpdate(prevProps, nextState) {
    if (prevProps.isFocused) {
      if (isEqual(prevProps.order, this.props.order)) {
        return false;
      }

      return true;
    }
    return false;
  }
  DeleteOrder() {
    Alert.alert(
      `¿Deseas cancelar tu pedido?`,
      `Si cancelas tu pedido, eliminaras toda la lista`,
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            this.setState({order: []});
            this.props.dispatch({
              type: 'SET_ORDER',
              payload: {orderArray: []},
            });
            this.props.navigation.navigate('Inicio');
          },
        },
      ],
      {cancelable: false},
    );
  }
  HeaderBanner_OnBack() {
    this.props.navigation.goBack();
  }

  getCurrentDate() {
    const today = new Date();
    return {
      Fecha: `${today.getDate()}/${today.getMonth() +
        1}/${today.getFullYear()}`,
      Hora: `${today.getHours()}:${today.getMinutes()}`,
    };
  }

  render() {
    const {orderQuantity, totalPrice, totalPriceUSD} = this.props.order;
    //   console.log('Render Shopping Cart:', this.props);

    return (
      <SafeAreaView style={styles.area_container}>
        <HeaderBanner
          withOrder
          onPress={this.HeaderBanner_OnBack}
          back_button
        />
        <View style={[styles.stars_container]}>
          <Estrellas
            width={wp('100%')}
            height={hp('100.68%')}
            preserveAspectRatio="xMidYMid meet"
          />
        </View>
        <View style={{alignItems: 'center', top: '1%'}}>
          <View style={styles.order_container}>
            <ScrollView
              persistentScrollbar={true}
              style={{maxHeight: hp('17%'), backgroundColor: '#EDEEF4'}}>
              {this.props.order.order.map((Item, index) => {
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
              {orderQuantity.totalDonut !== 0 && (
                <View style={styles.detail_description_container}>
                  <Text style={styles.detail_description_title}>
                    Cant. Donas:
                  </Text>
                  <Text style={styles.detail_description_value}>
                    {orderQuantity.totalDonut}
                  </Text>
                </View>
              )}
              {orderQuantity.totalBagel !== 0 && (
                <View style={styles.detail_description_container}>
                  <Text style={styles.detail_description_title}>
                    Cant. Rosquillas:
                  </Text>
                  <Text style={styles.detail_description_value}>
                    {' '}
                    {orderQuantity.totalBagel}
                  </Text>
                </View>
              )}

              <View
                style={[
                  styles.detail_description_container,
                  {marginTop: hp('1%')},
                ]}>
                <Text style={styles.detail_description_title}>Total Bs.S:</Text>
                <Text style={styles.detail_description_value}>
                  {totalPrice}
                </Text>
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
            <Divider />
            <View style={{flexDirection: 'row'}}>
              <Button
                title="Cancelar"
                button_style="simple"
                onPress={() => {
                  this.DeleteOrder();
                }}
              />
              <Button
                title="Continuar"
                button_style="primary"
                onPress={() => {
                  this.props.dispatch(setCurrentScreen('SelectAnOption'));
                  this.props.navigation.navigate('CompleteOrder');
                }}
                extra_style={{marginLeft: '3%'}}
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
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
  area_order_container: {},
  order_container: {
    backgroundColor: 'white',
    borderRadius: 3,
    borderWidth: 0.5,
    borderColor: '#C7C8D6',
    width: '85%',
    alignItems: 'center',
    paddingHorizontal: wp('5%'),
    paddingVertical: wp('5%'),
  },

  title_container_add_more: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  area_container: {
    backgroundColor: '#313045',
    height: '100%',
  },
  products_container: {
    marginVertical: 8,
    marginHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'stretch',
  },
  background: {
    backgroundColor: '#313045',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stars_container: {
    position: 'absolute',

    top: hp('25%'),
  },
});
const mapStateToProps = reducers => {
  return {order: reducers.order, global: reducers.globalReducer};
};
export default connect(mapStateToProps)(withNavigationFocus(ShoppingCart));
