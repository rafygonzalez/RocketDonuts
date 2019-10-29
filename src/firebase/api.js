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
