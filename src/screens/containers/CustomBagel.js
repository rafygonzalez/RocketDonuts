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
import {Product_Box} from '../components/Product_Box';
import Item_Box from '../components/Item_Box';
import Button from '../../ui/components/button';
// Products
import {RosquillaSola} from '../components/Products';

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

//Redux
import {connect} from 'react-redux';

class CustomBagel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orientation: '',
      header_width: 0,
      header_heigth: 0,
      screen_width: 0,
      screen_height: 0,
      selectedProduct: '',
      customizeSteps: 3,
      customizeStep: 1,
      fillingDonut: '',
      coverDonut: '',
      toppingDonut: '',
      title_add_more_fontsize: 0,
    };
    this.onSelectedProduct = this.onSelectedProduct.bind(this);
    this.onSelectedItem = this.onSelectedItem.bind(this);
    this.HeaderBanner_OnBack = this.HeaderBanner_OnBack.bind(this);
    this.FinishCustomization = this.FinishCustomization.bind(this);
    this.CancelCustomization = this.CancelCustomization.bind(this);
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
      title_add_more_fontsize: (6 * width) / 100,
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
    this.setState({
      selectedProduct: name,
      customizeStep: this.state.customizeStep + 1,
    });
  }
  HeaderBanner_OnBack() {
    this.GoTo('Inicio');
  }
  onSelectedItem(name, type) {
    this.setState({customizeStep: this.state.customizeStep + 1});
    switch (type) {
      case 'cover':
        if (name == 'Glaseado') {
          this.setState({customizeStep: 3});
        }
        this.setState({coverDonut: name});
        break;
      case 'topping':
        this.setState({toppingDonut: name});
        break;
      default:
        console.error('Error customizing donut');
    }
  }
  async FinishCustomization(type) {
    let id = Math.random()
      .toString(36)
      .substring(7);

    await this.props.dispatch({
      type: 'CUSTOM_DONUT',
      payload: {
        type: type,
        fillingDonut: this.state.fillingDonut,
        coverDonut: this.state.coverDonut,
        toppingDonut: this.state.toppingDonut,
        name: `${this.state.coverDonut} ${this.state.toppingDonut}`,
        quantity: 1,
        id: id,
      },
    });
    this.setState({
      selectedProduct: '',
      customizeStep: 1,
      fillingDonut: '',
      coverDonut: '',
      toppingDonut: '',
    });
    this.GoTo('Mi Pedido');
  }
  CancelCustomization() {
    this.setState({
      selectedProduct: '',
      customizeStep: 0,
      fillingDonut: '',
      coverDonut: '',
      toppingDonut: '',
    });
  }
  GoTo(to) {
    this.props.dispatch({
      type: 'CURRENT_SCREEN',
      payload: to,
    });
    this.props.navigation.navigate(to);
  }
  render() {
    const Cubiertas = [CChocolate, CChocolateB, CArequipe, CGlaseado];
    const Toppings = [TChocolate, TChRosadas, TCoco, TColores, TMani];
    const {
      customizeStep,
      fillingDonut,
      coverDonut,
      toppingDonut,
      screen_height,
      screen_width,
      header_heigth,
    } = this.state;

    const coverOfDonut = ({name}) => name == coverDonut;
    const toppingOfDonut = ({name}) => name == toppingDonut;

    return (
      <SafeAreaView style={styles.area_container}>
        <ScrollView
          persistentScrollbar={true}
          contentContainerStyle={{flexGrow: 1}}>
          <HeaderBanner
            withTitle
            onPress={this.HeaderBanner_OnBack}
            back_button={true}
          />
          <View style={[styles.stars_container, {top: header_heigth}]}>
            <Estrellas
              width={screen_width}
              height={screen_height}
              preserveAspectRatio="xMidYMid meet"
            />
          </View>
          <View>
            <View style={styles.item_box_container}>
              <Item_Box item={RosquillaSola} item_name={'Rosquilla'} />
              {customizeStep >= 2 && (
                <Item_Box
                  item={Cubiertas.filter(coverOfDonut)[0].component}
                  item_name={Cubiertas.filter(coverOfDonut)[0].name}
                />
              )}
              {customizeStep >= 3 && coverDonut !== 'Glaseado' && (
                <Item_Box
                  item={Toppings.filter(toppingOfDonut)[0].component}
                  item_name={Toppings.filter(toppingOfDonut)[0].name}
                />
              )}
            </View>
            <View>
              {customizeStep == 1 ? (
                <View>
                  <View style={styles.title_container_add_more}>
                    <Text
                      style={[
                        styles.title_add_more,
                        {fontSize: this.state.title_add_more_fontsize},
                      ]}>
                      Elige una cubierta
                    </Text>
                  </View>
                  <View style={styles.products_container}>
                    {Cubiertas.map((Cubierta, index) => {
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
                </View>
              ) : customizeStep == 2 && coverDonut !== 'Glaseado' ? (
                <View>
                  <View style={styles.title_container_add_more}>
                    <Text
                      style={[
                        styles.title_add_more,
                        {fontSize: this.state.title_add_more_fontsize},
                      ]}>
                      Elige un Topping
                    </Text>
                  </View>
                  <View style={styles.products_container}>
                    {Toppings.map((Topping, index) => {
                      return (
                        <Product_Box
                          onPress={() =>
                            this.onSelectedItem(Topping.name, 'topping')
                          }
                          item={Topping.component}
                          item_name={Topping.name}
                          key={index}
                        />
                      );
                    })}
                  </View>
                </View>
              ) : (
                customizeStep == 3 && (
                  <View
                    style={{
                      position: 'relative',
                      width: '90%',
                      marginTop: '2%',
                      marginHorizontal: '5%',
                    }}>
                    <Button
                      title="Finalizar"
                      button_style="primary"
                      onPress={() => {
                        this.FinishCustomization('Rosquilla');
                      }}
                    />
                    <Button
                      title="Cancelar"
                      button_style="simple"
                      onPress={() => {
                        this.CancelCustomization();
                      }}
                    />
                  </View>
                )
              )}
            </View>
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
  title_add_more: {
    color: '#FF9800',
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
  return reducers.globalReducer;
};
export default connect(mapStateToProps)(CustomBagel);
