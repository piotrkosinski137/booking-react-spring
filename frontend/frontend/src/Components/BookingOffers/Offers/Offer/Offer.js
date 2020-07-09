import React from 'react'
import Card from "@material-ui/core/Card";
import classes from "./Offer.module.css";
import {useSelector} from "react-redux";

const Offer = (props) => {

  const days = useSelector(state => {
    return state.offers.search.days
  })

  return (
      <div
          onMouseOver={() => {
            props.hover(props.offer.id);
          }}
          onMouseOut={(e) => {
            props.unhover();
          }}>
        <Card className={classes.card}>
          <div className={classes.container}>
            <img alt="offer" src={props.offer.image} className={classes.image}/>
            <div className={classes.description}>
              <h2>{props.offer.title}</h2>
              <h3>Price: ${props.offer.price} / day</h3>
              <h3>Total: ${props.offer.price * days}</h3>
            </div>
          </div>
        </Card>
      </div>
  )
}

export default Offer;
