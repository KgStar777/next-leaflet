import clsx from "clsx";
import { useAsuncRequest } from "@hooks/useAsuncRequest";
import { useEffect, useMemo } from "react";
import * as ReactLeaflet from "react-leaflet";
import Leaflet from "leaflet";

import "leaflet/dist/leaflet.css";


const celsiusSrc = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAC0UlEQVR4nO2aW4iNURTHfzNjMC5Dk0u5lBIlRa6l5IiS0qQ0Lo80D8rDPPCETCmJSJEkhge3GM2DF7zIi7yMS2liKONNyHUwqTkc7Vpf/X2dOXM80Hz7rF/t5uu/1j7ttc8+e61v9gbHcRzHcZz/x3igFXgEfLP2ENhntqhZCbwDCgO0t0COSFkC9Emwn4BbwG17TvTgs5jIqAG6JMjzQL3YRwMnxf7E+kTDWgkufOtVRXyqbDUkfmuIiCMS2IISfovE7zARcVkCqy3hN1z8Qp9oaJfABiPxC32inoBJQLe18FxxE7BBtPBccROwUbTwnOATgK8A/CeA7wH4JkhEtHsWwNNgwesAvBAqyL7glSBeCuPvAvjLEP42yJ+vw722Ks5RoZXgeuAMMIMKnYAoaf+LCWgEzgKzieg88IsFmi9jAj7L0dkqMs7C1HnghTIm4JLoX+0zMskooEeCaQOGlTEB4UzwuNheAHVkkFYJ4pqcB4a/m4BOsXfaJKjPVbHvIWPUAm9s8B+ByfLt6hJPt4tAtflOsL5Bfz3IkdqQY7UEdUz0vaL3A/es9Yu+W/yPip7L6vLPmVYnVV5v6hLEUtvwCpYFRpq+Qj4nTF5maJOBTzQtJ9qBIn0Oin25aQ2inSZDXJGB10uJm2jNRfo0iz0UQ4ERA6TQIc8pGfg00+anskKa62KfZ9p00U6QIXbIwJtMq7acnuhhyU+xdkj0bkmHTaJvJ0PMlYHfSN0VypdIg/nU3aAOsc0hYzywgf8Clom+RXZ8bSEzbE5lhp9mu08GaZTgeiQbYDdCdlnhE9rOlD0UQc+l/zoySocE8QyYVUafmXZPMIp7AuOAxxJMn9UASWZQpgL7pVgq2B3iMWScBuBu6vce9oWnwE3bJLtMU587MV2errHf+fsSGSBpH4CW2K7KJowFttre8Ar4AXwHXlpxtM3+j+A4juM4jsO/5jcBcKAo6zWbKAAAAABJRU5ErkJggg==";
const windSrc = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAABJklEQVR4nO2WQWoCMRiFPxcVpfUKbffdWvAA2lN4Fq2XsD2H0n3L4KYnEKug9ASKCwWhJfCEMEzQTCZDoX4QhvmZ5JG8ZF7gwh+gDgyABbAH5sCz6lH5AH4y2iS2+BSYAW3gWs+lxPsZ398Dr8BKK/Std1P34krNpi3hr1T9Cdg6VmgDdAikocF2qfqn6m/Ag6xoAiPV18BdiHBHAxkLbFpAF6hk9DmKv+QRrEr06HHPo++j+hjvnSQOn+xmvqkVYM9ZwgdtqJ6nqD3jJSUzlvCwDLGqZjq2dvVtqMe+ba3zTxnCB+3i4amZ/l+SwOXNHZ1JQR5Hj870EToVnVFxRWd0zvo3h5J1WXBFZ5TrkRG7CYhOb94Lik5v6jq3c13w8kbnBaLxC8kCrq0WRAYzAAAAAElFTkSuQmCC";
const humiditySrc = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAACXBIWXMAAAsTAAALEwEAmpwYAAAE70lEQVR4nO1cX2iWVRj/+WfVxlY0FGtuGDQNAm11IQRWi2bShWxlU++6EKPcwkq6sU3rIou0kV54oaESXXTjXLDWMPHPPmYOFCQrUi90GzLBgeac+G1zyoHfgYfxbb3fn/c9z/t95wcvvN/53vc5v/12nnPO85xzPsDDw8PDw8OjsFHNyyMDlAL4i5e590gTPwN4wMvch42EqG+mKxb4mGT/42XuN4dcZ94I+DKAJIBJAO8CqOf9OIBXHPKKhYALAFwj0Z2i/DuWDQGocMRNvYCzARwjydMAisR3cwGc4ncnAcxxwE+9gNtJ8Po0rUy2zs8d8FMt4KsAJni9NsNztXzG9IcrIuCVamBRh3kABknuiwDPf8lnBwCUF7qAswB0kFhPwL7N9JUn+E4nbUQBlQI2k9RNAIvSeK8SwDDf/QAFKuASAKMk9XYG76/hu3ciipdVCTgXwBkS2p+FnQNi2jOnkARsIZkrAMqysPM4gKu0tTWisM45XgIwBuA+pyXZopa2TPj3IvJcwEcB/EkiJjzLFdpo8x8AxQgHKgT8OqQ/tJg2H7COvBRwGV3XRBLLQ7C/nLbHWFdeCTibI6UhsDvEevawjr4QRmWnAjaz8sEsR93/Q5kIC5vyJZSrFFllkxwNGw0im70wHwQ8wooPx7xOJwI25LA1uG71kQtYLKIE0wdGjY9EtPNYHAVsYYXnHaXgzch/LodhXqQCPg1ghBW+Dnd4gxxuA3gqTqHcD6zMdOau8Qu57IuLgIu5ZjHOe9d4TvDJJm8YmYA/sSLTCrXA5g1/1C7g84xHk2mm6MPGM+Q0QY5qBTzESvZCH/aS20GtAlbwv3xfSd83FYtF4rVCYyj3jVhq1IpOctyhTcBHxDLjyinf9ZIIFJS/SY43yDkdhCrgOzT+d4qF7gQXzaGgfJbIXJs4XY2AHRFtgswFPiHXdi0ClonBo0Kh204trxSDSakGAd8Si9sa3TZVuV3UXwUFody3NPwV4oMd5GxmDs4FPClGNtfuGbT8BjkfR3CEJuAlGr6gxD2DlF8g54tQIKDN+4W1IyAMFJOz4e5cwCQNlyh324T4XELO96BAQBuBVCl32x7xuUr0285Ducs0XIP4oIacTf/tXMDfxCEYDe4ZpHyInH9FcIQm4Pc0nFTinkHKbb9ttsU5F3A9DXchPugm50YNAi7gYcBRsYDdq9BtE2IKc5ec50NJNqZvyn80odBtbfm6FLG782XNJho3A0pc3PdDTQKW87zGZIrdob0K3NbiBXIcyeCYWOhrIm3TbClLKHBbi/YUZ5FVrcrZuLgO+lCX4T6ZSNeFP2Ml44rc1paPk9unyAyRCFgktpT1p/jelTv3k9NZHjNTvcW3WuwObYV7bCOXWwCejcse6XruQ5lkwO7KbS+JX/xYjewQqYAGG0neni6P2m0HWLfhsAHZI3IBDd4TnbfZbPkEwkep+NUj4wXv58iuEwGtO9s+cTQCtx0VfV62bqtCQDuw2NHZtsalyJ3bLhVnQ+xom4sBI7JQLugUZ4uYbJu+6SgTEHI9JShK+O7voq+9zXleOlOV2AhoYaKAXUJI69pdnPYkmJR4kqIX8b6bra6Vz94V748wPDOptYJBObM4f4gWlM41yZTUJgpc0JgPYC0TEqZ1/cvVviSvYZZ18aR7Y5rJUA8PDw8PDw8PDwTCQ4Wf6pd4Hbx4AAAAAElFTkSuQmCC";

