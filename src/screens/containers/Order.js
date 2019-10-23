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
      order: this.props.order,
      title_add_more_fontsize: 0,
    };
    this.HeaderBanner_OnBack = this.HeaderBanner_OnBack.bind(this);
    this.DonutIncrement = this.DonutIncrement.bind(this);
    this.DonutDecrement = this.DonutDecrement.bind(this);
    this.DeleteDonut = this.DeleteDonut.bind(this);
    this.DeleteOrder = this.DeleteOrder.bind(this);
    this.MakeAnOrder = this.MakeAnOrder.bind(this);
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
    /* if (this.refs.rootView) {
      if (Dimensions.get('window').width < Dimensions.get('window').height) {
        this.setState({orientation: 'portrait'});
      } else {
        this.setState({orientation: 'landscape'});
      }
    }*/
  };
  componentDidMount() {
    this.getOrientation();
    Dimensions.addEventListener('change', () => {
      this.getOrientation();
    });
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.navigate('Home');
      return true;
    });
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change');
    BackHandler.removeEventListener('hardwareBackPress');
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
    console.log('OrderProp', this.props.order);
    console.log('OrderState', this.props.order);
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
      this.props.navigation.navigate('Home');
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
            this.props.navigation.navigate('Home');
          },
        },
      ],
      {cancelable: false},
    );
  }
  MakeAnOrder() {}
  HeaderBanner_OnBack() {}
  render() {
    const {screen_height, screen_width, header_heigth} = this.state;
    return (
      <SafeAreaView style={styles.area_container}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <HeaderBanner withOrder onPress={this.HeaderBanner_OnBack} />
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
                  item={getDonut(Donut.cover, Donut.topping)}
                  item_name={`${Donut.type} x ${Donut.quantity}`}
                  key={index}
                  id={Donut.id}
                  DonutIncrement={this.DonutIncrement}
                  DonutDecrement={this.DonutDecrement}
                />
              );
            })}
          </View>

          <Divider />

          <View style={styles.title_container_add_more}>
            <Text
              style={[
                styles.title_add_more,
                {fontSize: this.state.title_add_more_fontsize},
              ]}>
              ¿Deseas algo mas?
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: '9%',
            }}>
            <Item_Box_Small
              onPress={() => {
                this.props.navigation.navigate('CustomDonut');
              }}
              item={Dona}
              item_name={'Añadir Dona'}
            />
            <Item_Box_Small
              onPress={() => {}}
              item={Rosquilla}
              item_name={'Añadir Rosquilla'}
            />
          </View>

          <Divider />

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
              onPress={() => {}}
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
        </ScrollView>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  title_add_more: {
    fontFamily: 'Rockwell',
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
  return reducers.order;
};
export default connect(mapStateToProps)(Order);
