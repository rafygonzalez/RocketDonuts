import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Body from './Body';
import Button from '../../../ui/components/button';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Picker from '../../../ui/components/picker';
import {connect} from 'react-redux';
import {getScreen} from '../../../../redux/actions/orderActions';
import {bindActionCreators} from 'redux';

const Buttons = props => {
  const {addresses} = props.Global.currentUser;

  return (
    <View style={{width: '100%'}}>
      <Button
        title={addresses.length !== 0 ? 'Continuar' : 'Añadir mi ubicación'}
        button_style="primary"
        onPress={() => {
          addresses.length !== 0
            ? props.selectAddress()
            : props.navigation.navigate('Location');
        }}
      />
    </View>
  );
};

const makeAddressesArray = addresses => {
  let array = [];
  addresses.forEach((address, index) => {
    array.push({
      label: address.formatted_address,
      value: address.LatLng,
    });
  });
  return array;
};
const SelectAnAddress = props => {
  // Ternario para saber si tenemos o no direcciones
  // Si no la tenemos regresar un array vacio
  // Si tenemos el array vacio mandar mensaje para que añada una dirección
  let addresses = [];
  if (props.Global.currentUser.addresses.length !== 0) {
    addresses = makeAddressesArray(props.Global.currentUser.addresses);
  }

  const [addressValue, setAddressValue] = useState(
    addresses.length !== 0 ? addresses[0].value : '',
  );

  const pickerOnChangeValue = value => {
    setAddressValue(value);
  };

  const selectAddress = () => {
    const filterVal = ({value}) => value == addressValue;
    props.actions.getScreen('next', addresses.filter(filterVal)[0]);
  };

  return (
    <Body
      title="Selecciona tu dirección"
      onBack={props.onBack}
      buttons_component={<Buttons selectAddress={selectAddress} {...props} />}>
      <Text style={styles.title}>
        {addresses.length == 0
          ? 'No has añadido ninguna dirección y ubicación GPS'
          : '¿Donde deseas que aterricemos?'}
      </Text>
      <Text style={styles.description}>
        {addresses.length == 0
          ? 'Añade una dirección y ubicación GPS haciendo clic en el siguiente botón para poder continuar con tu pedido.'
          : 'Selecciona la dirección de tu preferencia para que nuestro astronauta pueda encontrarte.'}
      </Text>
      {addresses.length !== 0 && (
        <View style={{width: '100%', marginVertical: '5%'}}>
          <Picker
            title={'Mis Direcciones'}
            selectedValue={addressValue}
            onValueChange={(itemValue, itemIndex) => {
              pickerOnChangeValue(itemValue);
            }}
            Picker_Items={addresses}
          />
        </View>
      )}
    </Body>
  );
};

/*      {label: address.formatted_address, 
              value: address.LatLng
              }*/

const styles = StyleSheet.create({
  description: {
    fontFamily: 'Rockwell',
    fontSize: wp('4%'),
    textAlign: 'center',
    color: '#313045',
    marginVertical: '5%',
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: wp('4%'),
    textAlign: 'center',
    color: '#313045',
    marginVertical: hp('3%'),
  },
});

const mapStateToProps = reducers => {
  return {Order: reducers.order, Global: reducers.globalReducer};
};
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({getScreen}, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(SelectAnAddress);
