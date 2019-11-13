import React from 'react';
import {SafeAreaView, View, Text} from 'react-native';
import HeaderBanner from './Header_Banner';
import Button from '../../ui/components/button';
import {auth} from 'react-native-firebase';
const RegisterFinished = props => {
  if (auth().currentUser.emailVerified) {
    return (
      <SafeAreaView style={props.styles.area_container}>
        <HeaderBanner />
        <View style={props.styles.background}>
          <View style={props.styles.container}>
            <Text style={props.styles.title_congratulations}>
              ¡Felicitaciones! Has completado el registro.
            </Text>
            <Text style={props.styles.description_congratulations}>
              Ya puedes disfrutar de nuestras deliciosas donas, no esperes más y
              has tu pedido.
            </Text>
            <Button
              title="Continuar"
              button_style="primary"
              onPress={() => props.GoTo('Inicio')}
              extra_style={{marginTop: 32}}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={props.styles.area_container}>
        <HeaderBanner />
        <View style={props.styles.background}>
          <View style={props.styles.container}>
            <Text style={props.styles.title_congratulations}>
              ¡Felicitaciones! Has completado el registro.
            </Text>
            <Text style={props.styles.description_congratulations}>
              Te hemos enviado un correo para verificar tu cuenta en Rocket
              Donuts. ¡Te esperamos!
            </Text>
            <Button
              title="Continuar"
              button_style="primary"
              onPress={() => props.GoTo('Welcome')}
              extra_style={{marginTop: 32}}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
};
export default RegisterFinished;
