import { createSelector } from "reselect";

// State selector
export const getProducts = (state) => state.product.products;
export const getCategories = (state) => state.product.categories;
export const getDetailProduct = (state) => state.product.detailProduct;
export const getIsLoading = (state) => state.product.isLoading;
export const getError = (state) => state.product.error;

// Variable selector (create a selector that ignores the state variable and return just the passed param
const getCategory = (_, category) => category;

// Combined selector
export const getProductsByCategory = createSelector(
  getProducts,
  getCategory,
  (products, category) => {
    return category === "all"
      ? products
      : products.filter((product) => product.productCategory === category);
  }
);
