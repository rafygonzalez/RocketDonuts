import React, {useState} from 'react';
import {SafeAreaView, View, Text, StyleSheet, Alert} from 'react-native';
import HeaderBanner from './Header_Banner';
import Button from '../../ui/components/button';
import {auth} from 'react-native-firebase';
const Register_EmailNotVerified = props => {
  const [sending, setSending] = useState(false);
  const alert = () => {
    Alert.alert(
      `Se ha enviado correctamente`,
      `Hemos enviado nuevamente el correo electrónico de verificación.`,
      [
        {
          text: 'OK',
          onPress: () => {
            props.navigation.navigate('LoginWithPhone');
          },
        },
      ],
      {cancelable: false},
    );
  };
  return (
    <SafeAreaView style={styles.area_container}>
      <HeaderBanner />
      <View style={styles.background}>
        <View style={styles.container}>
          <Text style={styles.title_congratulations}>¡Lo sentimos!</Text>
          <Text style={styles.description_congratulations}>
            Para poder acceder a nuestra plataforma, necesitamos verificar tu
            correo electrónico.
          </Text>

          <Button
            title="Continuar"
            button_style="primary"
            onPress={() => {
              auth().signOut();
              props.navigation.navigate('Welcome');
            }}
            extra_style={{marginTop: 16}}
          />
          <Button
            title={sending ? 'Enviando...' : 'No me ha llegado el correo.'}
            button_style="simple"
            onPress={() => {
              Alert.alert(
                `¿Deseas enviar nuevamente un correo de verificación?`,
                `Si no has recibido nuestro correo electrónico, te invitamos a enviarlo nuevamente.`,
                [
                  {text: 'Cancelar', onPress: () => {}},
                  {
                    text: 'Enviar',
                    onPress: async () => {
                      setSending(true);
                      await auth().currentUser.sendEmailVerification();
                      setSending(false);
                      auth().signOut();
                      alert();
                    },
                  },
                ],
                {cancelable: false},
              );
            }}
            extra_style={{marginTop: 16}}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  title_congratulations: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#313045',

    textAlign: 'center',
  },
  description_congratulations: {
    marginTop: 32,
    fontFamily: 'Poppins-Regular',
    fontSize: 20,
    color: '#313045',
    textAlign: 'center',
  },
  background: {
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
  area_container: {
    flex: 1,
    backgroundColor: '#ECEDF2',
  },
});
export default Register_EmailNotVerified;
