import {
  SET_ORDER_STATUS,
  SET_CURRENT_SCREEN,
  SELECT_OPTION_SCREEN,
} from '../modules/orderReducer';
import api from '../../src/firebase/api';

export function makeAnOrder() {
  return async (dispatch, getState) => {
    try {
      let {order, globalReducer} = getState();
      let objOrder = makeOrderObject(order, globalReducer);
      const orderId = await api.makeAnOrder(objOrder);
      await dispatch(setOrderStatus('COMPLETED', orderId));
    } catch (e) {
      await dispatch(setOrderStatus('ERROR', e));
    }
  };
}
export function getScreen(direction, optionSelected) {
  return async (dispatch, getState) => {
    try {
      let states = getState();
      const {currentScreen} = states.order.CompleteOrder;

      await dispatch(setOpcionSelected(currentScreen, optionSelected));

      states = getState();
      const {CompleteOrder} = states.order;

      const NextScreen = handleScreen(direction, CompleteOrder);
      await dispatch(setCurrentScreen(NextScreen));
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
function handleScreen(go, CompleteOrder) {
  const {currentScreen} = CompleteOrder;
  const objScreens = Object.keys(CompleteOrder.Screens);
  const isSelected = (screen, option) => {
    return (
      CompleteOrder.Screens[screen].selectedOption ==
      CompleteOrder.Screens[screen].options[option]
    );
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
