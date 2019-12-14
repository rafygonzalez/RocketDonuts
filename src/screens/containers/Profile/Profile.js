import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import Logo from '../../../../assets/svg/LogoH.svg';
import LinearGradient from 'react-native-linear-gradient';
import Stars from '../../../../assets/svg/Stars.svg';
import ProfileImage from '../../../../assets/svg/Profile_Image_men.svg';
import Button from '../../../ui/components/button';
import {connect} from 'react-redux';
import MenuIcon from '../../../../assets/svg/MenuIcon.svg';
import {ScrollView} from 'react-native-gesture-handler';

import Room from '../../../../assets/svg/room.svg';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {firestore} from 'react-native-firebase';
import AccountCircle from '../../../../assets/svg/account_circle.svg';
import RKMaps from '../../../google_maps/maps';
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
    this.state = {
      deletingAddress: false,
    };
    this.handleDataUser = this.handleDataUser.bind(this);
    this.deleteAddress = this.deleteAddress.bind(this);
    this.Maps = new RKMaps();
  }
  deleteAddress(address) {
    this.setState({deletingAddress: true});
    this.Maps.deleteSavedPosition(address)
      .then(() => {
        this.setState({deletingAddress: false});
      })
      .catch(e => {
        this.setState({deletingAddress: false});
        ToastAndroid.show(
          `Ha ocurrido un error, intente más tarde.`,
          ToastAndroid.SHORT,
        );
      });
  }
  handleDataUser() {
    const {currentUser, dispatch} = this.props;
    return firestore()
      .collection('Users')
      .doc(currentUser.uid)
      .onSnapshot(snap => {
        dispatch({type: 'CURRENT_USER', payload: snap.data()});
      });
  }
  componentDidMount() {
    this.handleDataUser();
  }
  componentWillUnmount() {
    this.handleDataUser();
  }
  render() {
    const {currentUser} = this.props;
    return (
      <LinearGradient colors={['#242441', '#55537B']} style={styles.background}>
        <View style={styles.Menu}>
          <TouchableOpacity
            onPress={() => this.props.navigation.toggleDrawer()}>
            <MenuIcon color={'#fff'} width={24} height={24} />
          </TouchableOpacity>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: wp('12.5%'),
            }}>
            <Logo width={244} height={84} />
          </View>
        </View>
        <View style={styles.container_stars}>
          <Stars width={wp('100%')} height={hp('110%')} />
        </View>
        <ScrollView>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View style={styles.box_profile}>
              <View style={styles.top}>
                <AccountCircle width={wp('7.42%')} height={hp('4.21%')} />
                <Text style={styles.fontInfo}>Perfil</Text>
                <Button
                  title="Editar"
                  button_style="positive"
                  size="medium"
                  onPress={() => {}}
                />
              </View>
              <Divider />

              <View style={styles.center}>
                <View style={{marginHorizontal: '3%'}}>
                  <ProfileImage width={104} height={128} />
                </View>
                <View>
                  <Text style={styles.fontTitle}>Nombre y Apellido:</Text>
                  <Text style={styles.fontInfo}>
                    {currentUser.name} {currentUser.lastname}
                  </Text>
                  <Text style={styles.fontTitle}>E-Mail:</Text>
                  <Text style={styles.fontInfo}>{currentUser.email}</Text>
                  <Text style={styles.fontTitle}>Teléfono:</Text>
                  <Text style={styles.fontInfo}>{currentUser.phoneNumber}</Text>
                </View>
              </View>
            </View>
            <View style={styles.box_addresses}>
              <View style={styles.top}>
                <Room width={wp('7.42%')} height={hp('4.21%')} />
                <Text style={styles.fontInfo}>Mis direcciones</Text>

                <Button
                  title="+"
                  button_style="positive"
                  size="small"
                  onPress={() => {
                    this.props.navigation.navigate('Location');
                  }}
                />
              </View>

              <Divider />

              <View style={styles.addresses_container}>
                {currentUser.addresses.length !== 0 ? (
                  currentUser.addresses.map((address, index) => {
                    return (
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}>
                        <Text style={styles.formatted_address_text}>
                          {address.formatted_address}
                        </Text>
                        {this.state.deletingAddress ? (
                          <ActivityIndicator size="large" color="#FF700F" />
                        ) : (
                          <Button
                            title="-"
                            button_style="negative"
                            size="small"
                            onPress={() => {
                              this.deleteAddress(address);
                            }}
                          />
                        )}
                      </View>
                    );
                  })
                ) : (
                  <Text>Aún no tienes ninguna dirección agregada</Text>
                )}
              </View>
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
  marginVertical: '3%',
  paddingVertical: '5%',
};
const styles = StyleSheet.create({
  formatted_address_text: {
    fontFamily: 'Poppins-Regular',
    fontSize: hp('2%'),
    color: '#151619',
    maxWidth: '80%',
  },
  addresses_container: {
    paddingHorizontal: '5%',
    width: '100%',
  },
  profile_title: {
    fontFamily: 'Rockwell',
    fontSize: wp('6%'),
    color: '#151619',
  },
  Menu: {
    width: '100%',
    zIndex: 1,
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  center: {
    marginHorizontal: '3%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  top: {
    paddingHorizontal: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fontTitle: {
    marginTop: '3%',
    fontFamily: 'Rockwell',
    fontSize: wp('3.5%'),
    color: '#151619',
    textAlign: 'center',
  },
  fontInfo: {
    fontFamily: 'Poppins-Regular',
    fontSize: wp('4%'),
    color: '#313045',
    textAlign: 'center',
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
  return reducers.globalReducer;
};
export default connect(mapStateToProps)(Profile);
