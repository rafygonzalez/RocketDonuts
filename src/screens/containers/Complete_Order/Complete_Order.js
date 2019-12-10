import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import Stars from '../../../../assets/svg/Stars.svg';
import Logo from '../../../../assets/svg/Logo_With_Planets.svg';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import SelectAnOption from '../../components/Complete_Order/SelectAnOption';
import SelectAnAddress from '../../components/Complete_Order/SelectAnAddress';
import SelectPayment from '../../components/Complete_Order/SelectPayment';
import ShowBankData from '../../components/Complete_Order/ShowBankData';
import AttachScreenshot from '../../components/Complete_Order/AttachScreenshot';
import ShowScreenshot from '../../components/Complete_Order/ShowScreenshot';
import Finish from '../../components/Complete_Order/Finish';

import API from '../../../firebase/api';
import {connect} from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import {storage} from 'react-native-firebase';
import Container from './Container';

class CompleteOrder extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <LinearGradient colors={['#242441', '#55537B']} style={styles.background}>
        <View style={styles.container}>
          <Stars />
          <View style={styles.Logo_Container}>
            <Logo width={wp('80%')} height={wp('80%') * 0.5} />
            <Container />
          </View>
        </View>
      </LinearGradient>
    );
  }
}
const styles = StyleSheet.create({
  ActivityIndicator: {
    marginTop: 32,
  },
  Logo_Container: {
    flex: 1,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    backgroundColor: '#313045',
    height: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
});
const mapStateToProps = reducers => {
  return {order: reducers.order, global: reducers.globalReducer};
};
export default connect(mapStateToProps)(CompleteOrder);
