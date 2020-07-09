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
import {useDispatch} from "react-redux";
import {
  loadOffers,
  searchFromDateChange,
  searchToDateChange
} from "../../../store/actions/offers";

const OfferSearch = (props) => {

  const [fromDate, setFromDate] = useState(new Date())
  const [toDate, setToDate] = useState(new Date())
  const [cities, setCities] = useState([])
  const [selectedCity, setSelectedCity] = useState('')

  const dispatch = useDispatch()

  useEffect(() => {
    searchCities()
  }, [])

  const handleStartDateChange = (from) => {
    setFromDate(from)
    dispatch(searchFromDateChange(from))
  }

  const handleEndDateChange = (to) => {
    setToDate(to)
    dispatch(searchToDateChange(to))
  }

  const searchCities = (phrase) => {
    setSelectedCity(phrase)
    axios.get('/city', {
      params: {
        phrase: phrase
      }
    })
    .then(response => setCities(response.data))
    .catch(error => console.log(error))
  }

  const handleSearch = () => {
    dispatch(loadOffers(fromDate, toDate, selectedCity))
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
                value={fromDate}
                onChange={handleStartDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
            />
          </div>
          <div className={classes.searchItem}>
            <KeyboardDatePicker
                autoOk={true}
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                id="to-date"
                label="To"
                value={toDate}
                onChange={handleEndDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
            />
          </div>
            <Autocomplete
                onChange={(event, value) => setSelectedCity(value)}
                className={classes.autocomplete}
                id="combo-box-demo"
                options={cities}
                getOptionLabel={(option) => option}
                style={{ width: 300 }}
                renderInput={(params) => {

                  return <TextField {...params} label="City"
                                    onChange={(event) => searchCities(event.target.value)}/>
                }}
            />
          <div className={classes.buttonContainer}>
            <Button variant="contained" color="primary"
            onClick={handleSearch}>Search</Button>
          </div>
        </MuiPickersUtilsProvider>
      </Card>
  )
}

export default OfferSearch;
