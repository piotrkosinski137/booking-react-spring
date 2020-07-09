import React, {Fragment} from 'react'
import OfferMap from "./OffersMap/OfferMap";
import Offers from "./Offers/Offers";
import classes from "./BookingOffers.module.css"
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentOffer} from "../../store/actions/offers";
import OfferSearch from "./OfferSearch/OfferSearch";

const BookingOffers = (props) => {

  const offers = useSelector(state => {
    return state.offers.offers
  })

  const search = useSelector(state => {
    return state.offers.search
  })

  const dispatch = useDispatch()

  const handleClick = (id) => {
    dispatch(selectCurrentOffer(id))
    props.history.push('/offers/' + id, {from: search.from, to: search.to});
  }

  return (
      <Fragment>
        <OfferSearch />
        <div className={classes.container}>
          <Offers offers={offers} handleClick={(id) => handleClick(id)}/>
          <OfferMap offers={offers} handleClick={(id) => handleClick(id)}/>
        </div>
      </Fragment>
  )
}

export default BookingOffers
