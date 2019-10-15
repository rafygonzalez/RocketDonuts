import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import Estrellas from '../../../assets/svg/Estrellas.svg';
import Logo from '../../../assets/svg/LogoH.svg';
import AstronautaConfundido from '../../../assets/svg/AstronautaConfundido.svg';
import CustomButton from '../components/button';
class Register extends React.Component {
  static navigationOptions = {
    header: null,
  };
  render() {
    return (
      <View style={styles.background}>
        <Estrellas width={386} height={528} />
        <View style={styles.container}>
          <Logo width={244} height={84} />
          <AstronautaConfundido width={156} height={115} />
          <Text style={styles.description}>
            Para usar las funciones extras registrate
          </Text>
          <CustomButton
            title="Regístrate con Facebook"
            button_style="facebook"
          />
          <CustomButton title="Regístrate con Google" button_style="google" />

          <CustomButton
            title="Regístrate con tu Correo"
            button_style="simple"
          />
          <Text style={styles.description}>
            Los pedidos solo están disponibles de Miércoles a Sábado, hasta las
            11:00 a.m. Puedes elegir tu hora de entrega desde 1:00 p.m. a 5:00
            p.m.
          </Text>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
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
  description: {
    fontFamily: 'Rockwell',
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginVertical: 16,
    marginHorizontal: 16,
  },
});
export default Register;
