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

class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orientation: '',
      header_width: 0,
      header_heigth: 0,
      screen_width: 0,
      screen_height: 0,
      order: this.props.Order.order,
      title_add_more_fontsize: 0,
    };
    this.HeaderBanner_OnBack = this.HeaderBanner_OnBack.bind(this);
    this.DonutIncrement = this.DonutIncrement.bind(this);
    this.DonutDecrement = this.DonutDecrement.bind(this);
    this.DeleteDonut = this.DeleteDonut.bind(this);
    this.DeleteOrder = this.DeleteOrder.bind(this);
    this.MakeAnOrder = this.MakeAnOrder.bind(this);
    this.gotoShoppingCart = this.gotoShoppingCart.bind(this);
    this.backHandler = null;
    this.GoTo = this.GoTo.bind(this);
  }
  static navigationOptions = {
    header: null,
  };
  getOrientation = () => {
    var {width, height} = Dimensions.get('window');
    this.setState({
      screen_width: width,
      screen_height: height,
      header_width: width,
      header_heigth: (39.61 * width) / 100,
      title_add_more_fontsize: (4.83 * width) / 100,
    });
  };
  componentDidUpdate(prevProps) {
    if (prevProps.Order.order !== this.state.order) {
      this.setState({order: prevProps.Order.order});
    }
  }

  componentDidMount() {
    this.getOrientation();
    Dimensions.addEventListener('change', () => {
      this.getOrientation();
    });
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change');
  }
  gotoShoppingCart() {
    this.props.dispatch({
      type: 'SET_ORDER',
      payload: {orderArray: this.state.order},
    });
    this.GoTo('ShoppingCart');
  }
  DonutIncrement(id) {
    const idDonut = id;
    let orderArray = this.state.order;
    const isDonut = ({id}) => id == idDonut;
    const index = orderArray.findIndex(isDonut);
    orderArray[index].quantity += 1;
    this.setState({order: orderArray});
    this.props.dispatch({
      type: 'SET_ORDER',
      payload: {orderArray: orderArray},
    });
  }
  DonutDecrement(id) {
    const idDonut = id;
    let orderArray = this.state.order;
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
    let orderArray = this.state.order;
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
    this.props.dispatch({
      type: 'CURRENT_SCREEN',
      payload: to,
    });
    this.props.navigation.navigate(to);
  }
  render() {
    const {screen_height, screen_width, header_heigth} = this.state;
    return (
      <SafeAreaView style={styles.area_container}>
        <ScrollView
          persistentScrollbar={true}
          contentContainerStyle={{flexGrow: 1}}>
          <HeaderBanner
            withOrder
            onPress={this.HeaderBanner_OnBack}
            onPressMenu={() => this.props.navigation.toggleDrawer()}
          />
          <View style={[styles.stars_container, {top: header_heigth}]}>
            <Estrellas
              width={screen_width}
              height={screen_height}
              preserveAspectRatio="xMidYMid meet"
            />
          </View>
          <View style={styles.products_container}>
            {this.state.order.map((Donut, index) => {
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

          {this.state.order.length > 0 && <Divider />}

          <View style={styles.title_container_add_more}>
            {this.state.order.length > 0 ? (
              <Text
                style={[
                  styles.title_add_more,
                  {fontSize: this.state.title_add_more_fontsize},
                ]}>
                ¿Deseas algo mas?
              </Text>
            ) : (
              <Text
                style={[
                  styles.title_add_more,
                  {fontSize: this.state.title_add_more_fontsize},
                ]}>
                No has hecho tu pedido, ¿Deseas algo?
              </Text>
            )}
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: '9%',
            }}>
            <Item_Box_Small
              onPress={() => {
                this.GoTo('CustomDonut');
              }}
              item={Dona}
              item_name={'Añadir Dona'}
            />
            <Item_Box_Small
              onPress={() => {
                this.GoTo('CustomBagel');
              }}
              item={Rosquilla}
              item_name={'Añadir Rosquilla'}
            />
          </View>

          {this.state.order.length > 0 && <Divider />}
          {this.state.order.length > 0 && (
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
                  this.gotoShoppingCart();
                }}
              />
              <Button
                title="Cancelar Pedido"
                button_style="simple"
                onPress={() => {
                  this.DeleteOrder();
                }}
              />
              <TouchableOpacity style={{marginTop: '5%'}}>
                <Text>Términos y condiciones | Ayuda</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  title_add_more: {
    fontFamily: 'Rockwell',
    textAlign: 'center',
  },
  title_container_add_more: {
    justifyContent: 'center',
    alignItems: 'center',
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
  },
});
const mapStateToProps = reducers => {
  return {Order: reducers.order, Global: reducers.globalReducer};
};
export default connect(mapStateToProps)(Order);
