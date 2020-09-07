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
