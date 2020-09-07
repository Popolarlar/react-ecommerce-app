import productTypes from "./product.types";

const INITIAL_STATE = {
  products: [],
  categories: [],
};

const productReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case productTypes.FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload,
      };
    case productTypes.FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: action.payload,
      };
    default:
      return state;
  }
};

export default productReducer;
