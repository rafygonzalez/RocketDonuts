export const CUSTOM_DONUT = 'CUSTOM_DONUT';
export const SET_ORDER = 'SET_ORDER';
export const SET_ORDER_QUANTITY = 'SET_ORDER_QUANTITY';
export const CONFIG_PRODUCTS = 'CONFIG_PRODUCTS';
export const SET_ORDER_TOTAL_PRICE = 'SET_ORDER_TOTAL_PRICE';
export const SET_ORDER_TOTAL_PRICE_DOLAR = 'SET_ORDER_TOTAL_PRICE_DOLAR';

export const SELECT_OPTION_SCREEN = 'COMPLETE_ORDER/SELECT_OPTION_SCREEN';
export const SET_CURRENT_SCREEN = 'COMPLETE_ORDER/SET_CURRENT_SCREEN';
export const SET_ORDER_STATUS = 'COMPLETE_ORDER/SET_ORDER_STATUS';
export const COMPLETE_ORDER = 'COMPLETE_ORDER/COMPLETE_ORDER';

import SelectAnOption from '../../src/screens/components/Complete_Order/SelectAnOption';
import SelectPaymentOption from '../../src/screens/components/Complete_Order/SelectPayment';
import SelectAnAddress from '../../src/screens/components/Complete_Order/SelectAnAddress';
import ShowBankData from '../../src/screens/components/Complete_Order/ShowBankData';
import AttachScreenshot from '../../src/screens/components/Complete_Order/AttachScreenshot';
import ShowScreenshot from '../../src/screens/components/Complete_Order/ShowScreenshot';
import Finish from '../../src/screens/components/Complete_Order/Finish';

const initialState = {
  config: {},
  order: [],
  orderQuantity: {},
  totalPrice: 0,
  totalPriceUSD: 0,
  CustomDonut: '',
  CompleteOrder: {
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
      ShowScreenshot: {
        component: ShowScreenshot,
      },
      Finish: {
        component: Finish,
      },
    },
    orderStatus: {status: 'INCOMPLETE', value: null},
    keys: [
      'SelectAnOption',
      'SelectAnAddress',
      'SelectPaymentOption',
      'ShowBankData',
      'AttachScreenShot',
      'ShowScreenshot',
      'Finish',
    ],
    currentScreen: null,
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
    case SET_ORDER_STATUS: {
      return {
        ...state,
        CompleteOrder: {
          ...state.CompleteOrder,
          orderStatus: action.payload.orderStatus,
        },
      };
    }
    case COMPLETE_ORDER: {
      return {
        ...state,
        CompleteOrder: initialState.CompleteOrder,
        order: initialState.order,
      };
    }
    default:
      return state;
  }
};
