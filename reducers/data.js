

function data(state = {}, action) {
  switch (action.type) {
    case 'SET_OFFERTS_LIST': {
      return { ...state, ...action.payload }
    }
    case 'SET_SELECTED_CATEGORY': {
      return { ...state, selectedCategory: action.payload.category }
    }

    default:
      return state
  }
}

export default data;
