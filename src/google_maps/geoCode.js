import {functions} from 'react-native-firebase';
export default class Geo_Code {
  async reverse(coords, userId) {
    var data = await functions().httpsCallable('reverseGeoCode');
    var result = await data(coords);
    return result.data;
  }
}
