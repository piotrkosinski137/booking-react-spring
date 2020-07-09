import * as actionTypes from '../actions/actionTypes'

const initialState = {
  offers: [],
  selectedOffer: {},
  loading: false,
  mapCoordinates: {x: 51.505, y: -0.09},

  search: {
    from: new Date(),
    to: new Date(new Date().getFullYear(), new Date().getUTCMonth(), new Date().getDate() + 1),
    days: 1,
    city: null
  }
}

const offers = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOADING_OFFERS_START: {
      return {
        ...state,
        loading: true
      }
    }
    case actionTypes.LOADING_OFFERS_SUCCESS: {
      return {
        ...state,
        loading: false,
        offers: action.offers,
        mapCoordinates: action.coordinates
      }
    }
    case actionTypes.LOADING_OFFERS_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.error
      }
    }
    case actionTypes.SELECT_CURRENT_OFFER: {
      return {
        ...state,
        selectedOffer: state.offers.filter(
            offer => offer.id === action.offerId)[0]

      }
    }
    case actionTypes.CLEAR_CURRENT_OFFER: {
      return {
        ...state,
        selectedOffer: null
      }
    }

    case actionTypes.RESERVE_OFFER_START: {
      return {
        ...state,
        loading: true
      }
    }
    case actionTypes.RESERVE_OFFER_SUCCESS: {
      return {
        ...state,
        loading: false,
        selectedOffer: {}
      }
    }
    case actionTypes.RESERVE_OFFER_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.error
      }
    }
    case actionTypes.SEARCH_FROM_DATE_CHANGE: {
      return {
        ...state,
        search: {
          ...state.search,
          from: action.from,
          to: action.from > state.search.to ? new Date(action.from).setDate(action.from.getDate() + 1): state.search.to,
          days: days_between(state.search.to, action.from)
        }
      }
    }
    case actionTypes.SEARCH_TO_DATE_CHANGE: {
      return {
        ...state,
        search: {
          ...state.search,
          to: action.to,
          days: days_between(action.to, state.search.from)
        }
      }
    }
    case actionTypes.SEARCH_CITY_CHANGE: {
      return {
        ...state,
        search: {
          ...state.search,
          city: action.city
        }
      }
    }
    default:
      return state
  }
}

export default offers;

export const days_between = (date1, date2) => {

  // The number of milliseconds in one day
  const ONE_DAY = 1000 * 60 * 60 * 24;

  // Calculate the difference in milliseconds
  const differenceMs = Math.abs(date1 - date2);

  // Convert back to days and return
  return Math.round(differenceMs / ONE_DAY);

}
