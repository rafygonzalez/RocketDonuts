import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import RKMaps from '../../google_maps/maps';
import geoCode from '../../google_maps/geoCode';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Button from '../../ui/components/button';
import Room from '../../../assets/svg/room.svg';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export default class Location extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      location: null,
      mapisReady: false,
      formatted_address: '',
    };
    this._map = null;
    this.onMapReady = this.onMapReady.bind(this);
    this.Maps = new RKMaps();
    this.GeoCode = new geoCode();
    this.saveCurrentPos = this.saveCurrentPos.bind(this);
  }
  async saveCurrentPos() {
    try {
      this.setState({loading: true});
      const {location} = this.state;
      var obj = {};
      obj.LatLng = `${location.coords.latitude},${location.coords.longitude}`;
      obj.formatted_address = this.state.formatted_address;
      const result = await this.Maps.saveCurrentPosition(obj);
      this.props.navigation.goBack();
    } catch (e) {
      ToastAndroid.show(
        `Ha ocurrido un error, intente más tarde.`,
        ToastAndroid.SHORT,
      );
      this.setState({loading: false});
    }
  }
  async onMapReady() {
    try {
      const position = await this.Maps.getCurrentPosition();
      const dir = await this.GeoCode.reverse(position.coords);
      this.setState({
        location: position,
        formatted_address: dir[0].formatted_address,
        loading: false,
      });

      setTimeout(
        async () => await this.Maps.animateCamera(position.coords, this._map),
        1500,
      );
    } catch (e) {}
  }
  render() {
    const {location, loading} = this.state;
    return (
      <View style={styles.page}>
        <View style={styles.container}>
          <MapView
            ref={map => {
              this._map = map;
            }}
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            onMapReady={() => this.onMapReady()}
            style={styles.map}
            region={{
              latitude:
                location !== null ? location.coords.latitude : 10.1673862,
              longitude:
                location !== null ? location.coords.longitude : -64.677611,
              latitudeDelta: 0.2,
              longitudeDelta: 0.2,
            }}>
            {location !== null && (
              <Marker
                coordinate={{
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                }}
                title={'¡Estas aqui!'}
                description={
                  'Esta es tu ubicación GPS, guardala en tu directorio.'
                }
              />
            )}
          </MapView>
        </View>
        {!loading ? (
          <ScrollView
            style={{flex: 1}}
            contentContainerStyle={styles.container_details}>
            <Text style={styles.title_details}>Tu Dirección:</Text>
            <View style={{flexDirection: 'row'}}>
              <Room width={wp('7.42%')} height={hp('4.21%')} />
              <Text style={styles.address_detail}>
                {this.state.formatted_address}
              </Text>
            </View>

            <View
              opacity={!loading ? 1 : 0.5}
              style={styles.button_details_container}>
              <Button
                title={'Guardar Mi Ubicación'}
                button_style="primary"
                onPress={() => this.saveCurrentPos()}
              />
            </View>
          </ScrollView>
        ) : (
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={styles.title_details}>Cargando...</Text>
            <ActivityIndicator size="large" color="#FF700F" />
          </View>
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container_details: {
    paddingHorizontal: '10%',
    paddingVertical: '10%',
  },
  title_details: {
    fontFamily: 'Poppins-Bold',
    fontSize: wp('4%'),
    marginBottom: '3%',
    color: '#313045',
  },
  address_detail: {
    fontFamily: 'Poppins-Regular',
    fontSize: wp('4%'),
    marginBottom: '3%',
    color: '#313045',
    marginLeft: '3%',
  },
  button_details_container: {},
  page: {
    flex: 1,
    backgroundColor: '#EDEEF4',
  },
  container: {
    height: '60%',
    backgroundColor: 'tomato',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
