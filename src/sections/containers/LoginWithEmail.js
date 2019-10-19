import React from 'react';
import {SafeAreaView, View, Text, ScrollView, StyleSheet} from 'react-native';
import HeaderBanner from '../components/Header_Banner';
import Estrellas from '../../../assets/svg/Estrellas_bw.svg';
import TextInput from '../../ui/components/TextInput';
import Button from '../../ui/components/button';
class LoginWithEmail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };

    this.Global_OnChange = this.Global_OnChange.bind(this);
  }
  static navigationOptions = {
    header: null,
  };

  Global_OnChange(value, name) {
    this.setState({[name]: value});
  }
  render() {
    const {email, password} = this.state;
    return (
      <SafeAreaView style={styles.area_container}>
        <HeaderBanner back_button={false} />
        <ScrollView style={styles.info_container}>
          <View style={{marginHorizontal: 16}}>
            <Text style={styles.description}>Iniciar Sesión</Text>
            <View style={{position: 'absolute'}}>
              <Estrellas width={386} height={528} />
            </View>

            <TextInput
              title="Correo Electrónico"
              onChangeText={text => this.Global_OnChange(text, 'email')}
              value={email}
              autoCompleteType="email"
              autoFocus={true}
            />
            <TextInput
              title="Contraseña"
              onChangeText={text => this.Global_OnChange(text, 'password')}
              value={password}
              autoCompleteType="password"
              secureTextEntry={true}
              autoFocus={true}
            />
            <Button
              onPress={() => {}}
              title={`Entrar`}
              button_style="primary"
              extra_style={styles.Button_SignIn}
            />
            <Button
              onPress={() => {}}
              title={`Olvidé mi contraseña`}
              button_style="simple"
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  Button_SignIn: {
    marginVertical: 32,
  },
  description: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#313045',
    marginVertical: 16,
  },
  info_container: {
    height: '100%',
    backgroundColor: '#ECEDF2',
  },
  area_container: {
    flex: 1,
    backgroundColor: '#ECEDF2',
  },
});
export default LoginWithEmail;
