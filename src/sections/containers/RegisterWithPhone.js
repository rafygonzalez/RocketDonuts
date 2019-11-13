import React from 'react';
import {StyleSheet, Dimensions, View, Alert} from 'react-native';
import Register_With_Email from '../components/Register_With_Email';
import PersonalInfo from '../components/Personal_Info';
import Verify_Phone_Number from '../components/Verify_Phone_Number';
import Register_finished from '../components/Register_Finished';
import validator from 'validator';
import firebase from 'react-native-firebase';
import API from '../../firebase/api';
import {connect} from 'react-redux';

var {width} = Dimensions.get('window');
var box_count = 2.2;
var box_width = width / box_count;
//ToastAndroid.show("Success", ToastAndroid.SHORT)

class RegisterWithPhone extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Rafael',
      lastname: 'Gonzalez',
      email: 'rafygonzalez089@gmail.com',
      password: '123456',
      repassword: '123456',
      birthDate: '',
      country: '',
      state: '',
      city: '',
      phoneNumber: '+584141936170',
      verificationCode: '123456',
      userid: '',
      step: 1,
      steps: 3,
      confirmResult: null,
      PhoneAuthVerificationId: '',
      PhoneAuthVerificationCode: '',
      sendingCode: false,
      verifyingCode: false,
      onlyVerifyPhone: false,
      sendedCode: false,
    };
    this.Global_OnChange = this.Global_OnChange.bind(this);
    this.pickerOnChangeValue = this.pickerOnChangeValue.bind(this);
    this.NextStep = this.NextStep.bind(this);
    this.PreviousStep = this.PreviousStep.bind(this);
    this.setBirthDate = this.setBirthDate.bind(this);

    this.phoneNumberSendCode = this.phoneNumberSendCode.bind(this);

    this.GoTo = this.GoTo.bind(this);
  }
  static navigationOptions = {
    header: null,
  };
  componentDidMount() {
    const currentUser = () => firebase.auth().currentUser;
    const userData = currentUser();

    if (userData) {
      if (userData.phoneNumber == null) {
        this.setState({step: 3, onlyVerifyPhone: true});
      }
    }
  }
  GoTo(to) {
    this.props.navigation.navigate(to);
  }
  setBirthDate(date) {
    this.setState({birthDate: date});
  }
  Global_OnChange(text, name) {
    this.setState({[name]: text});
  }
  pickerOnChangeValue(value, name) {
    this.setState({[name]: value});
  }
  NextStep() {
    const {
      name,
      lastname,
      email,
      password,
      repassword,
      verificationCode,
      birthDate,
      phoneNumber,
      country,
      state,
      city,
      PhoneAuthProviderCredential,
    } = this.state;
    switch (this.state.step) {
      case 1:
        if (!validator.isEmail(email)) {
          Alert.alert(
            `Correo invalido`,
            `Debe ingresar un correo valido, ej: example@gmail.com`,
            [{text: 'OK', onPress: () => {}}],
            {cancelable: false},
          );
        } else if (validator.isEmpty(password) || password.length < 6) {
          Alert.alert(
            `Contraseña`,
            `Ingrese una contraseña correcta, debe tener al menos 6 dígitos`,
            [{text: 'OK', onPress: () => {}}],
            {cancelable: false},
          );
        } else if (validator.isEmpty(repassword) || password !== repassword) {
          Alert.alert(
            `Repite tu contraseña`,
            `Las contraseñas no coinciden.`,
            [{text: 'OK', onPress: () => {}}],
            {cancelable: false},
          );
        } else {
          this.setState({step: this.state.step + 1});
        }
        break;
      case 2:
        if (validator.isEmpty(name) || validator.isEmpty(lastname)) {
          Alert.alert(
            `Campos Vacios`,
            `Debes llenar el formulario para poder continuar`,
            [{text: 'OK', onPress: () => {}}],
            {cancelable: false},
          );
        } else if (validator.isEmpty(birthDate)) {
          Alert.alert(
            `Fecha de nacimiento`,
            `Selecciona tu fecha de nacimiento correctamente`,
            [{text: 'OK', onPress: () => {}}],
            {cancelable: false},
          );
        } else {
          this.setState({step: this.state.step + 1});
        }
        break;
      case 3:
        if (validator.isEmpty(phoneNumber)) {
          Alert.alert(
            `Número de teléfono`,
            `Ingresa tu número de teléfono de esta forma, el repartidor podrá comunicarse contigo`,
            [{text: 'OK', onPress: () => {}}],
            {cancelable: false},
          );
        } else if (
          !validator.isNumeric(phoneNumber) ||
          phoneNumber.length < 10
        ) {
          Alert.alert(
            `Número de teléfono`,
            `Solo se puede ingresar un numero telefónico correcto`,
            [{text: 'OK', onPress: () => {}}],
            {cancelable: false},
          );
        } else if (validator.isEmpty(verificationCode)) {
          Alert.alert(
            `Introduzca el código de verificación`,
            `Si no le ha llegado un SMS con el codigo de verificación haga clic en Enviar Codigo`,
            [{text: 'OK', onPress: () => {}}],
            {cancelable: false},
          );
        } else if (!validator.isNumeric(verificationCode)) {
          Alert.alert(
            `Código Invalido`,
            `El código de verificación no tiene caracteres.`,
            [{text: 'OK', onPress: () => {}}],
            {cancelable: false},
          );
        } else {
          if (this.state.sendedCode) {
            const credential = firebase.auth.PhoneAuthProvider.credential(
              this.state.PhoneAuthVerificationId,
              this.state.verificationCode,
            );
            this.setState({verifyingCode: true});
            API.createUser(
              name,
              email,
              password,
              lastname,
              birthDate,
              phoneNumber,
              credential,
            ).then(result => {
              if (!result.success) {
                this.setState({verifyingCode: false});
                switch (result.error) {
                  case 'auth/email-already-in-use':
                    Alert.alert(
                      `Correo Electrónico`,
                      `El correo que ha ingresado ya esta en uso.`,
                      [{text: 'OK', onPress: () => {}}],
                      {cancelable: false},
                    );
                    break;
                  case 'auth/invalid-verification-code':
                    Alert.alert(
                      `Código de Verificación`,
                      `El código es invalido, asegúrese de usar el código de verificación proporcionado, vuelva a enviar el código de verificación`,
                      [{text: 'OK', onPress: () => {}}],
                      {cancelable: false},
                    );
                    break;
                  case 'auth/credential-already-in-use':
                    Alert.alert(
                      `Número Teléfonico`,
                      `El número ingresado, esta en uso.`,
                      [{text: 'OK', onPress: () => {}}],
                      {cancelable: false},
                    );
                    break;
                  default:
                    Alert.alert(
                      `Ha ocurrido un error`,
                      `Vuelva a intentar más tarde.`,
                      [{text: 'OK', onPress: () => {}}],
                      {cancelable: false},
                    );
                    break;
                }
              } else {
                this.setState({
                  step: this.state.step + 1,
                  verifyingCode: false,
                });
              }
            });
          } else {
            Alert.alert(
              `Ha ocurrido un error`,
              `No has enviado un codigo de verificación, por favor, envialo y vuelva a intentarlo.`,
              [{text: 'OK', onPress: () => {}}],
              {cancelable: false},
            );
          }

          //    this.setState({step: this.state.step + 1});
        }
        break;
    }
  }
  PreviousStep() {
    this.setState({step: this.state.step - 1});
  }
  phoneNumberSendCode() {
    this.setState({sendingCode: true});
    firebase
      .auth()
      .verifyPhoneNumber(this.state.phoneNumber)
      .then(result => {
        this.setState({
          PhoneAuthVerificationId: result.verificationId,
          sendingCode: false,
          sendedCode: true,
        });
      });
  }

  render() {
    const {
      name,
      lastname,
      email,
      birthDate,
      country,
      state,
      city,
      phoneNumber,
      password,
      repassword,
      verificationCode,
      step,
      steps,
    } = this.state;
    return (
      <View style={{flex: 1, backgroundColor: '#ECEDF2'}}>
        {step == 1 ? (
          <Register_With_Email
            Global_OnChange={this.Global_OnChange}
            name={name}
            lastname={lastname}
            email={email}
            birthDate={birthDate}
            country={country}
            state={state}
            city={city}
            pass={password}
            repass={repassword}
            pickerOnChangeValue={this.pickerOnChangeValue}
            setBirthDate={this.setBirthDate}
            styles={styles}
            NextStep={this.NextStep}
            step={step}
            steps={steps}
          />
        ) : step == 2 ? (
          <PersonalInfo
            HeaderBanner_OnBack={() => this.PreviousStep()}
            Global_OnChange={this.Global_OnChange}
            name={name}
            lastname={lastname}
            birthDate={birthDate}
            setBirthDate={this.setBirthDate}
            styles={styles}
            NextStep={this.NextStep}
            step={step}
            steps={steps}
          />
        ) : step == 3 ? (
          <Verify_Phone_Number
            HeaderBanner_OnBack={() => this.PreviousStep()}
            back_button={this.state.onlyVerifyPhone ? false : true}
            Global_OnChange={this.Global_OnChange}
            styles={styles}
            phoneNumber={phoneNumber}
            verificationCode={verificationCode}
            NextStep={this.NextStep}
            step={step}
            steps={steps}
            phoneNumberSendCode={this.phoneNumberSendCode}
            sendingCode={this.state.sendingCode}
            verifyingCode={this.state.verifyingCode}
          />
        ) : (
          step == 4 && <Register_finished GoTo={this.GoTo} styles={styles} />
        )}
      </View>
    );
  }
}
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
  Button_NextStep: {
    marginVertical: 32,
  },
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
  photo_container: {
    width: '100%',
    height: 150,
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
export default connect(mapStateToProps)(RegisterWithPhone);
