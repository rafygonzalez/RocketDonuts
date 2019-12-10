import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Body from './Body';
import Button from '../../../ui/components/button';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {connect} from 'react-redux';

const Buttons = props => {
  return (
    <View style={{width: '100%'}}>
      <Button
        title="Continuar"
        button_style="primary"
        onPress={() => {
          props.optionHandler();
        }}
      />
    </View>
  );
};
const ShowBankData = props => {
  return (
    <Body
      title="Datos Bancarios"
      onBack={props.onBack}
      buttons_component={<Buttons optionHandler={props.optionHandler} />}>
      {props.datos == 'transferencia' ? (
        <View style={styles.container}>
          <Text style={styles.title}>Banco</Text>
          <Text style={styles.description}>{props.config.BankData.Banco}</Text>
          <Text style={styles.title}>Número De Cuenta</Text>
          <Text style={styles.description}>
            {props.config.BankData.NCuenta}
          </Text>
          <Text style={styles.title}>Rif</Text>
          <Text style={styles.description}>{props.config.BankData.Rif}</Text>
          <Text style={styles.title}>Correo Electrónico</Text>
          <Text style={styles.description}>{props.config.BankData.Email}</Text>
          <Text style={styles.title}>Nombre</Text>
          <Text style={styles.description}>{props.config.BankData.Name}</Text>
        </View>
      ) : (
        <View style={styles.container}>
          <Text style={styles.title}>Banco</Text>
          <Text style={styles.description}>{props.config.BankData.Banco}</Text>
          <Text style={styles.title}>Número De Teléfono</Text>
          <Text style={styles.description}>
            {props.config.BankData.NTelefono}
          </Text>
          <Text style={styles.title}>Rif</Text>
          <Text style={styles.description}>{props.config.BankData.Rif}</Text>
          <Text style={styles.title}>Correo Electrónico</Text>
          <Text style={styles.description}>{props.config.BankData.Email}</Text>
          <Text style={styles.title}>Nombre</Text>
          <Text style={styles.description}>{props.config.BankData.Name}</Text>
        </View>
      )}
    </Body>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EDEEF4',
    width: '100%',
    marginBottom: '5%',
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: wp('4%'),
    textAlign: 'center',
    color: '#313045',
    marginVertical: hp('1%'),
  },
  description: {
    fontFamily: 'Rockwell',
    fontSize: wp('4%'),
    textAlign: 'center',
    color: '#313045',
  },
});
const mapStateToProps = reducers => {
  return reducers.order;
};
export default connect(mapStateToProps)(ShowBankData);
