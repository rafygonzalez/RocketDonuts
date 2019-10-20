import React, {Component} from 'react';
import {View, SafeAreaView, StyleSheet, ScrollView} from 'react-native';
import Estrellas from '../../../assets/svg/Estrellas';
import HeaderBanner from '../../sections/components/Header_Banner';
import ProductBox from '../components/Product_Box';
import Donut from '../../../assets/svg/Dona.svg';
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  static navigationOptions = {
    header: null,
  };
  render() {
    return (
      <SafeAreaView style={styles.area_container}>
        <HeaderBanner withTitle />
        <ScrollView>
          <View style={styles.stars_container}>
            <Estrellas width={386} height={528} />
          </View>
          <View style={styles.products_container}>
            <ProductBox item={<Donut />} item_name={'Donas'} />
            <ProductBox item={<Donut />} item_name={'Donas'} />
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
    flexDirection: 'row',
    backgroundColor: '#ECEDF2',
    marginVertical: 16,
    marginHorizontal: 16,
  },
  stars_container: {
    position: 'absolute',
  },
});
export default Home;
