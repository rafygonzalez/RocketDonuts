export const CURRENT_SCREEN = 'CURRENT_SCREEN';
export const USD_AVERAGE = 'USD_AVERAGE';
export const CURRENT_USER = 'CURRENT_USER'
const initialState = {
  currentScreen: {},
  currentUser:{},
  usdAverage: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CURRENT_SCREEN: {
      return {
        ...state,
        currentScreen: action.payload,
      };
    }
    case CURRENT_USER:{
      return {
        ...state,
        currentUser:action.payload
      }
    }
    case USD_AVERAGE: {
      return {
        ...state,
        usdAverage: action.payload,
      };
    }
    default:
      return state;
  }
};
