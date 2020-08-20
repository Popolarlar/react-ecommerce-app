import { takeLatest, call, all, put } from "redux-saga/effects";
import productTypes from "./product.types";
import { fetchProductsSuccess, fetchProductsStart } from "./product.actions";
import {
  handleAddProduct,
  handleFetchProducts,
  handleDeleteProduct,
  handleUpdateProduct,
} from "./product.helpers";
import { auth } from "./../../firebase/utils";

// Fetch products
export function* fetchProducts() {
  try {
    const products = yield handleFetchProducts();
    yield put(fetchProductsSuccess(products));
  } catch (error) {
    console.error(error);
  }
}
export function* onFetchProductsStart() {
  yield takeLatest(productTypes.FETCH_PRODUCTS_START, fetchProducts);
}

// Add product
export function* addProductStart({
  payload: { productCategory, productName, productThumbnail, productPrice },
}) {
  try {
    const timestamp = new Date();
    yield handleAddProduct({
      productCategory,
      productName,
      productThumbnail,
      productPrice,
      productAdminUID: auth.currentUser.uid,
      createdDate: timestamp,
    });

    yield put(fetchProductsStart());
  } catch (error) {
    console.error(error);
  }
}
export function* onAddProductStart() {
  yield takeLatest(productTypes.ADD_PRODUCT_START, addProductStart);
}

// Delete product
export function* deleteProduct({ payload: documentID }) {
  try {
    yield handleDeleteProduct(documentID);
    yield put(fetchProductsStart());
  } catch (error) {
    console.error(error);
  }
}
export function* onDeleteProductStart() {
  yield takeLatest(productTypes.DELETE_PRODUCT_START, deleteProduct);
}

export function* updateProductStart({
  payload: {
    productCategory,
    productName,
    productThumbnail,
    productPrice,
    documentID,
  },
}) {
  try {
    const timestamp = new Date();
    yield handleUpdateProduct({
      documentID,
      product: {
        productCategory,
        productName,
        productThumbnail,
        productPrice,
      },
    });

    yield put(fetchProductsStart());
  } catch (error) {
    console.error(error);
  }
}
export function* onUpdateProductStart() {
  yield takeLatest(productTypes.UPDATE_PRODUCT_START, updateProductStart);
}

// All
export default function* userSagas() {
  yield all([
    call(onFetchProductsStart),
    call(onAddProductStart),
    call(onDeleteProductStart),
    call(onUpdateProductStart),
  ]);
}
