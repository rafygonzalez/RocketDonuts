import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import PhotoCamera from '../../../assets/svg/photo-camera.svg';
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
  info_title: {
    color: '#313045',
    fontSize: 30,
    fontFamily: 'Poppins',
    fontWeight: 'bold',
  },
  info_container: {
    paddingHorizontal: 32,
    paddingVertical: 32,
  },
});
class RegisterWithEmail extends React.Component {
  static navigationOptions = {
    header: null,
  };
  render() {
    return (
      <SafeAreaView>
        <View style={styles.photo_container}>
          <TouchableOpacity>
            <View style={styles.photo_circle}>
              <PhotoCamera width={32} height={32} />
            </View>
          </TouchableOpacity>
          <Text style={styles.photo_text}>Sube una foto de perfil</Text>
        </View>
        <View style={styles.info_container}>
          <Text style={styles.info_title}>Información Personal</Text>
        </View>
      </SafeAreaView>
    );
  }
}
export default RegisterWithEmail;
