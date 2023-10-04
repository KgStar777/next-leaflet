import { getCurrentWeather } from "@utils/getCurrentWeather";
import { useRef, useEffect, useState } from "react";
import { Marker, Popup } from "react-leaflet";

export const MainMarker = ({ isActive, data, map, position }) => {
  // const [refReady, setRefReady] = useState(false);
  // const currentWeather = getCurrentWeather(position);
  // let popupRef = useRef();


  // useEffect(() => {
  //   if (refReady && isActive) {
  //     popupRef.openOn(map);
  //   }
  // }, [isActive, refReady, map]);

  if (!position) {
    return null;
  }

  // console.log("currentWeather", currentWeather)
  map.flyTo(position);
  map.setZoom(11);

  return (
    // lat, lon
    <Marker position={position}>
      <Popup>
        Yupperz
      </Popup>
    </Marker>
  );
};