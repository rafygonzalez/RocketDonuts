import React from 'react';
import {StyleSheet, Dimensions, View} from 'react-native';
import Button from '../../ui/components/button';
import First_part_of_register from '../components/First_part_of_Register_With_Email';
import Second_part_of_register from '../components/Second_part_of_Register_With_Email';
import Third_part_of_register from '../components/Third_part_of_Register_With_Email';
var {width} = Dimensions.get('window');
var box_count = 2.2;
var box_width = width / box_count;

class RegisterWithEmail extends React.Component {
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
      phoneNumer: '',
      userid: '',
      step: 1,
      steps: 3,
    };
    this.Global_OnChange = this.Global_OnChange.bind(this);
    this.pickerOnChangeValue = this.pickerOnChangeValue.bind(this);
    this.NextStep = this.NextStep.bind(this);
    this.PreviousStep = this.PreviousStep.bind(this);
    this.setBirthDate = this.setBirthDate.bind(this);
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
    console.log(this.state);
    this.setState({step: this.state.step + 1});
  }
  PreviousStep() {
    this.setState({step: this.state.step - 1});
  }
  render() {
    const {
      name,
      lastname,
      email,
      password,
      repassword,
      birthDate,
      country,
      state,
      city,
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
            email={email}
            password={password}
            repassword={repassword}
            styles={styles}
          />
        ) : step == 2 ? (
          <Second_part_of_register
            HeaderBanner_OnBack={() => this.PreviousStep()}
            styles={styles}
            setBirthDate={this.setBirthDate}
            birthDate={birthDate}
            country={country}
            state={state}
            city={city}
            pickerOnChangeValue={this.pickerOnChangeValue}
          />
        ) : step == 3 ? (
          <Third_part_of_register
            HeaderBanner_OnBack={() => this.PreviousStep()}
            styles={styles}
          />
        ) : null}
        <View style={{flex: 0.1}}>
          <Button
            onPress={() => this.NextStep()}
            title={`Siguiente (${step}/${steps})`}
            button_style="primary"
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
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
export default RegisterWithEmail;
