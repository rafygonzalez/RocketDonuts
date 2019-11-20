export const CUSTOM_DONUT = 'CUSTOM_DONUT';
export const SET_ORDER = 'SET_ORDER';
export const SET_ORDER_QUANTITY = 'SET_ORDER_QUANTITY';
export const CONFIG_PRODUCTS = 'CONFIG_PRODUCTS';
export const SET_ORDER_TOTAL_PRICE = 'SET_ORDER_TOTAL_PRICE'
const initialState = {
  config: {},
  order: [],
  orderQuantity: {},
  totalPrice:0,
  CustomDonut: '',
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
    case CONFIG_PRODUCTS: {
      return {
        ...state,
        config: action.payload,
      };
    }
    default:
      return state;
  }
};
