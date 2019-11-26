import React, {Component} from 'react';
import {View, SafeAreaView, StyleSheet} from 'react-native';
import Estrellas from '../../../assets/svg/Estrellas_bw.svg';
import HeaderBanner from '../../sections/components/Header_Banner';
//Redux
import {connect} from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
class MyOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <SafeAreaView style={styles.area_container}>
        <HeaderBanner
          withMyOrders
          onPress={this.HeaderBanner_OnBack}
          onPressMenu={() => this.props.navigation.toggleDrawer()}
          menu_button
        />
        <View style={styles.stars_container}>
          <Estrellas
            width={wp('100%')}
            height={hp('73.68%')}
            preserveAspectRatio="xMidYMid meet"
          />
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  area_container: {
    flex: 1,
    backgroundColor: '#ECEDF2',
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
const mapStateToProps = state => {
  return {Order: state.order};
};
export default connect(mapStateToProps)(MyOrders);
