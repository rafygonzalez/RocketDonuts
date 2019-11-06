import firebase from 'react-native-firebase';
import {GoogleSignin} from '@react-native-community/google-signin';
export const signOut = () => firebase.auth().signOut();

export const currentUser = () => firebase.auth().currentUser;

class Api {
  async Auth(props) {
    await firebase.auth().onAuthStateChanged(user => {
      if (user) props.auth_state(true);
      else props.auth_state(false);
    });
  }
  async createUser(
    name,
    lastname,
    birthDate,
    country,
    state,
    city,
    phoneNumber,
  ) {
    const db = firebase.firestore();
    let uid;
    const user = currentUser();

    if (user != null) {
      photoUrl = user.photoURL;
      emailVerified = user.emailVerified;
      uid = user.uid;
      db.collection('Users')
        .doc(uid)
        .set({
          name,
          lastname,
          birthDate,
          country,
          state,
          city,
          phoneNumber,
          uid,
        });
    }
  }
  async authWithGoogle() {
    try {
      await GoogleSignin.configure({
        scopes: [
          'https://www.googleapis.com/auth/user.phonenumbers.read',
          'https://www.googleapis.com/auth/user.birthday.read',
        ],
        webClientId:
          '1073288557699-ursk91gbv0lkgjbfa4p81b1ag4d5edj7.apps.googleusercontent.com', // required
      });
      const data = await GoogleSignin.signIn();
      const credential = firebase.auth.GoogleAuthProvider.credential(
        data.idToken,
        data.accessToken,
      );
      const firebaseUserCredential = await firebase
        .auth()
        .signInWithCredential(credential);
      GoogleSignin.getCurrentUser().then(result => {});
    } catch (e) {
      console.error(e);
    }
  }
}
export default new Api();
