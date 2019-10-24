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
import Estrellas from '../../../assets/svg/Estrellas.svg';
import HeaderBanner from '../../sections/components/Header_Banner';
import OrderDetail from '../components/Order_Detail';
import Divider from '../../ui/components/divider';
import Button from '../../ui/components/button';

import {getDonut} from '../components/Donuts_List';
import {Dona, Rosquilla} from '../components/Products';
//Redux
import {connect} from 'react-redux';

class ShoppingCart extends Component {
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
    this.DeleteOrder = this.DeleteOrder.bind(this);
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
      this.props.navigation.navigate('Order');
      return true;
    });
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change');
    BackHandler.removeEventListener('hardwareBackPress');
  }

  DeleteOrder() {}
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
          <View
            style={{
              top: '5%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={styles.order_container}>
              <OrderDetail
                item={Dona}
                item_name={'Dona x 2'}
                description="Rellena con chocolate, cubierta de chocolate y topping de lluvia de colores"
              />
              <View
                style={{
                  width: '90%',
                  borderBottomColor: 'gray',
                  borderBottomWidth: 1,
                  marginVertical: '3%',
                  marginHorizontal: '5%',
                }}
              />
              <View
                style={{
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  width: '85%',
                }}>
                <Button
                  title="Pagar"
                  button_style="primary"
                  onPress={() => {}}
                />
                <Button
                  title="Cancelar Pedido"
                  button_style="simple"
                  onPress={() => {}}
                  extra_style={{marginTop: '2%'}}
                />
              </View>
            </View>
          </View>

          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              alignItems: 'center',
              marginVertical: 16,
              marginHorizontal: '9%',
              width: '82%',
            }}>
            <TouchableOpacity style={{marginTop: '5%'}}>
              <Text style={{color: '#fff'}}>
                Términos y condiciones | Ayuda
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  area_order_container: {},
  order_container: {
    backgroundColor: 'white',
    borderRadius: 3,
    borderWidth: 0.5,
    borderColor: '#C7C8D6',
    width: '85%',
    justifyContent: 'center',
    alignItems: 'center',

    paddingHorizontal: '0.5%',
    paddingVertical: 16,
  },
  title_add_more: {
    fontFamily: 'Rockwell',
  },
  title_container_add_more: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  area_container: {
    flex: 1,
    backgroundColor: '#313045',
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
export default connect(mapStateToProps)(ShoppingCart);
