export const CURRENT_SCREEN = 'CURRENT_SCREEN';
export const USD_AVERAGE = 'USD_AVERAGE';
const initialState = {
  currentScreen: '',
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
