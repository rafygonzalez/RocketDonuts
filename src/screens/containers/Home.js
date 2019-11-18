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
import {auth, firestore} from 'react-native-firebase';
import {withNavigationFocus} from 'react-navigation';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import API from '../../firebase/api';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedProduct: '',
    };
    this.onSelectedProduct = this.onSelectedProduct.bind(this);
    this.GoTo = this.GoTo.bind(this);
  }
  static navigationOptions = {
    header: null,
  };

  async componentDidMount() {
    auth().onAuthStateChanged(user => {
      if (!user) {
        this.GoTo('Welcome');
      }
    });
    API.getConfigProducts().then(result => {
      this.props.dispatch({
        type: 'CONFIG_PRODUCTS',
        payload: result,
      });
    });
    const averageUsd = await this.getDolarTodayApi();
    this.props.dispatch({
      type: 'USD_AVERAGE',
      payload: averageUsd,
    });
  }
  getDolarTodayApi = () => {
    return new Promise(resolve => {
      fetch('https://s3.amazonaws.com/dolartoday/data.json')
        .then(result => {
          return result.json();
        })
        .then(json => {
          resolve(json.USD.promedio);
        });
    });
  };
  onSelectedProduct(name) {
    if (name === 'Donut') {
      this.GoTo('CustomDonut');
    } else if (name === 'Bagel') {
      this.GoTo('CustomBagel');
    }
  }
  GoTo(to) {
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
            onPressMenu={() => this.props.navigation.toggleDrawer()}
            back_button={false}
            menu_button
          />
          <View style={[styles.stars_container]}>
            <Estrellas
              width={wp('100%')}
              height={hp('73.68%')}
              preserveAspectRatio="xMidYMid meet"
            />
          </View>

          <View style={styles.products_container}>
            <Product_Box
              onPress={() => this.onSelectedProduct('Donut')}
              item={Dona}
              item_name={'Donas'}
            />
            <Product_Box
              onPress={() => this.onSelectedProduct('Bagel')}
              item={Rosquilla}
              item_name={'Rosquillas'}
            />
            <Product_Box
              imageBackground
              onPress={() => {}}
              imgSrc={require('../../../assets/img/Promo-Espacial.png')}
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
  return reducers.globalReducer;
};
export default connect(mapStateToProps)(withNavigationFocus(Home));
