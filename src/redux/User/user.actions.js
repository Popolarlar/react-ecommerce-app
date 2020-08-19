import userTypes from "./user.types";
import {
  auth,
  handleUserProfile,
  GoogleProvider,
} from "./../../firebase/utils";

export const setCurrentUser = (user) => ({
  type: userTypes.SET_CURRENT_USER,
  payload: user,
});

export const signInUser = ({ email, password }) => async (dispatch) => {
  try {
    await auth.signInWithEmailAndPassword(email, password);
    dispatch({
      type: userTypes.SIGN_IN_SUCCESS,
      payload: true,
    });
  } catch (error) {
    // console.error(error);
  }
};

export const signInWithGoogle = () => async (dispatch) => {
  try {
    await auth
      .signInWithPopup(GoogleProvider)
      .then(
        dispatch({
          type: userTypes.SIGN_IN_SUCCESS,
          payload: true,
        })
      )
      .catch();
  } catch (error) {
    // console.error(error);
  }
};

export const signUpUser = ({
  email,
  password,
  displayName,
  confirmPassword,
}) => async (dispatch) => {
  // Input validation
  if (password !== confirmPassword) {
    const err = ["Password not match."];
    dispatch({
      type: userTypes.SIGN_UP_ERROR,
      payload: err,
    });
    return;
  }

  try {
    const { user } = await auth.createUserWithEmailAndPassword(email, password);
    await handleUserProfile(user, { displayName });

    dispatch({
      type: userTypes.SIGN_UP_SUCCESS,
      payload: true,
    });
  } catch (error) {
    // console.error(error);
  }
};

export const emailPassword = ({ email }) => async (dispatch) => {
  // Redirect location after reset password
  const config = {
    url: "http://localhost:3000/login",
  };

  await auth
    .sendPasswordResetEmail(email, config)
    .then(() => {
      dispatch({
        type: userTypes.EMAIL_PASSWORD_SUCCESS,
        payload: true,
      });
    })
    .catch(() => {
      const err = ["Email not found. Please try again."];
      dispatch({
        type: userTypes.EMAIL_PASSWORD_ERROR,
        payload: err,
      });
    });
};

export const resetAllAuthForms = () => async (dispatch) => {
  dispatch({
    type: userTypes.RESET_AUTH_FORMS,
  });
};
