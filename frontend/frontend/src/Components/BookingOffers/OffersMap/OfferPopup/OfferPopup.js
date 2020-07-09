import React from 'react'
import classes from './OfferPopup.module.css'

const OfferPopup = (props) => {

  return (
      <div>
        <div>
          <img className={classes.image}
               alt="offer"
              src={props.offer.image}/>
        </div>
        <h3>{props.offer.title}</h3>
        {props.offer.booked && <h4 className={classes.notAvailable}>Not available on given date!</h4>}
      </div>
  )
}

export default OfferPopup;
