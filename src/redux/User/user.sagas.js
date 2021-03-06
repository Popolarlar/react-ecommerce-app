import { takeLatest, call, all, put } from "redux-saga/effects";
import userTypes from "./user.types";
import {
  signInSuccess,
  signOutSuccess,
  retrievePasswordSuccess,
  userError,
  fetchUsersSuccess,
  updatePasswordSuccess,
} from "./user.actions";
import {
  auth,
  handleUserProfile,
  getCurrentUser,
  GoogleProvider,
} from "./../../firebase/utils";
import { handleRetrievePasswordAPI, handleFetchUsers } from "./user.helpers";

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
    // const err = [error.message];
    // yield put(userError(err));
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
    // const err = [error.message];
    // yield put(userError(err));
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
    yield getSnapshotFromAuthUser(user, additionalData);
  } catch (error) {
    // const err = [error.message];
    // yield put(userError(err));
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
    const err = [error.message];
    yield put(userError(err));
    // console.log(error);
  }
}
export function* onRetrievePasswordStart() {
  yield takeLatest(userTypes.RETRIEVE_PASSWORD_START, retrievePassword);
}

// Change password
export function* updatePassword({ payload: { password, confirmPassword } }) {
  if (password !== confirmPassword) {
    const err = ["Password not match."];
    // Dispatch an error to update redux store
    yield put(userError(err));
    return;
  }

  try {
    yield auth.currentUser.updatePassword(password);
    yield put(updatePasswordSuccess());
  } catch (error) {
    const err = [error.message];
    yield put(userError(err));
    // console.log(error);
  }
}
export function* onUpdatePasswordStart() {
  yield takeLatest(userTypes.UPDATE_PASSWORD_START, updatePassword);
}

// Fetch users
export function* fetchUsers() {
  try {
    const users = yield handleFetchUsers();
    yield put(fetchUsersSuccess(users));
  } catch (error) {
    console.log(error);
  }
}
export function* onFetchUsersStart() {
  yield takeLatest(userTypes.FETCH_USERS_START, fetchUsers);
}

// All
export default function* userSagas() {
  yield all([
    call(onEmailSignInStart),
    call(onGoogleSignInStart),
    call(onCheckUserSession),
    call(onSignOutStart),
    call(onSignUpStart),
    call(onRetrievePasswordStart),
    call(onUpdatePasswordStart),
    call(onFetchUsersStart),
  ]);
}
