import firebase from 'react-native-firebase';

export const signOut = () => firebase.auth().signOut();

export const currentUser = () => firebase.auth().currentUser;

class Api {
  async Auth(props) {
    await firebase.auth().onAuthStateChanged(user => {
      if (user) props.auth_state(true);
      else props.auth_state(false);
    });
  }

  errorHandler(error_code) {
    switch (error_code) {
      case 'auth/wrong-password':
        return 'Contraseña invalida, intentelo de nuevo.';
      case 'auth/wrong-password':
        return 'Contraseña invalida, intentelo de nuevo.';
      default:
        return 'Ha ocurrido un error';
    }
  }

  async createUser(
    email,
    password,
    name,
    lastname,
    birthDate,
    country,
    state,
    city,
    phoneNumber,
  ) {
    const db = firebase.firestore();
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        let photoUrl;
        let uid;
        let emailVerified;
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
              email,
              birthDate,
              country,
              state,
              city,
              phoneNumber,
              photoUrl,
              emailVerified,
              uid,
            })
            .then(refDoc => {
              firebase
                .auth()
                .currentUser.sendEmailVerification({
                  handleCodeInApp: true,
                  android: {
                    packageName: 'com.rocketdonuts.rocketdonuts',
                    installApp: true,
                    minimumVersion: '12',
                  },
                  iOS: {
                    bundleId: undefined,
                  },
                  url: 'rocketdonuts/email-verification',
                })
                .then(() => {
                  console.log('Email Verification Sent!');
                })
                .catch(error => console.log(error));
            })
            .catch(error => {
              console.log(`Error al enviar mensaje ${error}`);
            });
        }
      })
      .catch(error => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // errors
        if (errorCode == 'auth/weak-password') {
          console.log('The password is too weak.');
        } else {
          console.log(errorMessage);
        }
      });
  }

  async LoginWithEmailAndPassword(email, password) {
    let success = null;
    let errorCode;
    let errorMessage;
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        // Ingresamos los datos al Firebase Auth
        const user = currentUser();
        if (user.emailVerified) {
          console.log('Has iniciado correctamente');
          success = true;
        } else {
          console.log('Necesitas verificar primero tu correo electronico');
          signOut();
          success = false;
        }
      })
      .catch(error => {
        // Capturamos errores
        errorCode = error.code;
        errorMessage = error.message;
      });
    return [success, errorCode, errorMessage];
  }

  async authWithFacebook() {
    const provider = new firebase.auth.FacebookAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        console.log(error);
      });
  }

  async authWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        console.log(error);
      });
  }
}
export default new Api();
