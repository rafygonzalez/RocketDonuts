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
import Estrellas from '../../../assets/svg/Stars.svg';
import HeaderBanner from '../../sections/components/Header_Banner';
import OrderDetail from '../components/Order_Detail';
import Button from '../../ui/components/button';

import {getDonut} from '../components/Donuts_List';
import {Dona, Rosquilla} from '../components/Products';
//Redux
import {connect} from 'react-redux';

import Layout from '../components/Layout';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import API from '../../firebase/api';
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
    this.state = {total: 0};
    this.HeaderBanner_OnBack = this.HeaderBanner_OnBack.bind(this);
    this.DeleteOrder = this.DeleteOrder.bind(this);
    this.getDonutDescription = this.getDonutDescription.bind(this);
    this.getCurrentDate = this.getCurrentDate.bind(this);
    this.getAmount = this.getAmount.bind(this);
  }
  static navigationOptions = {
    header: null,
  };
  DeleteOrder() {}
  HeaderBanner_OnBack() {
    this.props.navigation.goBack();
  }
  componentDidMount() {
    this.getAmount();
  }
  getDonutDescription(type, topping, cover, filling) {
    if (type == 'Dona') {
      if (topping.length > 1) {
        return `Rellena con ${filling}, Cubierta de ${cover} y Topping de ${topping}`;
      } else {
        return `Rellena con ${filling} y Cubierta de ${cover}`;
      }
    } else if (type == 'Rosquilla') {
      if (topping.length > 1) {
        return `Cubierta de ${cover} y Topping de ${topping}`;
      } else {
        return `Cubierta de ${cover}`;
      }
    }
  }
  getCurrentDate() {
    const today = new Date().toLocaleString('es', {
      timeZone: 'America/Caracas',
    });
    const all = today.split(' ');
    return {Fecha: all[0], Hora: all[1]};
  }

  getAmount() {
    const {config, orderQuantity} = this.props.order;
    const DonutPrice = config.Donuts.usdPrice;
    const BagelPrice = config.Bagel.usdPrice;
    var totalDonutPrice = 0;
    var totalBagelPrice = 0;
    var TotalUSD = 0;
    if (orderQuantity.totalDonut !== 0) {
      totalDonutPrice = DonutPrice * orderQuantity.totalDonut;
    }
    if (orderQuantity.totalBagel !== 0) {
      totalBagelPrice = BagelPrice * orderQuantity.totalBagel;
    }
    TotalUSD = totalDonutPrice + totalBagelPrice;

    const averageUsd = this.props.global.usdAverage;
    const totalOrder = TotalUSD * averageUsd;
    this.setState({total: totalOrder.toFixed(2)});
  }

  makeAnOrder = () => {
    API.makeAnOrder(this.props.order.order);
  };
  render() {
    const {orderQuantity} = this.props.order;
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
              style={{height: hp('35%'), backgroundColor: '#EDEEF4'}}>
              {this.props.order.order.map((Item, index) => {
                return (
                  <Layout key={index}>
                    <OrderDetail
                      item={getDonut(Item.cover, Item.topping, Item.type)}
                      item_name={`${Item.type} x ${Item.quantity}`}
                      description={this.getDonutDescription(
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
              <View style={styles.detail_description_container}>
                <Text style={styles.detail_description_title}>Fecha:</Text>
                <Text style={styles.detail_description_value}>
                  {this.getCurrentDate().Fecha}
                </Text>
              </View>
              <View style={styles.detail_description_container}>
                <Text style={styles.detail_description_title}>Hora:</Text>
                <Text style={styles.detail_description_value}>
                  {this.getCurrentDate().Hora}
                </Text>
              </View>

              <View
                style={[
                  styles.detail_description_container,
                  {marginTop: hp('1%')},
                ]}>
                <Text style={styles.detail_description_title}>Total Bs.S:</Text>
                <Text style={styles.detail_description_value}>
                  {this.state.total}
                </Text>
              </View>
            </View>
            <Divider />
            <Button
              title="Continuar"
              button_style="primary"
              onPress={() => {}}
            />
            <Button
              title="Cancelar Pedido"
              button_style="simple"
              onPress={() => {}}
              extra_style={{marginTop: '3%'}}
            />
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
    fontFamily: 'OpenSans-Bold',
    fontSize: wp('5%'),
    color: '#151619',
    marginBottom: hp('1%'),
  },
  detail_description_container: {flexDirection: 'row'},
  detail_description_title: {
    fontFamily: 'OpenSans-Bold',
    fontSize: wp('4%'),
    color: '#151619',
    marginRight: wp('3%'),
  },
  detail_description_value: {
    fontFamily: 'OpenSans-Regular',
    fontSize: wp('4%'),
    color: '#707070',
  },
  detail_total: {
    marginTop: hp('2%'),
    fontFamily: 'OpenSans-Regular',
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
export default connect(mapStateToProps)(ShoppingCart);
