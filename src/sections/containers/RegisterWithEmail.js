import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import PhotoCamera from '../../../assets/svg/photo-camera.svg';
import TextInput from '../../screens/components/TextInput';
import Button from '../../screens/components/button';
class RegisterWithEmail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      lastname: '',
      email: 'ejemplo@gmail.com',
      pass: '',
      repass: '',
    };
    this.Global_OnChange = this.Global_OnChange.bind(this);
  }
  static navigationOptions = {
    header: null,
  };
  Global_OnChange(text, name) {
    this.setState({[name]: text});
  }
  render() {
    return (
      <SafeAreaView style={styles.area_container}>
        <View style={styles.photo_container}>
          <TouchableOpacity>
            <View style={styles.photo_circle}>
              <PhotoCamera width={32} height={32} />
            </View>
          </TouchableOpacity>
          <Text style={styles.photo_text}>Sube una foto de perfil</Text>
        </View>

        <ScrollView style={styles.info_container}>
          <Text style={styles.description}>Información Personal</Text>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <TextInput
              title="Nombre"
              onChangeText={text => this.Global_OnChange(text, 'name')}
              value={this.state.name}
              autoCompleteType="username"
            />
            <TextInput
              title="Apellido"
              onChangeText={text => this.Global_OnChange(text, 'lastname')}
              value={this.state.lastname}
              autoCompleteType="username"
            />
          </View>

          <TextInput
            title="Correo Electrónico"
            onChangeText={text => this.Global_OnChange(text, 'email')}
            value={this.state.email}
            autoCompleteType="email"
          />
          <TextInput
            title="Contraseña"
            onChangeText={text => this.Global_OnChange(text, 'pass')}
            value={this.state.pass}
            autoCompleteType="password"
            secureTextEntry={true}
          />
          <TextInput
            title="Repite la Contraseña"
            onChangeText={text => this.Global_OnChange(text, 'repass')}
            value={this.state.repass}
            autoCompleteType="password"
            secureTextEntry={true}
          />
          <Button title="Siguiente (1/3)" button_style="primary" />
        </ScrollView>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  photo_container: {
    width: '100%',
    height: 175,
    backgroundColor: '#313045',
    alignItems: 'center',
    justifyContent: 'center',
  },
  photo_circle: {
    borderRadius: 50,
    backgroundColor: '#3F6A78',
    width: 80,
    height: 80,
    shadowOffset: {width: 30, height: 30},
    shadowColor: 'black',
    shadowOpacity: 1.0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  photo_text: {
    color: 'white',
    marginVertical: 16,
  },
  description: {
    fontFamily: 'Poppins-Bold',
    fontSize: 28,
    color: '#313045',
  },
  info_container: {
    marginHorizontal: 16,
    marginVertical: 32,
    height: '100%',
    backgroundColor: '#ECEDF2',
  },
  area_container: {
    flex: 1,
    backgroundColor: '#ECEDF2',
  },
});
export default RegisterWithEmail;
