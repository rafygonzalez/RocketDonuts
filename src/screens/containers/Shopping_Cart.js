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
class ShoppingCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.HeaderBanner_OnBack = this.HeaderBanner_OnBack.bind(this);
    this.DeleteOrder = this.DeleteOrder.bind(this);
    this.getDonutDescription = this.getDonutDescription.bind(this);
  }
  static navigationOptions = {
    header: null,
  };
  DeleteOrder() {}
  HeaderBanner_OnBack() {
    this.props.navigation.goBack();
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
  /*
      Item.type == 'Dona' && Item.topping.length > 1 ? 
                          `Rellena con ${Item.filling}, Cubierta de ${Item.cover} y Topping de ${Item.topping}`
                          : 
                          Item.type == 'Rosquilla' && Item.topping.length > 1  ? 
                          `Cubierta de ${Item.cover} y Topping de ${Item.topping}`
                          : 
                          `Cubierta de ${Item.cover}`
                          
                          */
  render() {
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
            height={hp('73.68%')}
            preserveAspectRatio="xMidYMid meet"
          />
        </View>
        <View style={{alignItems:'center', flexGrow: 1}}>
          <View style={styles.order_container}>
            <ScrollView
              style={{maxHeight: hp('25%'), backgroundColor: '#EDEEF4'}}>
              {this.props.order.map((Item, index) => {
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
            <View
              opacity={1}
              style={{
                width: '100%',
                borderBottomColor: '#ECEDF2',
                borderBottomWidth: 2,
                marginVertical: '5%',
              }}
            />
            <View
              style={{
                marginTop: '10%',
                alignItems: 'center',
                width: '85%',
              }}>
              <Button
                title="Realizar Pedido"
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
            <Text style={{color: '#fff'}}>Términos y condiciones | Ayuda</Text>
          </TouchableOpacity>
        </View>
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
    alignItems: 'center',
    flexGrow: 1,
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

    top: hp('23.07%'),
  },
});
const mapStateToProps = reducers => {
  return reducers.order;
};
export default connect(mapStateToProps)(ShoppingCart);
