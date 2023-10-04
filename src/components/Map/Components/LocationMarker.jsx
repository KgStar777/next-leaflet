import { useAsuncRequest } from '@hooks/useAsuncRequest';
import { useEffect, useState } from 'react';
import * as ReactLeaflet from 'react-leaflet';

export function LocationMarker({
  setItem,
  setLatLng,
  setMarkerType
}) {
  // useEffect(() => {
  //   if (latLngHere && placeResult) {
  //     setLatLng(latLngHere);
  //     setItem(placeResult);
  //     setMarkerType("reverse");
  //   }

  // }, [latLngHere, placeResult]);
  // const [position, setPosition] = useState(null)
  const map = ReactLeaflet.useMapEvents({
    click(e) {
      console.log("event: ", e)
      // console.log("placeResult: ", placeResult);
      // console.log("location click", e);
      // console.log("locate: ", map.locate());
      setLatLng([e.latlng.lat, e.latlng.lng]);
      setMarkerType("reverse");
      // setLatLngHere([e.latlng.lat, e.latlng.lng])
      // map.locate();
    },
    locationfound(e) {
      // console.log("location.found", e)
      // setPosition(e.latlng);
      // map.flyTo(e.latlng, map.getZoom());
    },
  })

  return null;
  // return position === null ? null : (
  //   <Marker position={position}>
  //     <Popup>You are here</Popup>
  //   </Marker>
  // )
}