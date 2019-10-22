export const CUSTOM_DONUT = 'CUSTOM_DONUT';
const initialState = {
  order: [],
  CustomDonut: '',
};
export default (state = initialState, action) => {
  switch (action.type) {
    case CUSTOM_DONUT: {
      return {
        ...state,
        CustomDonut: action.payload,
      };
    }
    default:
      return state;
  }
};
