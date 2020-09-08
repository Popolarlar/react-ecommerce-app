import { createSelector } from "reselect";

// State selector
export const getProducts = (state) => state.product.products;
export const getCategories = (state) => state.product.categories;

// Variable selector (create a selector that ignores the state variable and return just the passed param
const getDocumentID = (_, documentID) => documentID;
const getCategory = (_, category) => category;

// Combined selector
export const getProductByID = createSelector(
  getProducts,
  getDocumentID,
  (products, documentID) =>
    products.find((product) => product.documentID === documentID)
);

export const getProductsByCategory = createSelector(
  getProducts,
  getCategory,
  (products, category) => {
    return category === "all"
      ? products
      : products.filter((product) => product.productCategory === category);
  }
);
