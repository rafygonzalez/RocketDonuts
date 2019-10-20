import React, {Component} from 'react';
import {View, SafeAreaView, StyleSheet, ScrollView} from 'react-native';
import Estrellas from '../../../assets/svg/Estrellas';
import HeaderBanner from '../../sections/components/Header_Banner';
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
        <ScrollView style={styles.products_container}>
          <View style={styles.stars_container}>
            <Estrellas width={386} height={528} />
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
    backgroundColor: '#ECEDF2',
  },
  stars_container: {
    position: 'absolute',
  },
});
export default Home;
