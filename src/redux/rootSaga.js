import { all, call } from "redux-saga/effects";
import userSagas from "./User/user.sagas";
// all: resolves all effects in parallel
// call: calls functions

export default function* rootSaga() {
  yield all([call(userSagas)]);
}
