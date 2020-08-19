import { takeLatest, call, all, put } from "redux-saga/effects";
import userTypes from "./user.types";
import {
  signInSuccess,
  signOutSuccess,
  retrievePasswordSuccess,
  userError,
} from "./user.actions";
import {
  auth,
  handleUserProfile,
  getCurrentUser,
  GoogleProvider,
} from "./../../firebase/utils";
import { handleRetrievePasswordAPI } from "./user.helpers";

// Sign in
export function* getSnapshotFromAuthUser(user, additionalData = {}) {
  try {
    // Add or read uer profile from the DB
    const userRef = yield call(handleUserProfile, {
      authUser: user,
      additionalData,
    });
    const snapshot = yield userRef.get();
    // Update redux store
    yield put(
      signInSuccess({
        id: snapshot.id,
        ...snapshot.data(),
      })
    );
  } catch (error) {
    console.log(error);
  }
}
export function* emailSignIn({ payload: { email, password } }) {
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield getSnapshotFromAuthUser(user);
  } catch (error) {
    console.error(error);
  }
}
export function* onEmailSignInStart() {
  // Listen to changes of action type
  yield takeLatest(userTypes.EMAIL_SIGN_IN_START, emailSignIn);
}
export function* googleSignIn() {
  try {
    const { user } = yield auth.signInWithPopup(GoogleProvider);
    yield getSnapshotFromAuthUser(user);
  } catch (error) {
    console.error(error);
  }
}
export function* onGoogleSignInStart() {
  // Listen to changes of action type
  yield takeLatest(userTypes.GOOGLE_SIGN_IN_START, googleSignIn);
}

// Check user session
export function* isUserAuthenticated() {
  try {
    // Check if the user is authenticated
    const { authUser } = yield getCurrentUser();
    if (!authUser) return;

    // Update redux store
    yield getSnapshotFromAuthUser(authUser);
  } catch (error) {
    console.log(error);
  }
}
export function* onCheckUserSession() {
  // Listen to changes of action type
  yield takeLatest(userTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

// Sign out
export function* signOut() {
  try {
    yield auth.signOut();
    // Update redux store
    yield put(signOutSuccess());
  } catch (error) {
    console.log(error);
  }
}
export function* onSignOutStart() {
  yield takeLatest(userTypes.SIGN_OUT_START, signOut);
}

// Sign up
export function* signUp({
  payload: { displayName, email, password, confirmPassword },
}) {
  if (password !== confirmPassword) {
    const err = ["Password not match."];
    // Dispatch an error to update redux store
    yield put(userError(err));
    return;
  }

  try {
    const { user } = yield auth.createUserWithEmailAndPassword(email, password);
    const additionalData = { displayName };
    // Update redux store
    yield yield getSnapshotFromAuthUser(user, additionalData);
  } catch (error) {
    console.log(error);
  }
}
export function* onSignUpStart() {
  yield takeLatest(userTypes.SIGN_UP_START, signUp);
}

// Retrieve password
export function* retrievePassword({ payload: { email } }) {
  try {
    yield call(handleRetrievePasswordAPI, email);
    yield put(retrievePasswordSuccess());
  } catch (error) {
    yield put(userError(error));
    console.log(error);
  }
}
export function* onRetrievePasswordStart() {
  yield takeLatest(userTypes.RETRIEVE_PASSWORD_START, retrievePassword);
}

// All
export default function* userSagas() {
  yield all([
    call(onEmailSignInStart),
    call(onCheckUserSession),
    call(onSignOutStart),
    call(onRetrievePasswordStart),
    call(onGoogleSignInStart),
  ]);
}
