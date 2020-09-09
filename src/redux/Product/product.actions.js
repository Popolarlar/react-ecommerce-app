import productTypes from "./product.types";

export const fetchProductsStart = () => ({
  type: productTypes.FETCH_PRODUCTS_START,
});

export const fetchProductsSuccess = (products) => ({
  type: productTypes.FETCH_PRODUCTS_SUCCESS,
  payload: products,
});

export const fetchProductByIDStart = (documentID) => ({
  type: productTypes.FETCH_PRODUCT_BY_ID_START,
  payload: documentID,
});

export const fetchProductByIDSuccess = (product) => ({
  type: productTypes.FETCH_PRODUCT_BY_ID_SUCCESS,
  payload: product,
});

export const fetchProductByIDFailure = (error) => ({
  type: productTypes.FETCH_PRODUCT_BY_ID_FAILURE,
  payload: error,
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

export const fetchCategoriesStart = () => ({
  type: productTypes.FETCH_CATEGORIES_START,
});

export const fetchCategoriesSuccess = (categories) => ({
  type: productTypes.FETCH_CATEGORIES_SUCCESS,
  payload: categories,
});

export const addCategoryStart = (category) => ({
  type: productTypes.ADD_CATEGORY_START,
  payload: category,
});

export const deleteCategoryStart = (documentID) => ({
  type: productTypes.DELETE_CATEGORY_START,
  payload: documentID,
});
