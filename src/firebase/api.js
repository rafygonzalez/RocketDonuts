import {auth, firestore, messaging, storage} from 'react-native-firebase';
import {GoogleSignin} from '@react-native-community/google-signin';
export const signOut = () => auth().signOut();

export const currentUser = () => auth().currentUser;

class Api {
  constructor() {
    this.currentUser = auth().currentUser;
  }
  Auth(props) {
    auth().onAuthStateChanged(user => {
      if (user) props.auth_state(true);
      else props.auth_state(false);
    });
  }
  Load(dispatch) {
    return new Promise(async (resolve, reject) => {
      try {
        if (currentUser !== null) {
          const averageUSD = await this.getDolarTodayApi();
          const AppConfig = await this.getConfig();
          const DataUser = await this.getDataUser(this.currentUser.uid);
          const fcmToken = await this.getFcmToken();
          dispatch('USD_AVERAGE', averageUSD);
          dispatch('CONFIG_PRODUCTS', AppConfig);
          dispatch('CURRENT_USER', DataUser);
          resolve('successfully');
        } else {
          reject('No hemos detectado un usuario.');
        }
      } catch (e) {
        reject(e);
      }
    });
  }
  getFcmToken = () => {
    return new Promise(async (resolve, reject) => {
      const enabled = await messaging().hasPermission();
      if (enabled) {
        const fcmToken = await messaging().getToken();
        if (fcmToken) {
          await this.push_token(fcmToken);
          await this.push_to_user(fcmToken, this.currentUser.uid);
        } else reject('The user doesn´t have a device token yet');
        resolve(true);
      } else {
        await messaging().requestPermission();
      }
    });
  };
  push_to_user = (token, userId) => {
    return new Promise((resolve, reject) => {
      const db = firestore();
      db.collection('Users')
        .doc(userId)
        .update({
          tokenMessaging: token,
        })
        .then(() => {
          resolve(true);
        })
        .catch(error => {
          console.error(`Error al insertar el token en la BD => ${error}`);
          reject(error);
        });
    });
  };
  push_token = token => {
    return new Promise((resolve, reject) => {
      const db = firestore();
      db.collection('Tokens')
        .doc(token)
        .set({
          token: token,
        })
        .then(() => {
          resolve(true);
        })
        .catch(error => {
          console.error(`Error al insertar el token en la BD => ${error}`);
          reject(error);
        });
    });
  };
  userOrdersListener = handle => {
    return firestore()
      .collection('Orders')
      .where('uid', '==', this.currentUser.uid)
      .onSnapshot(function(orders) {
        let ordersTemp = [];
        orders.docs.map(value => {
          ordersTemp.push(value.data());
        });
        handle(ordersTemp);
      });
  };
  getDataUser = async uid => {
    const snapshot = await firestore()
      .collection('Users')
      .doc(uid)
      .get();
    return snapshot.data();
  };
  getUserOrders = async () => {
    const orders = await firestore()
      .collection('Orders')
      .where('uid', '==', this.currentUser.uid)
      .get();
    let ordersTemp = [];
    orders.docs.map(value => {
      ordersTemp.push(value.data());
    });
    return ordersTemp;
  };
  getDolarTodayApi = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await fetch(
          'https://s3.amazonaws.com/dolartoday/data.json',
        );
        const json = await data.json();
        resolve(json.USD.promedio);
      } catch (e) {
        reject(e);
      }
    });
  };
  async getConfig() {
    let Products = {};
    let BankData = {};
    const querySnapshot = await firestore()
      .collection('Config')
      .get();
    querySnapshot.forEach(function(doc) {
      switch (doc.id) {
        case 'Products':
          Products = doc.data();
          break;
        case 'BankData':
          BankData = doc.data();
      }
    });
    return {BankData, Products};
  }
  uploadCaptureToStorage(imageSource, orderId) {
    return new Promise((resolve, reject) => {
      const fileName = imageSource.fileName;
      const folder = this.currentUser.uid;
      var storageRef = storage().ref();
      var imagesRef = storageRef.child(folder + '/orders/' + orderId);
      var fileRef = imagesRef.child(fileName);
      var uploadTask = fileRef.putFile(imageSource.path);

      uploadTask.on(
        'state_changed',
        function(snapshot) {
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          switch (snapshot.state) {
            case storage.TaskState.PAUSED: // or 'paused'
              ////console.log('Upload is paused');
              break;
            case storage.TaskState.RUNNING: // or 'running'
              ////console.log('Upload is running');
              break;
          }
        },
        function(error) {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors

          switch (error.code) {
            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              break;

            case 'storage/canceled':
              break;
            case 'storage/unknown':
              break;
          }
          reject(error.code);
        },
        function(snapshot) {
          const {downloadURL} = snapshot;
          //  this.updateOrder(order, {downloadURL});
          resolve(true);
          // Upload completed successfully, now we can get the download URL
        },
      );
    });
  }

  async makeAnOrder(order) {
    try {
      await this.uploadCaptureToStorage(order.imageSource, order.codeNumber);
      await firestore()
        .collection('Users')
        .doc(this.currentUser.uid)
        .update({orders: firestore.FieldValue.arrayUnion(order.codeNumber)});
      await firestore()
        .collection('Orders')
        .doc(`${order.codeNumber}`)
        .set(order);
    } catch (error) {
      console.log(error);
    }
    return orderid;
  }
  async updateOrder(order, object) {
    await firestore()
      .collection('Orders')
      .doc(`${order.codeNumber}`)
      .update(object);
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
            addresses: [],
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
