import React, {Component} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Dimensions,
  Text,
  TouchableOpacity,
} from 'react-native';
import Estrellas from '../../../assets/svg/Estrellas_bw.svg';
import HeaderBanner from '../../sections/components/Header_Banner';
import {Product_Box} from '../components/Product_Box';
import Item_Box from '../components/Item_Box';
import Button from '../../ui/components/button';
// Products
import {Dona, Rosquilla, DonaSola} from '../components/Products';
// Filling
import {
  RChocolate,
  RArequipe,
  RChocolateB,
  RCPastelera,
} from '../components/Donuts_Filling';
// Covers
import {
  CChocolate,
  CArequipe,
  CChocolateB,
  CGlaseado,
} from '../components/Donuts_Covers';
// Topings
import {
  TChocolate,
  TChRosadas,
  TCoco,
  TColores,
  TMani,
} from '../components/Donuts_Toppings';

import {getDonut} from '../components/Donuts_List';

//Redux
import {connect} from 'react-redux';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orientation: '',
      header_width: 0,
      header_heigth: 0,
      screen_width: 0,
      screen_height: 0,
      selectedProduct: '',
    };
    this.onSelectedProduct = this.onSelectedProduct.bind(this);
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
  onSelectedProduct(name) {
    if (name === 'Donut') {
      this.props.navigation.navigate('CustomDonut');
    }
  }

  render() {
    const {screen_height, screen_width, header_heigth} = this.state;

    return (
      <SafeAreaView style={styles.area_container}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <HeaderBanner
            withTitle
            onPress={this.HeaderBanner_OnBack}
            back_button={false}
          />
          <View style={[styles.stars_container, {top: header_heigth}]}>
            <Estrellas
              width={screen_width}
              height={screen_height}
              preserveAspectRatio="xMidYMid meet"
            />
          </View>

          <View style={styles.products_container}>
            <Product_Box
              onPress={() => this.onSelectedProduct('Donut')}
              item={Dona}
              item_name={'Donas'}
            />
            <Product_Box item={Rosquilla} item_name={'Rosquilla'} />
            <Product_Box
              imageBackground
              imgSrc={require('../../../assets/img/Donut.jpg')}
              item_name={'Promo Espacial'}
            />
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
  item_box_container: {
    marginVertical: 8,
    marginHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'stretch',
  },
  products_container: {
    flexWrap: 'wrap',
    flexDirection: 'row',
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
export default connect(mapStateToProps)(Home);
