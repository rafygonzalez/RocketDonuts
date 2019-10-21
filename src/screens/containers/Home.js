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
      customizeSteps: 3,
      customizeStep: 0,
      fillingDonut: '',
      coverDonut: '',
      toppingDonut: '',
    };
    this.onSelectedProduct = this.onSelectedProduct.bind(this);
    this.onSelectedItem = this.onSelectedItem.bind(this);
    this.HeaderBanner_OnBack = this.HeaderBanner_OnBack.bind(this);
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
    this.setState({
      selectedProduct: name,
      customizeDonut: true,
      customizeStep: this.state.customizeStep + 1,
    });
  }
  HeaderBanner_OnBack() {
    this.setState({customizeDonut: false});
  }
  onSelectedItem(name, type) {
    this.setState({customizeStep: this.state.customizeStep + 1});
    switch (type) {
      case 'filling':
        this.setState({fillingDonut: name});
        break;
      case 'cover':
        this.setState({coverDonut: name});
        break;
      case 'topping':
        this.setState({toppingDonut: name});
        break;
      default:
        console.error('Error customizing donut');
    }
  }
  render() {
    const Rellenos = [RChocolate, RArequipe, RChocolateB, RCPastelera];
    const Cubiertas = [CChocolate, CArequipe, CChocolateB, CGlaseado];

    const {
      customizeDonut,
      customizeStep,
      customizeSteps,
      fillingDonut,
      coverDonut,
      screen_height,
      screen_width,
      header_heigth,
    } = this.state;

    const fillOfDonut = ({name}) => name == fillingDonut;
    const coverOfDonut = ({name}) => name == coverDonut;
    return (
      <SafeAreaView style={styles.area_container}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <HeaderBanner
            withTitle
            onPress={this.HeaderBanner_OnBack}
            back_button={customizeDonut ? true : false}
          />
          <View style={[styles.stars_container, {top: header_heigth}]}>
            <Estrellas
              width={screen_width}
              height={screen_height}
              preserveAspectRatio="xMidYMid meet"
            />
          </View>
          {customizeDonut ? (
            <View style={styles.products_container}>
              <Item_Box item={DonaSola} item_name={'Dona'} />
              {customizeStep >= 2 && (
                <Item_Box
                  item={Rellenos.filter(fillOfDonut)[0].component}
                  item_name={Rellenos.filter(fillOfDonut)[0].name}
                />
              )}
              {customizeStep >= 3 && (
                <Item_Box
                  item={Cubiertas.filter(coverOfDonut)[0].component}
                  item_name={Cubiertas.filter(coverOfDonut)[0].name}
                />
              )}
              {customizeStep == 1
                ? Rellenos.map((Relleno, index) => {
                    return (
                      <Product_Box
                        onPress={() =>
                          this.onSelectedItem(Relleno.name, 'filling')
                        }
                        item={Relleno.component}
                        item_name={Relleno.name}
                        key={index}
                      />
                    );
                  })
                : customizeStep == 2 &&
                  Cubiertas.map((Cubierta, index) => {
                    return (
                      <Product_Box
                        onPress={() =>
                          this.onSelectedItem(Cubierta.name, 'cover')
                        }
                        item={Cubierta.component}
                        item_name={Cubierta.name}
                        key={index}
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
