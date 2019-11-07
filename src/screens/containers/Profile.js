import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Logo from '../../../assets/svg/LogoV.svg';
import LinearGradient from 'react-native-linear-gradient';
import Stars from '../../../assets/svg/Stars.svg';
import ProfileImage from '../../../assets/svg/Profile_Image_men.svg';
import Button from '../../ui/components/button';
import {connect} from 'react-redux';
import MenuIcon from '../../../assets/svg/MenuIcon.svg';
import MapboxGL from '@react-native-mapbox-gl/maps';
MapboxGL.setAccessToken(
  'pk.eyJ1IjoicmFmeWdvbnphbGV6MDg5IiwiYSI6ImNqejhlMDVjODFrZ2kzaW1qbDV1bnh2cHoifQ.T3vurNbpjgq_aRL7QjuvpQ',
);
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
        <TouchableOpacity
          style={styles.Menu}
          onPress={() => this.props.navigation.toggleDrawer()}>
          <MenuIcon color={'#fff'} width={24} height={24} />
        </TouchableOpacity>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '10%',
            flex: 1,
          }}>
          <View style={styles.container_stars}>
            <Stars />
          </View>
          <Logo width={244} height={84} />
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

            <MapboxGL.MapView
              style={{flex: 1, width: '100%'}}
              styleURL={MapboxGL.StyleURL.Street}>
              <MapboxGL.Camera
                zoomLevel={11}
                animationMode={'flyTo'}
                animationDuration={6000}
                centerCoordinate={[-64.68167962832024, 10.15235246993332]}
              />
            </MapboxGL.MapView>
          </View>
        </View>
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
    flex: 1,
    flexDirection: 'row',
    position: 'absolute',
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
    fontFamily: 'OpenSans-Regular',
    fontSize: 16,
    color: '#313045',
  },
  fontInfo: {
    fontFamily: 'Rockwell',
    fontSize: 24,
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
    flex: 1,
  },

  box_profile: {
    ...box,
  },
  box_addresses: {
    ...box,
    flex: 5,
  },
});
const mapStateToProps = reducers => {
  return reducers.signReducer;
};
export default connect(mapStateToProps)(Profile);
