import React, {Suspense, useEffect} from 'react';
import './App.css';
import Layout from "./Components/Layout/Layout";
import {Redirect, Route, Switch, withRouter} from "react-router-dom";
import Login from "./Components/Auth/Login/Login";
import Spinner from "./UI/Spinner/Spinner";
import BookingOffers from "./Components/BookingOffers/BookingOffers";
import OfferDetails
  from "./Components/BookingOffers/Offers/OfferDetails/OfferDetails";
import {useDispatch, useSelector} from "react-redux";
import {loginSuccess} from "./store/actions/auth";
import Logout from "./Components/Auth/Logout/Logout";

const App = (props) => {

  const dispatch = useDispatch()

  useEffect(() => {
    if(localStorage.getItem('token') !== null) {
      dispatch(loginSuccess(localStorage.getItem('token')))
    }
  }, [])

  let routes = (
      <Switch>
        <Route path="/login" component={Login}/>
        <Route path="/logout" component={Logout}/>
        <AuthenticatedRoute path="/offers/:id" component={OfferDetails}/>
        <AuthenticatedRoute path="/offers" component={BookingOffers}/>
      </Switch>
  )

  return (
      <Layout>
        <Suspense fallback={<Spinner/>}>{routes}</Suspense>
      </Layout>
  );
}

export default withRouter(App);


export const AuthenticatedRoute = ({ component: C, appProps, ...rest }) => {
  const isLoggedIn = useSelector(state => {
    return state.auth.isLoggedIn
  })

  return (
      <Route
          {...rest}
          render={props =>
              isLoggedIn
                  ? <C {...props} {...appProps} />
                  : <Redirect
                      to={`/login`}
                  />}
      />
  );
}
