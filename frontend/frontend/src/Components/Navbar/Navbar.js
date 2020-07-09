import React, {Fragment} from 'react'
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import {Home} from "@material-ui/icons";
import {Link} from "react-router-dom";
import classes from "./Navbar.module.css"
import {useSelector} from "react-redux";

const Navbar = (props) => {

  const isLoggedIn = useSelector(state => {
    return state.auth.isLoggedIn
  })

  let links = (
      <Fragment>
        <Link to='/login' className={classes.navItem}>
          <Button color="inherit">Login</Button>
        </Link>
      </Fragment>
  )

  if(isLoggedIn) {
    links = (
        <Fragment>
          <Link to='/offers' className={classes.navItem}>
            <Button color="inherit">Offers</Button>
          </Link>
          <Link to='/logout' className={classes.navItem}>
            <Button color="inherit">Logout</Button>
          </Link>
        </Fragment>
    )
  }

  return (
      <AppBar position="static">
        <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <Home />
            </IconButton>
          {links}
        </Toolbar>
      </AppBar>
  )
}

export default Navbar;
