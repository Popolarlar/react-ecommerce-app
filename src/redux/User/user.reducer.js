import userTypes from "./user.types";

const INITIAL_STATE = {
  currentUser: null,
  retrievePasswordSuccess: false,
  userErr: [],
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        retrievePasswordSuccess: false,
        userErr: [],
      };
    case userTypes.RETRIEVE_PASSWORD_SUCCESS:
      return {
        ...state,
        retrievePasswordSuccess: action.payload,
        userErr: [],
      };
    case userTypes.USER_ERROR:
      return {
        ...state,
        userErr: action.payload,
      };
    case userTypes.SIGN_OUT_SUCCESS:
    case userTypes.RESET_USER_STATE:
      return {
        ...state,
        ...INITIAL_STATE,
      };
    default:
      return state;
  }
};

export default userReducer;
