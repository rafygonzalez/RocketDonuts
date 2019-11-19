import React, {Component} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Estrellas from '../../../assets/svg/Estrellas_bw.svg';
import HeaderBanner from '../../sections/components/Header_Banner';
import Item_Box_Order from '../components/Item_Box_Order';
import Item_Box_Small from '../components/Item_Box_Small';
import Divider from '../../ui/components/divider';
import Button from '../../ui/components/button';

import {getDonut} from '../components/Donuts_List';
import {Dona, Rosquilla} from '../components/Products';
//Redux
import {connect} from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.HeaderBanner_OnBack = this.HeaderBanner_OnBack.bind(this);
    this.DonutIncrement = this.DonutIncrement.bind(this);
    this.DonutDecrement = this.DonutDecrement.bind(this);
    this.DeleteDonut = this.DeleteDonut.bind(this);
    this.DeleteOrder = this.DeleteOrder.bind(this);
    this.MakeAnOrder = this.MakeAnOrder.bind(this);
    this.backHandler = null;
    this.GoTo = this.GoTo.bind(this);
    this.GoToCart = this.GoToCart.bind(this);
    this.getQuantityOrder = this.getQuantityOrder.bind(this);
  }
  static navigationOptions = {
    header: null,
  };

  DonutIncrement(id) {
    const idDonut = id;
    let orderArray = this.props.Order.order;
    const isDonut = ({id}) => id == idDonut;
    const index = orderArray.findIndex(isDonut);
    orderArray[index].quantity += 1;
    this.props.dispatch({
      type: 'SET_ORDER',
      payload: {orderArray: orderArray},
    });
  }

  DonutDecrement(id) {
    const idDonut = id;
    let orderArray = this.props.Order.order;
    const isDonut = ({id}) => id == idDonut;
    const index = orderArray.findIndex(isDonut);
    if (orderArray[index].quantity > 1) {
      orderArray[index].quantity -= 1;
      this.setState({order: orderArray});
      this.props.dispatch({
        type: 'SET_ORDER',
        payload: {orderArray: orderArray},
      });
    } else {
      Alert.alert(
        `¿Deseas eliminar tu ${orderArray[index].type} personalizada?`,
        `Si aceptas, puedes eliminar tu ${orderArray[index].type} y personalizar otra.`,
        [
          {
            text: 'Cancel',
            onPress: () => {},
            style: 'cancel',
          },
          {text: 'OK', onPress: () => this.DeleteDonut(id)},
        ],
        {cancelable: false},
      );
    }
  }
  DeleteDonut(id) {
    const idDonut = id;
    let orderArray = this.props.Order.order;
    const isDonut = ({id}) => id == idDonut;
    const index = orderArray.findIndex(isDonut);
    orderArray.splice(index, 1);
    this.setState({order: orderArray});
    this.props.dispatch({
      type: 'SET_ORDER',
      payload: {orderArray: orderArray},
    });
    if (orderArray.length === 0) {
      this.GoTo('Inicio');
    }
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
            this.GoTo('Inicio');
          },
        },
      ],
      {cancelable: false},
    );
  }
  MakeAnOrder() {}
  HeaderBanner_OnBack() {}
  GoTo(to) {
    this.props.navigation.navigate(to);
  }
  getQuantityOrder() {
    const {order} = this.props.Order;
    var totalDonut = 0;
    var totalBagel = 0;
    order.map(({type, quantity}) => {
      if (type == 'Dona') {
        totalDonut += quantity;
      } else if (type == 'Rosquilla') totalBagel += quantity;
    });
    return {totalDonut, totalBagel};
  }
  GoToCart() {
    const quantity = this.getQuantityOrder();
    this.props.dispatch({
      type: 'SET_ORDER_QUANTITY',
      payload: quantity,
    });
    this.GoTo('ShoppingCart');
  }
  render() {
    return (
      <SafeAreaView style={styles.area_container}>
        <HeaderBanner
          withOrder
          onPress={this.HeaderBanner_OnBack}
          onPressMenu={() => this.props.navigation.toggleDrawer()}
          menu_button
        />
        <View style={[styles.stars_container]}>
          <Estrellas
            width={wp('100%')}
            height={hp('73.68%')}
            preserveAspectRatio="xMidYMid meet"
          />
        </View>
        <ScrollView style={{maxHeight: hp('28%')}} persistentScrollbar={true}>
          <View style={styles.products_container}>
            {this.props.Order.order.map((Donut, index) => {
              return (
                <Item_Box_Order
                  item={getDonut(Donut.cover, Donut.topping, Donut.type)}
                  item_name={`${Donut.type} x ${Donut.quantity}`}
                  key={index}
                  id={Donut.id}
                  DonutIncrement={this.DonutIncrement}
                  DonutDecrement={this.DonutDecrement}
                />
              );
            })}
          </View>
        </ScrollView>
        {this.props.Order.order.length > 0 && <Divider />}

        <View style={styles.title_container_add_more}>
          {this.props.Order.order.length > 0 ? (
            <Text style={styles.title_add_more}>¿Deseas algo mas?</Text>
          ) : (
            <Text style={styles.title_add_more}>
              No has hecho tu pedido, ¿Deseas algo?
            </Text>
          )}
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: '7%',
          }}>
          <Item_Box_Small
            onPress={() => {
              this.GoTo('CustomDonut');
            }}
            item={Dona}
            item_name={'Dona'}
          />
          <Item_Box_Small
            onPress={() => {
              this.GoTo('CustomBagel');
            }}
            item={Rosquilla}
            item_name={'Rosquilla'}
          />
        </View>

        {this.props.Order.order.length > 0 && <Divider />}
        {this.props.Order.order.length > 0 && (
          <View
            style={{
              flex: 2,
              justifyContent: 'flex-end',
              alignItems: 'center',
              marginVertical: 16,
              marginHorizontal: '9%',
              width: '82%',
            }}>
            <Button
              title="Continuar"
              button_style="primary"
              onPress={() => {
                this.GoToCart();
              }}
            />
            <Button
              title="Cancelar Pedido"
              button_style="simple"
              onPress={() => {
                this.DeleteOrder();
              }}
              extra_style={{marginTop: '2%'}}
            />
            <TouchableOpacity style={{marginTop: '5%'}}>
              <Text>Términos y condiciones | Ayuda</Text>
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  title_add_more: {
    color: '#FF9800',
    fontFamily: 'OpenSans-Bold',
    fontSize: wp('6%'),
    textAlign:'center'
  },
  title_container_add_more: {
  },
  area_container: {
    flex: 1,
    backgroundColor: '#ECEDF2',
  },
  products_container: {
    flexWrap: 'wrap',
    marginVertical: 8,
    marginHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'stretch',
  },
  background: {
    backgroundColor: '#313045',

    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stars_container: {
    position: 'absolute',
    top: hp('23.07%'),
  },
});
const mapStateToProps = state => {
  return {Order: state.order};
};
export default connect(mapStateToProps)(Order);
