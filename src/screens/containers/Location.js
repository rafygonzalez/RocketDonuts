import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  container: {
    height: '60%',
    backgroundColor: 'tomato',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default class Location extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: null,
      mapisReady: false,
    };
    this._map = null;
    this.animateCamera = this.animateCamera.bind(this);
    this.onMapReady = this.onMapReady.bind(this);
  }

  async onMapReady() {
    try {
      const position = await this.findCoordinates();
      setTimeout(async () => await this.animateCamera(position), 1500);
      this.setState({location: position});
    } catch (e) {}
  }
  animateCamera(location) {
    return new Promise(resolve => {
      this._map.animateCamera(
        {
          center: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          },
          zoom: 15,
        },
        15000,
      );
      resolve(true);
    });
  }
  findCoordinates = () => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        position => {
          resolve(position);
        },
        error => reject(error.message),
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
      );
    });
  };
  render() {
    const {location} = this.state;
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
              latitude: 10.1673862,
              longitude: -64.677611,
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
        <View>
          <Text>Tu Dirección:</Text>
          <Text>Los Apamates, Barcelona 6001, Anzoategui, Vnezuelaa</Text>
        </View>
      </View>
    );
  }
}
/*        */
