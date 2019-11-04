import React, {Component} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Dimensions,
  Text,
  TouchableOpacity,
  BackHandler,
  Alert,
} from 'react-native';
import Estrellas from '../../../assets/svg/Estrellas_bw.svg';
import HeaderBanner from '../../sections/components/Header_Banner';
import {Product_Box} from '../components/Product_Box';
import Dona from '../../../assets/svg/Dona.svg';
import Rosquilla from '../../../assets/svg/Rosquilla.svg';
//Redux
import {connect} from 'react-redux';
import firebase from 'react-native-firebase';
import {withNavigationFocus} from 'react-navigation';
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
    this._pasEditUnmountFunction = this._pasEditUnmountFunction.bind(this);
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
    });
  };
  _pasEditUnmountFunction() {
    if (this.props.currentScreen == 'Home') {
      Alert.alert(
        `¿Deseas cerrar sesión?`,
        ` `,
        [
          {
            text: 'No',
            onPress: () => {},
            style: 'cancel',
          },
          {
            text: 'Si',
            onPress: () => {
              firebase.auth().signOut();
              this.GoTo('Welcome');
            },
          },
        ],
        {cancelable: false},
      );
      return true;
    } else {
      return false;
    }
  }
  componentDidMount() {
    this.getOrientation();
    Dimensions.addEventListener('change', () => {
      this.getOrientation();
    });
    BackHandler.addEventListener(
      'hardwareBackPress',
      this._pasEditUnmountFunction,
    );
  }
  componentWillUnmount() {
    Dimensions.removeEventListener('change');
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this._pasEditUnmountFunction,
    );
  }
  onSelectedProduct(name) {
    if (name === 'Donut') {
      this.GoTo('CustomDonut');
    }
  }
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
  return reducers.order, reducers.globalReducer;
};
export default connect(mapStateToProps)(withNavigationFocus(Home));
