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
import Modal from '../../ui/components/Modal';
const Layout = props => {
  return props.children;
};

class MyOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      modalVisible: false,
      orders: [],
      orderSelected: {},
      ShowScreenshot: false,
    };
    this.updateOrder = this.updateOrder.bind(this);
    this.orderListener = null;
    this.isEmpty = this.isEmpty.bind(this);
    this.ShowScreenshot = this.ShowScreenshot.bind(this);
  }
  updateOrder(orders) {
    this.setState({orders, loading: false});
  }
  componentDidMount() {
    this.orderListener = api.userOrdersListener(this.updateOrder);
  }
  componentWillUnmount() {
    this.orderListener();
  }
  toggleModal = code => {
    const {orders} = this.state;
    const isOrder = ({codeNumber}) => codeNumber == code;
    var orderSelected = orders.filter(isOrder);

    this.setState({
      modalVisible: !this.state.modalVisible,
      orderSelected: orderSelected[0],
    });
  };
  isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }
  ShowScreenshot() {
    this.setState({ShowScreenshot: !this.state.ShowScreenshot});
  }
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
        {!this.state.loading ? (
          <Layout>
            <ScrollView style={styles.order_container}>
              {orders.length > 0 &&
                orders.map(order => {
                  return (
                    <Box
                      state={order.state}
                      date={order.date}
                      codeNumber={order.codeNumber}
                      key={order.codeNumber}
                      toggleModal={this.toggleModal}
                    />
                  );
                })}
            </ScrollView>
            {!this.isEmpty(this.state.orderSelected) && (
              <Modal_Order
                ShowScreenshot={this.ShowScreenshot}
                screenshotVisible={this.state.ShowScreenshot}
                modalVisible={this.state.modalVisible}
                toggleModal={this.toggleModal}
                order={this.state.orderSelected}
              />
            )}
          </Layout>
        ) : (
          <Modal modalVisible={this.state.loading} />
        )}
      </SafeAreaView>
    );
  }
}
/*          */
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
    flex: 1,
    marginHorizontal: '3%',
    marginVertical: '3%',
  },
});
const mapStateToProps = state => {
  return {Order: state.order, Global: state.globalReducer};
};
export default connect(mapStateToProps)(MyOrders);
