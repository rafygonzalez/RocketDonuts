import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import RKMaps from '../../google_maps/maps';
import geoCode from '../../google_maps/geoCode';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Button from '../../ui/components/button';
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
      formatted_address: 'Cargando',
    };
    this._map = null;
    this.onMapReady = this.onMapReady.bind(this);
    this.Maps = new RKMaps();
    this.GeoCode = new geoCode();
  }
  async onMapReady() {
    try {
      const position = await this.Maps.getCurrentPosition();
      const dir = await this.GeoCode.reverse(position.coords);
      this.setState({
        location: position,
        formatted_address: dir[0].formatted_address,
      });

      setTimeout(
        async () => await this.Maps.animateCamera(position.coords, this._map),
        1500,
      );
    } catch (e) {}
  }
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
          <Text>{this.state.formatted_address}</Text>
          <View style={{width: '100%'}}>
            <Button
              title="Guardar Ubicación"
              button_style="primary"
              onPress={() => {}}
            />
          </View>
        </View>
      </View>
    );
  }
}
