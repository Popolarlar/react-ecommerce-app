import { takeLatest, call, all, put } from "redux-saga/effects";
import productTypes from "./product.types";
import {
  fetchProductsSuccess,
  fetchProductsStart,
  fetchCategoriesSuccess,
  fetchCategoriesStart,
  fetchProductByIDSuccess,
  fetchProductByIDFailure,
} from "./product.actions";
import {
  handleAddProduct,
  handleFetchProducts,
  handleDeleteProduct,
  handleUpdateProduct,
  handleFetchCategories,
  handleAddCategory,
  handleDeleteCategory,
  handleFetchProductByID,
} from "./product.helpers";
import { auth } from "./../../firebase/utils";

// Fetch products
export function* fetchProducts() {
  try {
    const products = yield call(handleFetchProducts);
    yield put(fetchProductsSuccess(products));
  } catch (error) {
    console.error(error);
  }
}
export function* onFetchProductsStart() {
  yield takeLatest(productTypes.FETCH_PRODUCTS_START, fetchProducts);
}

// Fetch product by documentID
export function* fetchProductByID({ payload: documentID }) {
  try {
    const product = yield call(handleFetchProductByID, documentID);
    yield put(fetchProductByIDSuccess(product));
  } catch (error) {
    yield put(fetchProductByIDFailure(error));
  }
}
export function* onFetchProductByIDStart() {
  yield takeLatest(productTypes.FETCH_PRODUCT_BY_ID_START, fetchProductByID);
}

// Add product
export function* addProductStart({
  payload: { productCategory, productName, productThumbnail, productPrice },
}) {
  try {
    const timestamp = new Date();
    yield call(handleAddProduct, {
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
    yield call(handleDeleteProduct, documentID);
    yield put(fetchProductsStart());
  } catch (error) {
    console.error(error);
  }
}
export function* onDeleteProductStart() {
  yield takeLatest(productTypes.DELETE_PRODUCT_START, deleteProduct);
}

// Update product
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
    yield call(handleUpdateProduct, {
      documentID,
      product: {
        productCategory,
        productName,
        productThumbnail,
        productPrice,
        updatedAdminUID: auth.currentUser.uid,
        updatedDate: timestamp,
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

// Fetch categories
export function* fetchCategories() {
  try {
    const categories = yield call(handleFetchCategories);
    yield put(fetchCategoriesSuccess(categories));
  } catch (error) {
    console.error(error);
  }
}
export function* onFetchCategoriesStart() {
  yield takeLatest(productTypes.FETCH_CATEGORIES_START, fetchCategories);
}

// Add category
export function* addCategoryStart({ payload: { categoryName } }) {
  try {
    const timestamp = new Date();

    yield call(handleAddCategory, {
      categoryName,
      categoryCount: 0,
      categoryAdminUID: auth.currentUser.uid,
      categorySortOrder: 99,
      createdDate: timestamp,
    });

    yield put(fetchCategoriesStart());
  } catch (error) {
    console.error(error);
  }
}
export function* onAddCategoryStart() {
  yield takeLatest(productTypes.ADD_CATEGORY_START, addCategoryStart);
}

// Delete category
export function* deleteCategory({ payload: documentID }) {
  try {
    yield call(handleDeleteCategory, documentID);
    yield put(fetchCategoriesStart());
  } catch (error) {
    console.error(error);
  }
}
export function* onDeleteCategoryStart() {
  yield takeLatest(productTypes.DELETE_CATEGORY_START, deleteCategory);
}

// All
export default function* userSagas() {
  yield all([
    call(onFetchProductsStart),
    call(onFetchProductByIDStart),
    call(onAddProductStart),
    call(onDeleteProductStart),
    call(onUpdateProductStart),
    call(onFetchCategoriesStart),
    call(onAddCategoryStart),
    call(onDeleteCategoryStart),
  ]);
}
