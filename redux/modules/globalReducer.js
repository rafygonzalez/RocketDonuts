export const CURRENT_SCREEN = 'CURRENT_SCREEN';
const initialState = {
  currentScreen: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CURRENT_SCREEN: {
      return {
        ...state,
        currentScreen: action.payload,
      };
    }
    default:
      return state;
  }
};
