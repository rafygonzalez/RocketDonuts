import Geolocation from '@react-native-community/geolocation';
import {firestore} from 'react-native-firebase';
import Api from '../firebase/api';
export default class Maps {
  deleteSavedPosition(address) {
    return new Promise((resolve, reject) => {
      firestore()
        .collection('Users')
        .doc(Api.currentUser.uid)
        .update({
          addresses: firestore.FieldValue.arrayRemove({
            LatLng: address.LatLng,
            formatted_address: address.formatted_address,
          }),
        })
        .then(() => {
          resolve(true);
        })
        .catch(e => {
          reject(e.message);
        });
    });
  }
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
  saveCurrentPosition = position => {
    return new Promise(async (resolve, reject) => {
      try {
        await firestore()
          .collection('Users')
          .doc(Api.currentUser.uid)
          .update({
            addresses: firestore.FieldValue.arrayUnion(position),
          });
        resolve(true);
      } catch (e) {
        reject(e);
      }
    });
  };
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
