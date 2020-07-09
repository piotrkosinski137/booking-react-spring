import * as actionTypes from '../actions/actionTypes'

const initialState = {
  token: null,
  loading: false,
  error: null,
  isLoggedIn: false
}

const auth = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_START: {
      return {
        ...state,
        loading: true
      }
    }
    case actionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        loading: false,
        token: action.token,
        isLoggedIn: true
      }
    }
    case actionTypes.LOGIN_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.error
      }
    }
    case actionTypes.LOGOUT: {
      localStorage.clear()
      return {
        ...state,
        isLoggedIn: false,
        token: null
      }
    }
    default:
      return state
  }
}


export default auth;
