import userTypes from "./user.types";

export const emailSignInStart = (userCredentials) => ({
  type: userTypes.EMAIL_SIGN_IN_START,
  payload: userCredentials,
});

export const googleSignInStart = () => ({
  type: userTypes.GOOGLE_SIGN_IN_START,
});

export const signInSuccess = (user) => ({
  type: userTypes.SIGN_IN_SUCCESS,
  payload: user,
});

export const checkUserSession = () => ({
  type: userTypes.CHECK_USER_SESSION,
});

export const signOutStart = () => ({
  type: userTypes.SIGN_OUT_START,
});

export const signOutSuccess = () => ({
  type: userTypes.SIGN_OUT_SUCCESS,
});

export const signUpStart = (userCredentials) => ({
  type: userTypes.SIGN_UP_START,
  payload: userCredentials,
});

export const userError = (error) => ({
  type: userTypes.USER_ERROR,
  payload: error,
});

export const retrievePasswordStart = (userCredentials) => ({
  type: userTypes.RETRIEVE_PASSWORD_START,
  payload: userCredentials,
});

export const retrievePasswordSuccess = () => ({
  type: userTypes.RETRIEVE_PASSWORD_SUCCESS,
  payload: true,
});

export const resetUserState = () => ({
  type: userTypes.RESET_USER_STATE,
});

export const fetchUsersStart = () => ({
  type: userTypes.FETCH_USERS_START,
});

export const fetchUsersSuccess = (users) => ({
  type: userTypes.FETCH_USERS_SUCCESS,
  payload: users,
});

export const addUserStart = (user) => ({
  type: userTypes.ADD_USERS_START,
  payload: user,
});
