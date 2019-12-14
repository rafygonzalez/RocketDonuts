import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import Estrellas from '../../../../assets/svg/Estrellas.svg';
import Logo from '../../../../assets/svg/LogoH.svg';
import AstronautaConfundido from '../../../../assets/svg/AstronautaConfundido.svg';
import CustomButton from '../../../ui/components/button';
import FacebookLogo from '../../../../assets/svg/facebook-logo.svg';
import GoogleLogo from '../../../../assets/svg/google-logo.svg';
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
            No se preocupe, no compartimos su información al tocar Continuar con
            Facebook, Continuar con Google o registrarse con el correo
            electrónico.
          </Text>
          <CustomButton
            title="Continuar con Google"
            button_style="google"
            left_icon={<GoogleLogo width={32} height={32} />}
            extra_style={styles.buttons}
          />

          <CustomButton
            title="Regístrate con tu Celular"
            button_style="simple"
            onPress={() => this.props.navigation.navigate('RegisterWithEmail')}
            extra_style={styles.buttons}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttons: {
    marginVertical: 8,
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
    marginHorizontal: 8,
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
