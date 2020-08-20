import { all, call } from "redux-saga/effects";
import userSagas from "./User/user.sagas";
import productSagas from "./Product/product.sagas";
// all: resolves all effects in parallel
// call: calls functions

export default function* rootSaga() {
  yield all([call(userSagas), call(productSagas)]);
}
