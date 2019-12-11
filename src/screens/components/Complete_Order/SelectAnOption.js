import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Body from './Body';
import Button from '../../../ui/components/button';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {connect} from 'react-redux';
import {getScreen} from '../../../../redux/actions/orderActions';
import {bindActionCreators} from 'redux';
const Buttons = props => {
  return (
    <View style={{width: '100%'}}>
      <Button
        title="Servicio Delivery"
        button_style="primary"
        onPress={() => {
          props.actions.getScreen('next', 'Delivery');
        }}
      />
      <Button
        title="Buscar a la Fábrica"
        button_style="simple"
        onPress={() => {
          props.actions.getScreen('next', 'PickUp');
        }}
        extra_style={{marginTop: '3%'}}
      />
    </View>
  );
};
const SelectAnOption = props => {
  return (
    <Body
      title="Selecciona una opción"
      onBack={props.onBack}
      buttons_component={<Buttons {...props} />}>
      <Text style={styles.title}>¿Quieres que te lo llevemos?</Text>
    </Body>
  );
};
const styles = StyleSheet.create({
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: wp('4%'),
    textAlign: 'center',
    color: '#313045',
    marginVertical: hp('3%'),
  },
});
const mapStateToProps = reducers => {
  return reducers.order;
};
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({getScreen}, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(SelectAnOption);
