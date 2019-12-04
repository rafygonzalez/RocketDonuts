import Geolocation from '@react-native-community/geolocation';

export default class Maps {
  animateCamera(coords, ref) {
    return new Promise(resolve => {
      ref.animateCamera(
        {
          center: {
            latitude: coords.latitude,
            longitude: coords.longitude,
          },
          zoom: 15,
        },
        15000,
      );
      resolve(true);
    });
  }
  getCurrentPosition = () => {
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
}
