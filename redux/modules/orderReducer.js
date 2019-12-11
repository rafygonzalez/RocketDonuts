export const CUSTOM_DONUT = 'CUSTOM_DONUT';
export const SET_ORDER = 'SET_ORDER';
export const SET_ORDER_QUANTITY = 'SET_ORDER_QUANTITY';
export const CONFIG_PRODUCTS = 'CONFIG_PRODUCTS';
export const SET_ORDER_TOTAL_PRICE = 'SET_ORDER_TOTAL_PRICE';
export const SET_ORDER_TOTAL_PRICE_DOLAR = 'SET_ORDER_TOTAL_PRICE_DOLAR';

export const SELECT_OPTION_SCREEN = 'COMPLETE_ORDER/SELECT_OPTION_SCREEN';
export const SET_CURRENT_SCREEN = 'COMPLETE_ORDER/SET_CURRENT_SCREEN';

import SelectAnOption from '../../src/screens/components/Complete_Order/SelectAnOption';
import SelectPaymentOption from '../../src/screens/components/Complete_Order/SelectPayment';
import SelectAnAddress from '../../src/screens/components/Complete_Order/SelectAnAddress';
import ShowBankData from '../../src/screens/components/Complete_Order/ShowBankData';
import AttachScreenshot from '../../src/screens/components/Complete_Order/AttachScreenshot';
import ShowScreenshot from '../../src/screens/components/Complete_Order/ShowScreenshot';
import Finish from '../../src/screens/components/Complete_Order/Finish';
import api from '../../src/firebase/api';

const initialState = {
  config: {},
  order: [],
  orderQuantity: {},
  totalPrice: 0,
  totalPriceUSD: 0,
  CustomDonut: '',
  CompleteOrder: {
    currentScreen: 'SelectAnOption',
    Screens: {
      SelectAnOption: {
        component: SelectAnOption,
        options: ['Delivery', 'PickUp'],
        selectedOption: '',
      },
      SelectAnAddress: {
        component: SelectAnAddress,
        selectedOption: '',
      },
      SelectPaymentOption: {
        component: SelectPaymentOption,
        options: ['transferencia', 'pago_movil', 'efecbs', 'efecdolar'],
        selectedOption: '',
      },
      ShowBankData: {
        component: ShowBankData,
      },
      AttachScreenShot: {
        component: AttachScreenshot,
      },
      ShowSreenshot: {
        component: ShowScreenshot,
      },
      Finish: {
        component: Finish,
      },
    },
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CUSTOM_DONUT: {
      return {
        ...state,
        order: [
          ...state.order,
          {
            type: action.payload.type,
            filling: action.payload.fillingDonut,
            cover: action.payload.coverDonut,
            topping: action.payload.toppingDonut,
            name: action.payload.name,
            quantity: action.payload.quantity,
            id: action.payload.id,
          },
        ],
      };
    }
    case SET_ORDER: {
      return {
        ...state,
        order: action.payload.orderArray,
      };
    }
    case SET_ORDER_QUANTITY: {
      return {
        ...state,
        orderQuantity: action.payload,
      };
    }
    case SET_ORDER_TOTAL_PRICE: {
      return {
        ...state,
        totalPrice: action.payload,
      };
    }
    case SET_ORDER_TOTAL_PRICE_DOLAR: {
      return {
        ...state,
        totalPriceUSD: action.payload,
      };
    }
    case CONFIG_PRODUCTS: {
      return {
        ...state,
        config: action.payload,
      };
    }
    case SET_CURRENT_SCREEN: {
      return {
        ...state,
        CompleteOrder: {
          ...state.CompleteOrder,
          currentScreen: action.payload,
        },
      };
    }
    case SELECT_OPTION_SCREEN: {
      return {
        ...state,
        CompleteOrder: {
          ...state.CompleteOrder,
          Screens: {
            ...state.CompleteOrder.Screens,
            [action.payload.Screen]: {
              ...state.CompleteOrder.Screens[action.payload.Screen],
              selectedOption: action.payload.Selected,
            },
          },
        },
      };
    }
    default:
      return state;
  }
};
function makeOrderObject(order, globalReducer) {
  var min = 0;
  var max = 99999;
  var orderid = Math.floor(Math.random() * (max - min)) + min;
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
    path,
    fileName,
  };
  return objOrder;
}

export function makeAnOrder() {
  return (dispatch, getState) => {
    let {order, globalReducer} = getState();
    let objOrder = makeOrderObject(order, globalReducer);
    api.makeAnOrder(objOrder);
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
