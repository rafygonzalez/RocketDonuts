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

// Products
import {Dona, Rosquilla, DonaSola} from '../components/Products';
// Covers
import {
  RChocolate,
  RArequipe,
  RChocolateB,
  RCPastelera,
  Prueba2,
} from '../components/Donuts_Filling';

//

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
      customizeDonut: false,
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
  onSelectedProduct(name) {
    this.setState({selectedProduct: name, customizeDonut: true});
  }
  render() {
    const Rellenos = [RChocolate, RArequipe, RChocolateB, RCPastelera];
    console.log(Prueba2);
    return (
      <SafeAreaView style={styles.area_container}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <HeaderBanner withTitle />
          <View
            style={[styles.stars_container, {top: this.state.header_heigth}]}>
            <Estrellas
              width={this.state.screen_width}
              height={this.state.screen_height}
              preserveAspectRatio="xMidYMid meet"
            />
          </View>
          {this.state.customizeDonut ? (
            <View style={styles.products_container}>
              <Item_Box item={DonaSola} item_name={'Dona'} />

              {Rellenos.map(Relleno => {
                return (
                  <Product_Box
                    onPress={() => this.onSelectedProduct('Donut')}
                    item={Relleno.component}
                    item_name={Relleno.name}
                  />
                );
              })}
            </View>
          ) : (
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
          )}

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
export default Home;
