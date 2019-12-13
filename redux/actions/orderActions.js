import {
  SET_ORDER_STATUS,
  SET_CURRENT_SCREEN,
  SELECT_OPTION_SCREEN,
  COMPLETE_ORDER,
} from '../modules/orderReducer';

import {firestore, storage} from 'react-native-firebase';

export function uploadCaptureToStorage(imageSource, orderId, uid, dispatch) {
  return new Promise((resolve, reject) => {
    const fileName = imageSource.fileName;
    var storageRef = storage().ref();
    var imagesRef = storageRef.child(uid + '/orders/' + orderId);
    var fileRef = imagesRef.child(fileName);
    var uploadTask = fileRef.putFile(imageSource.path);
    uploadTask.on(
      'state_changed',
      function(snapshot) {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress);
        switch (snapshot.state) {
          case storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
          case storage.TaskState.RUNNING: // or 'running'
            dispatch(setOrderStatus('UPLOADING', progress));
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
            console.log('Upload is canceled');
            break;
          case 'storage/unknown':
            break;
        }
        console.log(error.code);
      },
      function(snapshot) {
        const {downloadURL} = snapshot;

        resolve(downloadURL);
        // Upload completed successfully, now we can get the download URL
      },
    );
  });
}
export const emptyStates = () => dispatch => {
  dispatch({type: COMPLETE_ORDER});
};
export function makeAnOrder() {
  return async (dispatch, getState) => {
    try {
      dispatch(setOrderStatus('UPLOADING', 0));
      let {order, globalReducer} = getState();
      let objOrder = makeOrderObject(order, globalReducer);

      const downloadUrl = await uploadCaptureToStorage(
        objOrder.imageSource,
        objOrder.codeNumber,
        objOrder.uid,
        dispatch,
      );
      objOrder.imageSource.downloadUrl = downloadUrl;

      await firestore()
        .collection('Users')
        .doc(objOrder.uid)
        .update({orders: firestore.FieldValue.arrayUnion(objOrder.codeNumber)});

      await firestore()
        .collection('Orders')
        .doc(`${objOrder.codeNumber}`)
        .set(objOrder);

      await dispatch(setOrderStatus('COMPLETED', objOrder.codeNumber));
    } catch (e) {
      await dispatch(setOrderStatus('ERROR', e));
    }
  };
}
export function getScreen(direction, optionSelected) {
  return (dispatch, getState) => {
    try {
      let states = getState();
      let {CompleteOrder} = states.order;
      let {currentScreen} = CompleteOrder;
      let NextScreen = handleScreen(direction, CompleteOrder, optionSelected);
      dispatch(setOpcionSelected(currentScreen, optionSelected));
      dispatch(setCurrentScreen(NextScreen));
    } catch (error) {
      console.error(error);
    }
  };
}

const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};
function makeOrderObject(order, globalReducer) {
  const date = new Date();
  var orderid =
    `${date.getDate()}${date.getMonth() + 1}` + randomNumber(0, 999);

  let objOrder = {};

  const {path, fileName} = order.CompleteOrder.Screens[
    'AttachScreenShot'
  ].selectedOption.imageSource;

  objOrder.order = order.order;
  objOrder.totalPrice = order.totalPrice;
  objOrder.totalPriceUSD = order.totalPriceUSD;
  objOrder.quantity = order.orderQuantity;
  objOrder.usdAverage = globalReducer.usdAverage;

  objOrder.payment_method =
    order.CompleteOrder.Screens['SelectPaymentOption'].selectedOption;
  // objOrder.cashAmount = this.state.amount;
  objOrder.serviceType =
    order.CompleteOrder.Screens['SelectAnOption'].selectedOption;
  objOrder.selectedAddress =
    order.CompleteOrder.Screens['SelectAnAddress'].selectedOption;

  objOrder.state = 'Por Confirmar';
  objOrder.uid = globalReducer.currentUser.uid;
  objOrder.codeNumber = orderid;
  objOrder.imageSource = {
    fileName,
    path,
  };
  return objOrder;
}

function setOrderStatus(status, value) {
  return {
    type: SET_ORDER_STATUS,
    payload: {
      orderStatus: {
        status,
        value,
      },
    },
  };
}
function setCurrentScreen(screen) {
  return {
    type: SET_CURRENT_SCREEN,
    payload: screen,
  };
}
function setOpcionSelected(currentScreen, option) {
  return {
    type: SELECT_OPTION_SCREEN,
    payload: {
      Screen: currentScreen,
      Selected: option,
    },
  };
}
function handleScreen(go, CompleteOrder, optionSelected) {
  const {currentScreen, keys} = CompleteOrder;
  const objScreens = keys;

  const isSelected = (screen, option) => {
    if (go == 'back') {
      return (
        CompleteOrder.Screens[screen].selectedOption ==
        CompleteOrder.Screens[screen].options[option]
      );
    } else {
      return optionSelected == CompleteOrder.Screens[screen].options[option];
    }
  };

  switch (currentScreen) {
    case objScreens[0]:
      if (go == 'next') {
        if (isSelected(objScreens[0], 0)) {
          return objScreens[1];
        } else if (isSelected(objScreens[0], 1)) {
          return objScreens[2];
        }
      } else if (go == 'back') {
        return objScreens[0];
      }
      break;
    case objScreens[1]:
      if (go == 'next') {
        return objScreens[2];
      } else if (go == 'back') {
        return objScreens[0];
      }
      break;
    case objScreens[2]:
      if (go == 'next') {
        if (isSelected(objScreens[2], 0) || isSelected(objScreens[2], 1)) {
          return objScreens[3];
        } else if (
          isSelected(objScreens[2], 2) ||
          isSelected(objScreens[2], 3)
        ) {
          return objScreens[6];
        }
      } else if (go == 'back') {
        if (isSelected(objScreens[0], 0)) {
          return objScreens[1];
        }
        return objScreens[0];
      }
      break;
    case objScreens[3]:
      if (go == 'next') {
        return objScreens[4];
      } else if (go == 'back') {
        return objScreens[2];
      }
      break;
    case objScreens[4]:
      if (go == 'next') {
        return objScreens[5];
      } else if (go == 'back') {
        return objScreens[3];
      }
      break;
    case objScreens[5]:
      if (go == 'next') {
        return objScreens[6];
      } else if (go == 'back') {
        return objScreens[4];
      }
      break;
    default:
      return objScreens[0];
  }
}
