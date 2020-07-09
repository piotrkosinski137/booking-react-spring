import * as actionTypes from "./actionTypes";
import axios from '../../axios-config'

export const loadingOffersStart = () => {
  return {
    type: actionTypes.LOADING_OFFERS_START
  }
}

export const loadOffers = (from, to, city) => {
  return dispatch => {
    dispatch(loadingOffersStart())

    axios.get('/offer', {
      params: {
        from: from,
        to: to,
        city: city
      }
    }).then(response => {
      dispatch(loadingOffersSuccess(response.data.offers, response.data.coordinates))
    })
    .catch(() => {
      dispatch(loginFailed("Failed to load offers"))
    });
  }
}

const loadingOffersSuccess = (offers, coordinates) => {
  return {
    type: actionTypes.LOADING_OFFERS_SUCCESS,
    offers: offers,
    coordinates: coordinates
  }
}

const loginFailed = (error) => {
  return {
    type: actionTypes.LOADING_OFFERS_FAILURE,
    error: error
  }
}

export const selectCurrentOffer = (id) => {
  return {
    type: actionTypes.SELECT_CURRENT_OFFER,
    offerId: id
  }
}

export const clearCurrentOffer = () => {
  return {
    type: actionTypes.CLEAR_CURRENT_OFFER
  }
}

const reserveOfferStart = () => {
  return {
    type: actionTypes.RESERVE_OFFER_START
  }
}

export const reserveOffer = (reservation, history) => {
  return dispatch => {
    dispatch(reserveOfferStart())

    axios.post('/offer/reserve', reservation).then(() => {
      dispatch(reservationSuccess())
      history.push('/offers') //docelowo widok z rezerwacjami
    })
    .catch(() => {
      dispatch(reservationFailed("Failed to make reservation"))
    });
  }
}

const reservationSuccess = () => {
  return {
    type: actionTypes.RESERVE_OFFER_SUCCESS
  }
}

const reservationFailed = (error) => {
  return {
    type: actionTypes.RESERVE_OFFER_FAILURE,
    error: error
  }
}

export const searchFromDateChange = (from) => {
  return {
    type: actionTypes.SEARCH_FROM_DATE_CHANGE,
    from: from
  }
}

export const searchToDateChange = (to) => {
  return {
    type: actionTypes.SEARCH_TO_DATE_CHANGE,
    to: to
  }
}

export const searchCityChange = (city) => {
  return {
    type: actionTypes.SEARCH_CITY_CHANGE,
    city: city
  }
}

