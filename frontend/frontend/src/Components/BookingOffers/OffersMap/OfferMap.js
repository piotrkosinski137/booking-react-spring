import React from 'react'
import {Map, Marker, Popup, TileLayer} from "react-leaflet";
import L from "leaflet";
import OfferPopup from "./OfferPopup/OfferPopup";
import {withRouter} from "react-router-dom";
import {useSelector} from "react-redux";
import classes from "./OfferMap.module.css"

const OfferMap = (props) => {

  const mapCoordinates = useSelector(state => {
    return state.offers.mapCoordinates
  })

  const selectedOffer = useSelector(state => {
    return state.offers.selectedOffer
  })

  const pickPointerColor = (offer) => {
    if (selectedOffer?.id === offer.id) {
      return currentPointer
    }
    return offer.booked ? bookedPointer : freePointer;
  }

  return (
      <Map center={[mapCoordinates.x, mapCoordinates.y]} zoom={12} className={classes.container}>
        <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {props.offers.map(offer => {
          return <Marker key={offer.id}
                         onMouseOver={(e) => {
                           e.target.openPopup();
                         }}
                         onMouseOut={(e) => {
                           e.target.closePopup();
                         }}
                         position={[offer.x, offer.y]}
                         icon={pickPointerColor(offer)}
                         onClick={() => props.handleClick(offer.id)}>
            <Popup className={classes.popup}>
              <OfferPopup offer={offer}/>
            </Popup>
          </Marker>
        })}
      </Map>
  )
}

export default withRouter(OfferMap);

export const freePointer = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  iconSize: [25, 41],
  iconAnchor: [12.5, 41],
  popupAnchor: [0, -41]
})

export const bookedPointer = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  iconSize: [25, 41],
  iconAnchor: [12.5, 41],
  popupAnchor: [0, -41]
})

export const currentPointer = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png',
  iconSize: [25, 41],
  iconAnchor: [12.5, 41],
  popupAnchor: [0, -41]
})
