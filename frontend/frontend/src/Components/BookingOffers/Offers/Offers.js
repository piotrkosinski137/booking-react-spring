import React from 'react'
import classes from './Offers.module.css'
import {withRouter} from "react-router-dom";
import Offer from "./Offer/Offer";
import {useDispatch} from "react-redux";
import {
  clearCurrentOffer,
  selectCurrentOffer
} from "../../../store/actions/offers";

const Offers = (props) => {

  const dispatch = useDispatch()

  const handleOfferHover = (id) => {
    dispatch(selectCurrentOffer(id))
  }

  const handleUnhover = () => {
    dispatch(clearCurrentOffer())
  }

  return (
      <div className={classes.container}>
        {props.offers.map(offer => {
          return <div onClick={() => props.handleClick(offer.id)} key={offer.id}>
            <Offer offer={offer}
                   unhover={handleUnhover}
                   hover={handleOfferHover}
                   />
          </div>
        })}
      </div>
  )
}

export default withRouter(Offers);
