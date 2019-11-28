import React, {Component} from 'react';
import {View, SafeAreaView, StyleSheet, ScrollView} from 'react-native';
import Estrellas from '../../../assets/svg/Estrellas_bw.svg';
import HeaderBanner from '../../sections/components/Header_Banner';
//Redux
import {connect} from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Box from '../components/My_Orders/Box';
import Modal_Order from '../components/My_Orders/Modal_Order';
import api from '../../firebase/api';
class MyOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      orders: [],
    };
  }
  componentDidMount() {
    api.getUserOrders().then(orders => {
      console.log(orders);
      this.setState({orders});
    });
  }
  toggleModal = () => {
    this.setState({modalVisible: !this.state.modalVisible});
  };
  render() {
    const {orders} = this.state;
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
        <ScrollView style={styles.order_container}>
          {orders.length > 0 &&
            orders.map(order => {
              return <Box key={order.key} toggleModal={this.toggleModal} />;
            })}
        </ScrollView>
        <Modal_Order
          modalVisible={this.state.modalVisible}
          toggleModal={this.toggleModal}
          order={this.props.Order.order}
        />
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  area_container: {
    flex: 1,
    backgroundColor: '#ECEDF2',
  },
  stars_container: {
    position: 'absolute',
    top: hp('23.07%'),
  },
  order_container: {
    marginHorizontal: '3%',
    marginVertical: '3%',
  },
});
const mapStateToProps = state => {
  return {Order: state.order, Global: state.globalReducer};
};
export default connect(mapStateToProps)(MyOrders);