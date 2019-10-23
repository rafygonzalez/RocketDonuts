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
} from 'react-native';
import Estrellas from '../../../assets/svg/Estrellas_bw.svg';
import HeaderBanner from '../../sections/components/Header_Banner';
import Item_Box_Order from '../components/Item_Box_Order';
import Button from '../../ui/components/button';

import {getDonut} from '../components/Donuts_List';

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
    };
    this.HeaderBanner_OnBack = this.HeaderBanner_OnBack.bind(this);
    this.DonutIncrement = this.DonutIncrement.bind(this);
    this.DonutDecrement = this.DonutDecrement.bind(this);
    this.DeleteDonut = this.DeleteDonut.bind(this);
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
  }
  componentWillUnmount() {
    Dimensions.removeEventListener('change');
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
    console.log(orderArray);
    this.setState({order: orderArray});
    this.props.dispatch({
      type: 'SET_ORDER',
      payload: {orderArray: orderArray},
    });
  }
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
          <View
            style={{
              flex: 1,
              position: 'relative',
              justifyContent: 'flex-end',
              alignItems: 'center',
              marginVertical: 8,
            }}>
            <TouchableOpacity>
              <Text>Términos y condiciones | Ayuda</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
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
