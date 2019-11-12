import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
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
      email: '',
      password: '',
      loading: false,
    };
    this.login = this.login.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.GoTo = this.GoTo.bind(this);
  }
  static navigationOptions = {
    header: null,
  };

  Global_OnChange(value, name) {
    this.setState({[name]: value});
  }

  componentDidMount() {}
  login() {
    this.setState({loading: true});
    auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        const currentUser = () => auth().currentUser;
        const userData = currentUser();
        if (userData) {
          firestore()
            .collection('Users')
            .doc(`${userData.uid}`)
            .get()
            .then(result => {
              this.setState({loading: false});
              if (result.exists) {
                this.GoTo('Inicio');
              } else if (userData.phoneNumber == null) {
                this.GoTo('RegisterWithPhone');
              }
            })
            .catch(err => {
              this.setState({loading: false});
            });
        } else {
          this.setState({loading: false});
        }
      })
      .catch(function(error) {
        // Handle Errors here.
        console.warn(error.code);
        this.setState({loading: false});
      });
  }
  handleSubmit() {
    this.login();
  }
  GoTo(to) {
    this.props.navigation.navigate(to);
  }
  render() {
    return (
      <SafeAreaView style={styles.area_container}>
        <ScrollView
          style={styles.info_container}
          contentContainerStyle={{
            flexGrow: 1,
          }}>
          <HeaderBanner back_button={false} />
          <View style={{marginHorizontal: 16}}>
            <Text style={styles.description}>Iniciar Sesión</Text>
            <View style={{position: 'absolute'}}>
              <Estrellas width={386} height={528} />
            </View>
            <TextInput
              title="Correo Electrónico"
              onChangeText={text => this.Global_OnChange(text, 'email')}
              value={this.state.email}
            />
            <TextInput
              title="Contraseña"
              onChangeText={text => this.Global_OnChange(text, 'password')}
              value={this.state.password}
              secureTextEntry
            />
            <Button
              onPress={() => this.handleSubmit()}
              title={this.state.loading ? `Entrando...` : `Entrar`}
              button_style="primary"
              extra_style={styles.Button_SignIn}
              left_icon={
                this.state.loading && (
                  <ActivityIndicator size="small" color="#FFF" />
                )
              }
            />
          </View>
          <View
            style={{
              flex: 1,
              position: 'relative',
              justifyContent: 'flex-end',
              alignItems: 'center',
              marginVertical: 8,
            }}>
            <TouchableOpacity>
              <Text>Términos y condiciones | Ayuda</Text>
            </TouchableOpacity>
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
