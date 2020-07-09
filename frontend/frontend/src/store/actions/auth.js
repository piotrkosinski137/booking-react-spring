import * as actionTypes from "./actionTypes";
import axios from '../../axios-config'

export const loginStart = () => {
  return {
    type: actionTypes.LOGIN_START
  }
}

export const login = (email, password) => {
  return dispatch => {
    dispatch(loginStart())

    axios.post('/auth', {email, password}).then(response => {
      localStorage.setItem('token', response.data.token)
      dispatch(loginSuccess(response.data.token))
    })
    .catch(() => {
      dispatch(loginFailed("Wrong username or password"))
    });
  }
}

export const loginSuccess = (token) => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    token: token
  }
}

export const loginFailed = (error) => {
  return {
    type: actionTypes.LOGIN_FAILURE,
    error: error
  }
}

export const logout = () => {
  return {
    type: actionTypes.LOGOUT
  }
}
