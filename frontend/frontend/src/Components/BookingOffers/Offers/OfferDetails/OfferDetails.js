import 'date-fns';
import React, {Fragment, useEffect, useState} from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import {useDispatch, useSelector} from "react-redux";
import Button from "@material-ui/core/Button";
import classes from "./OfferDetails.module.css"
import Card from "@material-ui/core/Card";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {reserveOffer} from "../../../../store/actions/offers";

const OfferDetails = (props) => {

  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')

  const selectedOffer = useSelector(state => {
    return state.offers.selectedOffer
  })

  const days = useSelector(state => {
    return state.offers.search.days
  })

  useEffect(() => {
    setFrom(props.location.state.from);
    setTo(props.location.state.to);
  },[])

  const dispatch = useDispatch()

  const handleBackClick = () => {
    props.history.goBack();
  }

  const handleStartDateChange = (event) => {
    console.log(event)
  }

  const handleEndDateChange = (event) => {
    console.log(event)
  }

  const handleBook = () => {
    dispatch(reserveOffer({
      offerId: selectedOffer.id,
      from: from,
      to: to,
      price: selectedOffer.price
    }, props.history))
  }

  return (
      <Fragment>
        <div className={classes.container}>
          <Button variant="contained" color="secondary"
                  startIcon={<ArrowBackIcon/>}
                  onClick={handleBackClick}>Back</Button>
          <Card className={classes.card}>
            <div className={classes.cardContainer}>
              <img alt="offer" src={selectedOffer.image}
                   className={classes.image}/>
              <div className={classes.description}>
                <h2>{selectedOffer.title}</h2>
                <h4>{selectedOffer.description}</h4>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                      disableToolbar
                      minDate={new Date()}
                      format="dd/MM/yyyy"
                      margin="normal"
                      id="from-date"
                      label="From"
                      value={from}
                      onChange={handleStartDateChange}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                  />
                  <KeyboardDatePicker
                      disableToolbar
                      format="dd/MM/yyyy"
                      margin="normal"
                      id="to-date"
                      label="To"
                      value={to}
                      onChange={handleEndDateChange}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                  />
                </MuiPickersUtilsProvider>
                <div>
                  <h3>Price: ${selectedOffer.price} / day</h3>
                  <h3>Total: ${selectedOffer.price * days}</h3>
                  <Button variant="contained" color="primary"
                  onClick={handleBook}>Book Now!</Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </Fragment>
  )
}

export default OfferDetails;
