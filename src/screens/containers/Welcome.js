import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import Estrellas from '../../../assets/svg/Estrellas.svg';
import Logo from '../../../assets/svg/LogoH.svg';
import CustomButton from '../../ui/components/button';
class Home extends React.Component {
  constructor(props) {
    super(props);
  }
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.background}>
        <Estrellas width={386} height={528} />
        <View style={styles.container}>
          <Logo width={244} height={84} />
          <Text style={styles.description}>
            Los pedidos solo están disponibles de Miércoles a Sábado, hasta las
            11:00 a.m. Puedes elegir tu hora de entrega desde 1:00 p.m. a 5:00
            p.m.
          </Text>

          <CustomButton
            title="Registrarse"
            button_style="primary"
            onPress={() => {
              this.props.navigation.navigate('Register');
            }}
            extra_style={styles.buttons}
          />
          <CustomButton
            title="Iniciar Sesión"
            onPress={() => {
              this.props.navigation.navigate('Login');
            }}
            simple
            extra_style={styles.buttons}
          />
          <CustomButton
            title="Iniciar Sesión"
            onPress={() => {
              this.props.navigation.navigate('Splash');
            }}
            simple
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
    paddingHorizontal: 16,
  },
  description: {
    fontFamily: 'Rockwell',
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginVertical: 32,
    marginHorizontal: 16,
  },
});
export default Home;
