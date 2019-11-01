import React from 'react';
import {StyleSheet, Dimensions, View, Alert} from 'react-native';
import First_part_of_register from '../components/First_part_of_Register_With_Email';
import Second_part_of_register from '../components/Second_part_of_Register_With_Email';
import Register_finished from '../components/Register_Finished';
import validator from 'validator';
import firebase from 'react-native-firebase';
import API from '../../firebase/api';
var {width} = Dimensions.get('window');
var box_count = 2.2;
var box_width = width / box_count;
//ToastAndroid.show("Success", ToastAndroid.SHORT)

class RegisterWithPhone extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      lastname: '',
      email: '',
      password: '',
      repassword: '',
      birthDate: '',
      country: '',
      state: '',
      city: '',
      phoneNumber: '',
      verificationCode: '',
      userid: '',
      step: 1,
      steps: 2,
      confirmResult: null,
    };
    this.Global_OnChange = this.Global_OnChange.bind(this);
    this.pickerOnChangeValue = this.pickerOnChangeValue.bind(this);
    this.NextStep = this.NextStep.bind(this);
    this.PreviousStep = this.PreviousStep.bind(this);
    this.setBirthDate = this.setBirthDate.bind(this);

    this.phoneNumberValidate = this.phoneNumberValidate.bind(this);
    this.phoneNumberSendCode = this.phoneNumberSendCode.bind(this);

    this.GoToHome = this.GoToHome.bind(this);
  }
  static navigationOptions = {
    header: null,
  };
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
      verificationCode,
      birthDate,
      phoneNumber,
      country,
      state,
      city,
    } = this.state;
    switch (this.state.step) {
      case 1:
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
      case 2:
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
          this.phoneNumberValidate()
            .then(user => {
              Alert.alert(
                `¡Excelente!`,
                `Hemos verificado tu número telefónico`,
                [
                  {
                    text: 'OK',
                    onPress: () => {
                      API.createUser(
                        name,
                        lastname,
                        birthDate,
                        country,
                        state,
                        city,
                        phoneNumber,
                      );
                      this.setState({step: this.state.step + 1});
                    },
                  },
                ],
                {cancelable: false},
              );
            })
            .catch(error => {
              Alert.alert(
                `Código de Verificación`,
                `Tenemos un error, ${error}`,
                [{text: 'OK', onPress: () => {}}],
                {cancelable: false},
              );
            });
        }
        break;
    }
  }
  PreviousStep() {
    this.setState({step: this.state.step - 1});
  }
  phoneNumberSendCode() {
    firebase
      .auth()
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
  async phoneNumberValidate() {
    await this.state.confirmResult.confirm(`${this.state.verificationCode}`);
  }
  GoToHome() {
    this.props.navigation.navigate('Home');
  }

  render() {
    const {
      name,
      lastname,
      birthDate,
      country,
      state,
      city,
      phoneNumber,
      verificationCode,
      step,
      steps,
    } = this.state;
    return (
      <View style={{flex: 1, backgroundColor: '#ECEDF2'}}>
        {step == 1 ? (
          <First_part_of_register
            Global_OnChange={this.Global_OnChange}
            name={name}
            lastname={lastname}
            birthDate={birthDate}
            country={country}
            state={state}
            city={city}
            pickerOnChangeValue={this.pickerOnChangeValue}
            setBirthDate={this.setBirthDate}
            styles={styles}
            NextStep={this.NextStep}
            step={step}
            steps={steps}
          />
        ) : step == 2 ? (
          <Second_part_of_register
            HeaderBanner_OnBack={() => this.PreviousStep()}
            Global_OnChange={this.Global_OnChange}
            styles={styles}
            phoneNumber={phoneNumber}
            verificationCode={verificationCode}
            NextStep={this.NextStep}
            step={step}
            steps={steps}
            phoneNumberSendCode={this.phoneNumberSendCode}
          />
        ) : (
          step == 3 && (
            <Register_finished GoToHome={this.GoToHome} styles={styles} />
          )
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
export default RegisterWithPhone;
