import React from 'react';
import {SafeAreaView, View, Text, StyleSheet} from 'react-native';
import HeaderBanner from './Header_Banner';
import Button from '../../ui/components/button';
import {auth} from 'react-native-firebase';
const Register_EmailNotVerified = props => {
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
            title="Enviar correo de verificación"
            button_style="simple"
            onPress={() => {
              auth().currentUser.sendEmailVerification();
            }}
            extra_style={{marginTop: 32}}
          />
          <Button
            title="Continuar"
            button_style="primary"
            onPress={() => {
              auth().signOut();
              props.navigation.navigate('Welcome');
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
