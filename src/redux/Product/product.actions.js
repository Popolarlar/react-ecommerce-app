import productTypes from "./product.types";

export const fetchProductsStart = () => ({
  type: productTypes.FETCH_PRODUCTS_START,
});

export const fetchProductsSuccess = (products) => ({
  type: productTypes.FETCH_PRODUCTS_SUCCESS,
  payload: products,
});

export const addProductStart = (product) => ({
  type: productTypes.ADD_PRODUCT_START,
  payload: product,
});

export const deleteProductStart = (documentID) => ({
  type: productTypes.DELETE_PRODUCT_START,
  payload: documentID,
});

export const updateProductStart = (product) => ({
  type: productTypes.UPDATE_PRODUCT_START,
  payload: product,
});
