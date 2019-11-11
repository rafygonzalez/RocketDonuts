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
    email,
    password,
    lastname,
    birthDate,
    phoneNumber,
    credential
  ) {
    const db = firebase.firestore();
    try{
      const user_account = await firebase.auth().createUserWithEmailAndPassword(email, password)
      const usercred = await firebase.auth().currentUser.linkWithCredential(credential)
      //firebase.auth().currentUser.sendEmailVerification()

      const email_uid = user_account.user.uid
      db.collection('Users').doc(`${email_uid}`).set({
        name,
        email,
        lastname,
        birthDate,
        phoneNumber,
        uid: email_uid
      });
    }catch(error){
      console.warn("Error", error.message);
      console.warn("Error", error.code);
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
