import {
  loginWithEmailPassowrd,
  logoutFirebase,
  registerUserWithEmailPassword,
  singInWithGoogle,
} from "../firebase/provider";
import { checkingCredentials, logout, login } from "./auth/authSlice";
import { clearNotesLogout } from "./journal/journaSlice";
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

export const startCreatingUserWithEmailPassword = ({
  email,
  password,
  displayName,
}) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
    const { ok, uid, photoURL, errorMessage } =
      await registerUserWithEmailPassword({
        email,
        password,
        displayName,
      });
    if (!ok) return dispatch(logout({ errorMessage }));

    dispatch(login({ uid, displayName, email, photoURL }));
  };
};

export const startLoginWithEmailPassword = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
    console.log(email, password);
    const resp = await loginWithEmailPassowrd({ email, password });
    if (!resp.ok) return dispatch(logout(resp));
    dispatch(login(resp));
  };
};

export const startLogout = () => {
  return async (dispatch) => {
    await logoutFirebase();
    dispatch(clearNotesLogout());
    dispatch(logout({ errorMassage: null }));
  };
};

