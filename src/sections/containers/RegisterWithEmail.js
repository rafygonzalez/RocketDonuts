import React from 'react';
import {StyleSheet, Dimensions, View} from 'react-native';
import Button from '../../screens/components/button';
import First_part_of_register from '../components/First_part_of_Register_With_Email';
var {width} = Dimensions.get('window');

var box_count = 2.2;
var box_width = width / box_count;

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
    const {name, lastname, email, pass, repass} = this.state;
    return (
      <View style={{flex: 1}}>
        <First_part_of_register
          Global_OnChange={this.Global_OnChange}
          name={name}
          lastname={lastname}
          email={email}
          pass={pass}
          repass={repass}
          styles={styles}
        />
        <View style={{flex: 0.1}}>
          <Button title="Siguiente (1/3)" button_style="primary" />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  box_container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  box: {
    width: box_width,
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
    fontSize: 28,
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
