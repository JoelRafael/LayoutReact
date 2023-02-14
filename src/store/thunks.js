import { singInWithGoogle } from "../firebase/provider";
import { checkingCredentials, logout, login } from "./auth/authSlice";
export const checkingAuthentication = (email, password) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
  };
};

export const startGoogleSingIn = () => {
  return async (dispatch) => {
    dispatch(checkingAuthentication());
    const result = await singInWithGoogle();
    if (!result.ok) return dispatch(logout(result.errorMassage));
    dispatch(login(result));
  };
};
