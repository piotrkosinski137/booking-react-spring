import React, {Fragment, useEffect, useState} from 'react'
import classes from './Login.module.css'
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../../store/actions/auth";
import {Redirect} from "react-router-dom";

const Login = (props) => {

  const [email, setEmail] = useState('guest')
  const [password, setPassword] = useState('guest')

  const dispatch = useDispatch()
  const loading = false
  const isLoggedIn = useSelector(state => {
    return state.auth.isLoggedIn
  })


  useEffect(() => {
  }, [])



  const handleChange = (event) => {
    if (event.target.id === 'email') {
      setEmail(event.target.value)
    } else {
      setPassword(event.target.value)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(login(email, password))
  }

  return (
      <Fragment>
        {isLoggedIn && <Redirect to="/offers"/>}
        <Grid container className={classes.form}>
          <Grid item sm/>
          <Grid item sm>
            <img className={classes.image}
                 src="https://media.istockphoto.com/vectors/right-arrow-vector-icon-on-transparent-background-right-arrow-icon-vector-id1013490744"
                 alt="monkey"/>
            <Typography variant="h3"
                        className={classes.pageTitle}>Login</Typography>
            <form noValidate onSubmit={handleSubmit}>
              <TextField id="email" name="email" type="text" label="email"
                         className={classes.textField}
                         value={email} onChange={handleChange} fullWidth/>
              <TextField id="password" name="password" type="password"
                         label="password" className={classes.textField}
                         value={password} onChange={handleChange} fullWidth/>
              {/*{errors ? errorMessage : null}*/}
              <div className={classes.button}>
                <Button type="submit" variant="contained" disabled={loading}
                        color="primary">{loading ? <CircularProgress/>
                    : 'Submit'}</Button>
              </div>
              {/*<small><Link to="/signup">Sign up</Link></small>*/}
            </form>
          </Grid>
          <Grid item sm/>
        </Grid>
      </Fragment>
  )
}

export default Login;
