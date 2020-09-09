import productTypes from "./product.types";

const INITIAL_STATE = {
  products: [],
  categories: [],
  detailProduct: {},
  isloading: false,
  error: null,
};

const productReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case productTypes.FETCH_PRODUCTS_START:
    case productTypes.FETCH_PRODUCT_BY_ID_START:
    case productTypes.FETCH_CATEGORIES_START:
      return {
        ...state,
        isloading: true,
        error: null,
      };
    case productTypes.FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload,
        isloading: false,
        error: null,
      };
    case productTypes.FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: action.payload,
        isloading: false,
        error: null,
      };
    case productTypes.FETCH_PRODUCT_BY_ID_SUCCESS:
      return {
        ...state,
        detailProduct: action.payload,
        isloading: false,
        error: null,
      };
    case productTypes.FETCH_PRODUCT_BY_ID_FAILURE:
      return {
        ...state,
        detailProduct: {},
        isloading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default productReducer;
