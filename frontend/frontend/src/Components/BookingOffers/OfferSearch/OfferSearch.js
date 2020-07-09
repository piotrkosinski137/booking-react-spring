import React, {useEffect, useState} from 'react'
import classes from "./OfferSearch.module.css";
import Card from "@material-ui/core/Card";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Button from "@material-ui/core/Button";
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from "@material-ui/core/TextField";
import axios from "../../../axios-config"
import {useDispatch, useSelector} from "react-redux";
import {
  loadOffers,
  searchCityChange,
  searchFromDateChange,
  searchToDateChange
} from "../../../store/actions/offers";

const OfferSearch = () => {

  const [cities, setCities] = useState([])

  const dispatch = useDispatch()

  const city = useSelector(state => {
    return state.offers.search.city
  })

  const from = useSelector(state => {
    return state.offers.search.from
  })

  const to = useSelector(state => {
    return state.offers.search.to
  })

  useEffect(() => {
    dispatch(loadOffers(from, to, city))
    searchCities()
  }, [])

  const handleStartDateChange = (from) => {
    dispatch(searchFromDateChange(from))
  }

  const handleEndDateChange = (to) => {
    dispatch(searchToDateChange(to))
  }

  const searchCities = (phrase) => {
    if (phrase !== null) {
      axios.get('/city', {
        params: {
          phrase: phrase
        }
      })
      .then(response => setCities(response.data))
      .catch(error => console.log(error))
    }
  }

  const handleSearch = () => {
    dispatch(loadOffers(from, to, city))
  }

  return (
      <Card className={classes.container}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <div className={classes.searchItem}>
            <KeyboardDatePicker
                minDate={new Date()}
                autoOk={true}
                disableToolbar
                variant="inline"
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
          </div>
          <div className={classes.searchItem}>
            <KeyboardDatePicker
                minDate={new Date(from).setDate(from.getDate() + 1)}
                autoOk={true}
                disableToolbar
                variant="inline"
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
          </div>
          <Autocomplete
              onChange={(event, value) => dispatch(searchCityChange(value))}
              className={classes.autocomplete}
              id="combo-box-demo"
              options={cities}
              getOptionLabel={(option) => option}
              style={{width: 300}}
              renderInput={(params) => {
                return <TextField {...params} label="City"
                                  onChange={(event) => searchCities(
                                      event.target.value)}/>
              }}
          />
          <div className={classes.buttonContainer}>
            <Button variant="contained" color="primary" disabled={!city}
                    onClick={handleSearch}>Search</Button>
          </div>
        </MuiPickersUtilsProvider>
      </Card>
  )
}

export default OfferSearch;
