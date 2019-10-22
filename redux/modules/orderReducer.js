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
        order: [
          ...state.order,
          {
            type: action.payload.type,
            filling: action.payload.fillingDonut,
            cover: action.payload.coverDonut,
            topping: action.payload.toppingDonut,
            name: action.payload.name,
            quantity: action.payload.quantity,
          },
        ],
      };
    }
    default:
      return state;
  }
};
