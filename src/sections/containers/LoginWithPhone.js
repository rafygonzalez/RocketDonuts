import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';
import HeaderBanner from '../components/Header_Banner';
import Estrellas from '../../../assets/svg/Estrellas_bw.svg';
import TextInput from '../../ui/components/TextInput';
import Button from '../../ui/components/button';
import {auth, firestore} from 'react-native-firebase';

import {connect} from 'react-redux';
var {width} = Dimensions.get('window');
var box_count = 2.2;
var box_width = width / box_count;
class LoginWithPhone extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: '+584141936170',
      verificationCode: '123456',
    };

    this.Global_OnChange = this.Global_OnChange.bind(this);
    this.phoneNumberValidate = this.phoneNumberValidate.bind(this);
    this.phoneNumberSendCode = this.phoneNumberSendCode.bind(this);
    this.Login = this.Login.bind(this);
    this.currentUser = this.currentUser.bind(this);
    this.GoTo = this.GoTo.bind(this);
    this.backHandler = null;
    this.getUserData = this.getUserData.bind(this);
  }
  static navigationOptions = {
    header: null,
  };

  Global_OnChange(value, name) {
    this.setState({[name]: value});
  }
  phoneNumberSendCode() {
    auth()
      .signInWithPhoneNumber(this.state.phoneNumber)
      .then(confirmResult => {
        this.setState({confirmResult});
        Alert.alert(
          `Código de Verificación`,
          `Hemos enviado un código de verificación a tu número telefónico`,
          [{text: 'OK', onPress: () => {}}],
          {cancelable: false},
        );
      })
      .catch(error => {
        Alert.alert(
          `Código de Verificación`,
          `Tenemos un error, ${error}.`,
          [{text: 'OK', onPress: () => {}}],
          {cancelable: false},
        );
      });
  }
  async currentUser() {
    return await auth().currentUser;
  }
  componentDidMount() {}
  async getUserData(uid) {
    const querySnapshot = await firestore()
      .collection('Users')
      .doc(`${uid}`)
      .get();
    return querySnapshot.exists;
  }
  Login() {
    if (
      !this.state.verificationCode.length == 0 ||
      this.state.phoneNumber.length == 0
    ) {
      this.phoneNumberValidate()
        .then(() => {
          this.currentUser().then(user => {
            this.getUserData(user.uid).then(exists => {
              if (exists) {
                this.GoTo('Home');
              } else {
                this.GoTo('RegisterWithPhone');
                auth().signOut();
              }
            });
          });
        })
        .catch(error => {
          if (error.code == 'auth/invalid-verification-code') {
            Alert.alert(
              `Código de Verificación`,
              `El código es invalido, asegúrese de usar el código de verificación proporcionado, vuelva a enviar el código de verificación`,
              [{text: 'OK', onPress: () => {}}],
              {cancelable: false},
            );
          } else {
            Alert.alert(
              `Código de Verificación`,
              `Tenemos un error, vuelva a intentarlo`,
              [{text: 'OK', onPress: () => {}}],
              {cancelable: false},
            );
          }
        });
    } else {
      Alert.alert(
        `Código de Verificación`,
        `Ingresa el código de verificación, si no te ha llegado un mensaje, vuelve a intentarlo.`,
        [{text: 'OK', onPress: () => {}}],
        {cancelable: false},
      );
    }
  }
  GoTo(to) {
    console.log(to);
    this.props.dispatch({
      type: 'CURRENT_SCREEN',
      payload: to,
    });
    this.props.navigation.navigate(to);
  }
  async phoneNumberValidate() {
    await this.state.confirmResult.confirm(`${this.state.verificationCode}`);
  }
  render() {
    return (
      <SafeAreaView style={styles.area_container}>
        <HeaderBanner back_button={false} />
        <ScrollView style={styles.info_container}>
          <View style={{marginHorizontal: 16}}>
            <Text style={styles.description}>Iniciar Sesión</Text>
            <View style={{position: 'absolute'}}>
              <Estrellas width={386} height={528} />
            </View>

            <View style={styles.box_container}>
              <View style={styles.box}>
                <TextInput
                  title="Número Telefónico"
                  onChangeText={text =>
                    this.Global_OnChange(text, 'phoneNumber')
                  }
                  value={this.state.phoneNumber}
                />
              </View>

              <View style={styles.box}>
                <Button
                  onPress={() => this.phoneNumberSendCode()}
                  title={`Enviar Codigo`}
                  button_style="simple"
                  extra_style={styles.button_verification_code}
                />
              </View>
            </View>
            <TextInput
              title="Ingresa el código de verificación de 6 digitos"
              onChangeText={text =>
                this.Global_OnChange(text, 'verificationCode')
              }
              value={this.state.verificationCode}
            />
            <Button
              onPress={() => this.Login()}
              title={`Entrar`}
              button_style="primary"
              extra_style={styles.Button_SignIn}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  button_verification_code: {
    marginTop: 32,
  },
  button_container: {
    paddingHorizontal: 8,
  },
  box_container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  box: {
    width: box_width,
    marginRight: 8,
  },
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
const mapStateToProps = reducers => {
  return reducers.globalReducer;
};
export default connect(mapStateToProps)(LoginWithPhone);
