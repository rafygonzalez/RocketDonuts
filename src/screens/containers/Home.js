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
import {auth} from 'react-native-firebase';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import API from '../../firebase/api';
import Modal_Loading from '../../ui/components/Modal';
import NotificationsAndroid from '../../firebase/notifications';
//import NetInfo from "@react-native-community/netinfo";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedProduct: '',
      loading: true,
      error: false,
    };
    this.onSelectedProduct = this.onSelectedProduct.bind(this);
    this.GoTo = this.GoTo.bind(this);
    this.messageListener = null;
    this.NotificationInstance = NotificationsAndroid.getInstance();
  }
  static navigationOptions = {
    header: null,
  };
  dispatch = (type, payload) => {
    this.props.dispatch({type: type, payload: payload});
  };
  async componentDidMount() {
    auth().onAuthStateChanged(user => {
      if (!user) {
        this.GoTo('Welcome');
      } else {
        API.Load(this.dispatch)
          .then(state => {
            this.setState({loading: false});
            this.messageListener = this.NotificationInstance.onMessageListener();
          })
          .catch(e => {
            console.warn('Error cargando la app:' + e);
            this.setState({loading: false, error: true});
          });
      }
    });
  }
  componentWillUnmount() {
    this.messageListener();
  }
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
            <Modal_Loading modalVisible={this.state.loading} />
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
export default connect(mapStateToProps)(Home);
