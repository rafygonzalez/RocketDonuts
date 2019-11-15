import {auth, firestore} from 'react-native-firebase';
import {GoogleSignin} from '@react-native-community/google-signin';
export const signOut = () => auth().signOut();

export const currentUser = () => auth().currentUser;

class Api {
  async Auth(props) {
    await auth().onAuthStateChanged(user => {
      if (user) props.auth_state(true);
      else props.auth_state(false);
    });
  }
  async getConfigProducts() {
    const configData = await firestore()
      .collection('Config')
      .doc('Products')
      .get();
    return configData.data();
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
    const db = firestore();
    var success = false;
    var ErrorMessage = null;
    try {
      const user = await auth().currentUser;
      let user_account;
      let usercred;
      if (user == null) {
        user_account = await auth().createUserWithEmailAndPassword(
          email,
          password,
        );
        auth().currentUser.sendEmailVerification();
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
        usercred = await auth().currentUser.linkWithCredential(credential);
        db.collection('Users')
          .doc(`${email_uid}`)
          .update({
            phoneNumber,
          });

        success = true;
      } else if (user.providerData.length == 1) {
        usercred = await auth().currentUser.linkWithCredential(credential);
        const userUid = user.uid;
        db.collection('Users')
          .doc(`${userUid}`)
          .update({
            phoneNumber,
          });
        success = true;
      } else {
        auth().signOut();
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
      const credential = auth.GoogleAuthProvider.credential(
        data.idToken,
        data.accessToken,
      );
      const UserCredential = await auth().signInWithCredential(credential);
      GoogleSignin.getCurrentUser().then(result => {});
    } catch (e) {
      console.error(e);
    }
  }
}
export default new Api();