Leaflet.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://img.icons8.com/color/32/visit.png',
  iconUrl: 'https://img.icons8.com/color/48/visit.png',
  shadowUrl: 'leaflet/images/marker-shadow.png',
  iconSize: [40, 40],
  shadowSize: [40, 40],
  shadowAnchor: [7, 44]
});

function getIconByWeather({
  cloud,
  isDay,
  humidity,
  precipitation
}) {
  const timeIcon = isDay ? "w-by-time-sun" : "w-by-time-moon";
  return clsx("w-icon", cloud < 65 && timeIcon, cloud > 25 && "w-cloud");
}

export function useMainMarker({
  latLng, item, markerType
}) {
  const map = ReactLeaflet.useMap();

  const getWeather = (latLng) => `/api/weather?q=${latLng?.[0]},${latLng?.[1]}`;
  const getPlaceDetails = (item) => {
    return `/api/place-details?q=${item?.properties.place_id}`;
  }
  const getReverse = (latLng) => {
    return `/api/reverse?lat=${latLng?.[0]}&lon=${latLng?.[1]}`;
  }

  const getCurrentRequestOptsByType = () => {
    if (markerType === "reverse") {
      return latLng;
    }
    if (markerType === "places-detail") {
      return item;
    }
    return;
  };

  const getCurrentRequestByType = () => {
    if (markerType === "reverse") {
      return getReverse;
    }
    if (markerType === "places-detail") {
      return getPlaceDetails;
    }
    return;
  };

  const { result: wResult, error: wError, loading: wLoading } = useAsuncRequest({
    getUrl: getWeather, params: latLng
  });

  const { result, error, loading } = useAsuncRequest({
    getUrl: getCurrentRequestByType(), params: getCurrentRequestOptsByType()
  });

  console.log("markerType", markerType);
  console.log("getCurrentRequestByType()", getCurrentRequestByType());

  // const { result: reverseResult, error: reverseErr, loading: reverseLoader } = useAsuncRequest({
  //   getUrl: getReverse, params: latLng
  // });

  console.log("Result", result);
  console.log("wResult", wResult);

  const onMarkerClick = () => {
    // setMessage(item);
    return;
  }

  console.log("item for onMarkerClick", item);

  //** Устанавливаем новую ключевую точку */
  useEffect(() => {
    if (latLng && (wResult || result)) {
      // console.log("pr", placeResult);
      // console.log("r", result);

      const iconClass = getIconByWeather({
        cloud: wResult.current?.cloud,
        humidity: wResult.current?.humidity,
        localTime: wResult.current?.is_day,
        precipitation: wResult.current?.precip_in
      });

      const marker = new Leaflet.marker(latLng)
      .on("click", onMarkerClick)
      .bindPopup(`
        <div class="popup-box">
          <div class="weather-container">
            <div class="${iconClass}"></div>
            <div class="indicators">
              <span class="datetime">${new Date(wResult.location?.localtime).toDateString()}</span>
              <div class="temperature-content">
                <img src=${celsiusSrc} />
                <span class="temperature">
                  ${wResult.current?.temp_c}&#8451;
                </span>
              </div>
            </div>
            <div class="wheater-params">
              <div class="wheater-params-content">
                <img src="${windSrc}" />
                <span>
                ${wResult.current?.wind_mph}m/h
                </span>
              </div>
              <div class="wheater-params-content">
                <img src="${humiditySrc}" />
                <span>
                ${wResult.current?.humidity}%
                </span>
              </div>
            </div>
          </div>
          <h2>${result?.features?.[0].properties?.city}, ${result?.features?.[0].properties?.state}, ${result?.features?.[0].properties?.country}</h2>
        </div>
      `);
      marker.addTo(map);
      map.setView(latLng, map.getZoom());

      return () => marker.off("click", onMarkerClick).removeFrom(map);
    }
  }, [latLng, wResult, result])
}

{/* <p>Температура: ${result.current?.temp_c}С</p>
<p>Ощущается как: ${result.current?.feelslike_c}%</p>
<p>Облачность: ${result.current?.cloud}</p>
<p>Влажность: ${result.current?.humidity}%</p>
<p>Ветер: ${result.current?.wind_mph}м/с</p> */}