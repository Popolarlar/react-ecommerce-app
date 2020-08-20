import productTypes from "./product.types";

const INITIAL_STATE = {
  products: [],
};

const productReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case productTypes.FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload,
      };
    default:
      return state;
  }
};

export default productReducer;
