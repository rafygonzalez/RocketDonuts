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
    credential,
  ) {
    const db = firebase.firestore();
    var success = false;
    var ErrorMessage = null;
    try {
      const user = await firebase.auth().currentUser;
      let user_account;
      let usercred;
      if (user == null) {
        user_account = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password);
        firebase.auth().currentUser.sendEmailVerification();
        const email_uid = user_account.user.uid;
        db.collection('Users')
          .doc(`${email_uid}`)
          .set({
            name,
            email,
            lastname,
            birthDate,
            uid: email_uid,
          });
        usercred = await firebase
          .auth()
          .currentUser.linkWithCredential(credential);
        db.collection('Users')
          .doc(`${email_uid}`)
          .update({
            phoneNumber,
          });

        success = true;
      } else if (user.providerData.length == 1) {
        usercred = await firebase
          .auth()
          .currentUser.linkWithCredential(credential);
        const userUid = user.uid;
        db.collection('Users')
          .doc(`${userUid}`)
          .update({
            phoneNumber,
          });
        success = true;
      } else {
        firebase.auth().signOut();
        success = false;
      }
    } catch (error) {
      ErrorMessage = error.code;
    }
    return {success: success, error: ErrorMessage};
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
