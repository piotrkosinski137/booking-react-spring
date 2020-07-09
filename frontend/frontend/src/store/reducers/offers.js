import * as actionTypes from '../actions/actionTypes'

const initialState = {
  offers: [],
  selectedOffer: {
    id: 8,
    title: 'King room',
    price: 300,
    x: 51.509,
    y: -0.07,
    booked: true,
    image: "https://i.dobrzemieszkaj.pl/i/31/45/36/r3/1920/wood-core-house-w-dwa-dni-zbuduje-dom-na-4buildings.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid asperiores aspernatur consectetur consequatur consequuntur debitis ducimus, est expedita fugiat itaque molestias necessitatibus neque, quaerat, qui quisquam quos ratione temporibus unde."
  },
  loading: false,
  mapCoordinates: {x: 51.505, y: -0.09},

  search: {
    from: new Date(),
    to: new Date(),
    days: 1
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
          from: action.from,
          to: state.search.to,
          days: days_between(state.search.to, action.from)
        }
      }
    }
    case actionTypes.SEARCH_TO_DATE_CHANGE: {
      return {
        ...state,
        search: {
          from: state.search.from,
          to: action.to,
          days: days_between(action.to, state.search.from)
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
