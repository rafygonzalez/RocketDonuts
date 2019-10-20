import React, {Component} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import Estrellas from '../../../assets/svg/Estrellas';
import HeaderBanner from '../../sections/components/Header_Banner';
import {Product_Box, Product_Box_Large} from '../components/Product_Box';

import Donut from '../../../assets/svg/Dona.svg';
import Bagel from '../../../assets/svg/Rosquilla.svg';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {orientation: '', header_width: 0, header_heigth: 0};
  }
  static navigationOptions = {
    header: null,
  };
  getOrientation = () => {
    var {width} = Dimensions.get('window');

    this.setState({
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

  render() {
    //<Product_Box item={<Rosquilla />} item_name={'Rosquillas'} />

    const Dona = props => <Donut width={props.width} height={props.height} />;
    const Rosquilla = props => (
      <Bagel width={props.width} height={props.height} />
    );
    return (
      <SafeAreaView style={styles.area_container}>
        <ScrollView>
          <HeaderBanner withTitle />
          <View style={styles.stars_container}>
            <Estrellas width={386} height={528} />
          </View>
          <View style={styles.products_container}>
            <Product_Box item={Dona} item_name={'Donas'} />
            <Product_Box item={Rosquilla} item_name={'Rosquilla'} />
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
    backgroundColor: '#ECEDF2',
    marginVertical: 8,
    marginHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'stretch',
  },
  stars_container: {
    position: 'absolute',
  },
});
export default Home;
