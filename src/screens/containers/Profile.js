import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Logo from '../../../assets/svg/LogoH.svg';
import LinearGradient from 'react-native-linear-gradient';
import Stars from '../../../assets/svg/Stars.svg';
import ProfileImage from '../../../assets/svg/Profile_Image_men.svg';
import Button from '../../ui/components/button';
import {connect} from 'react-redux';
import MenuIcon from '../../../assets/svg/MenuIcon.svg';
import {ScrollView} from 'react-native-gesture-handler';
/*import MapboxGL from '@react-native-mapbox-gl/maps';
MapboxGL.setAccessToken(
  'pk.eyJ1IjoicmFmeWdvbnphbGV6MDg5IiwiYSI6ImNqejhlMDVjODFrZ2kzaW1qbDV1bnh2cHoifQ.T3vurNbpjgq_aRL7QjuvpQ',
);*/
const Divider = () => {
  return (
    <View
      opacity={0.5}
      style={{
        width: '100%',
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        marginVertical: '5%',
      }}
    />
  );
};
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  async getUser() {}
  componentDidMount() {}
  render() {
    return (
      <LinearGradient colors={['#242441', '#55537B']} style={styles.background}>
        <View style={styles.Menu}>
          <TouchableOpacity
            onPress={() => this.props.navigation.toggleDrawer()}>
            <MenuIcon color={'#fff'} width={24} height={24} />
          </TouchableOpacity>
          <View style={{marginLeft: '5%'}}>
            <Logo width={244} height={84} />
          </View>
        </View>
        <View style={styles.container_stars}>
          <Stars />
        </View>
        <ScrollView>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View style={styles.box_profile}>
              <View style={styles.top}>
                <Text style={styles.fontInfo}>Perfil</Text>
                <View>
                  <Button
                    title="Editar"
                    button_style="primary"
                    size="medium"
                    onPress={() => {}}
                  />
                </View>
              </View>
              <Divider />
              <View style={styles.center}>
                <View style={{marginHorizontal: '3%'}}>
                  <ProfileImage width={104} height={128} />
                </View>
                <View>
                  <Text style={styles.fontTitle}>Nombre:</Text>
                  <Text style={styles.fontInfo}>
                    {this.props.userData.name +
                      ' ' +
                      this.props.userData.lastname}
                  </Text>
                  <Text style={styles.fontTitle}>E-Mail:</Text>
                  <Text style={styles.fontTitle}>Teléfono:</Text>
                  <Text style={styles.fontInfo}>
                    {this.props.userData.phoneNumber}
                  </Text>
                </View>
              </View>
              <Divider />
              <View style={{height: '6%'}}>
                <Button
                  title="Cerrar Sesión"
                  button_style="simple"
                  onPress={() => {}}
                />
              </View>
            </View>
            <View style={styles.box_addresses}>
              <View style={styles.top}>
                <Text style={styles.fontInfo}>Direcciones </Text>
                <View>
                  <Button
                    title="+"
                    button_style="primary"
                    size="small"
                    onPress={() => {}}
                  />
                </View>
              </View>
              <Divider />
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    );
  }
}
const box = {
  backgroundColor: 'white',
  borderRadius: 3,
  borderWidth: 0.5,
  borderColor: '#C7C8D6',
  width: '85%',
  marginVertical: '5%',
  paddingVertical: '5%',
};
const styles = StyleSheet.create({
  Menu: {
    zIndex: 1,
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  center: {
    marginHorizontal: '3%',
    flexDirection: 'row',
  },
  top: {
    marginHorizontal: '3%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  fontTitle: {
    marginTop: '3%',
    fontFamily: 'OpenSans-Regular',
    fontSize: 16,
    color: '#313045',
  },
  fontInfo: {
    fontFamily: 'Rockwell',
    fontSize: 18,
    color: '#313045',
  },
  container_stars: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    backgroundColor: '#313045',
    height: '100%',
  },

  box_profile: {
    ...box,
  },
  box_addresses: {
    ...box,
  },
});
const mapStateToProps = reducers => {
  return reducers.signReducer;
};
export default connect(mapStateToProps)(Profile);
