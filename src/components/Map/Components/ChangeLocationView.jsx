import { useEffect, useState } from 'react';

import * as ReactLeaflet from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import styles from "./ChangeLocationView.module.scss";

//** поиск текущего местоположения (если нет доступа к получению местоположения, то по IP(доделать)) */
export function ChangeLocationView() {
  const [position, setPosition] = useState(null);
  const [radius, setRadius] = useState(null);
  const [bbox, setBbox] = useState([]);

  const positionIcon = L.icon({
    iconUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAADwUlEQVR4nO1ZS08TURSemCiuNRrURGWnuHTTEgmKG9cK7gyBe1vxUX8AU6j+A0LUP2DcGIUA9w66AnmIJgV5GSNtIvgLxPaesuqY04mmc2c6M52ZlpL0JGfTmTn3fPe8TxWlSU1qTGp7mdPLWTls1NYEUGeik4U2ysUgZeI1ZbAqWwB/Kz3jYvD+TOGi0giUSulHKIO7hIkFykSRctD/sQVA2TN8l3AxTxj0oowDUX6AFW5QJr6ZFPMKwMybMQ266qZ436x+nDB47qBQtQB0wyIwltD0lpoqf2987yRhsFxZEVglDEbIdOG6DMCwGKRKsVDhe8LFEnn/+0Qtld+yuz3K4V18av+S1zRK2P5lwmG8kkuFDgJNa3fzhImfMQYdfutAXINrhItdO0uE6k6EwwubQ+b7tT+ngsoe/JA7TZlYtMqHsTCzTVFWPswbSmh6iwUEE8XA2cnI8+ZUiW4Txs3bWoKLHfNZsBGoTmCRstxKBZ8Pg+g0dFqCWhM9vgWWKqz5Rt4qNSbKYEKy+Jz/3qbc95koyqnSjm5tJ1oiGTURzaqfo9lkHjmSTS5HMsOP27dSx9y+79f222WrDzC4UDUAookHUlZYcfsm8mPoXCSjrkWzSd2OI1l1teN76qybHMphzexK+VjVAIzO0eQ+Ix5uvqLyZbziZgnCxVMzAPHKBwBzycd06vR+NDv0xIPyBmfUR45n80K3FMxpT0rL1bMS2wLIJL94BYAxEfb5gQVEsmrOOwA1d6gBRLPqXsMBiBpp06sFPtUEQJAgxjzv2QLbww+dZA1ohZu+gtgpjeIw4vQ+pkbM8x7cJ301HT/qeDYXz4KnUdwwmAvZV7dvsEg5g1DTnTtDZ9zkEAYbwQuZ3Epw0LHMu32HlsA8j36OgW1wcgndxu3mkehM7orcSsSn4Lzih7Dvl6wwrtSYKIMpyX1mfQvDvY3c3uIYqNSIYhp0yefFuLgTbKDhsClNY7s4fIS+rmH5VsrELylxrAdefJVuRYoFHP/CHCn7cNfExZJl2zENnaEcgAO2zTplMQxL9LF8q0V5o/sdVUJdq9gcUpphK9ySl+oZM6xrdhtjClvofaO7Dj9VES6b5Hgo89UJOcU6AcBUSThM2snCGlCz7RwKtrfEf14zhpFCt3U3ij2+eIaBWel7wsRCzZQ3uxOMWQI76HKXwWjobuNE6L/Wku8DAIP10LKNrzqhiR7Kxceq/+BgYo4wcfvA/uCQCVcflIk4do7Y/toASBvP8jHfvU09ydcQ0kjUBNCkJil1ob9yFsJi1JypFQAAAABJRU5ErkJggg==",
    iconSize: [30, 30],
    popupAnchor: [-3, -76],
  });

  const map = ReactLeaflet.useMap();
  
  // const searchEndPoint = (queryParams) => `/api/mypos?q=${queryParams}`;
  async function flyToPosition() {
    if (!position) {
      console.warn("Для отображения текущего местоположения разрешите доступ к геопозиции");
      // await fetch(
      //   searchEndPoint(),
      // )
      // .then(response => response.json())
      // .then(data => {
      //   console.log("data", data);
      //   // setActive(true); // надо не
      // })
      // .catch(error => {
      //   if (error.name === "AbortError") {
      //     console.log("API failure");
      //   } else {
      //     console.log("Some other error");
      //   }
      // });
    } else {
      const marker = L.marker(position, { icon: positionIcon })
      const circle = L.circle(position, radius, {
        opacity: 0.1,
        fillOpacity: 0.1,
      });
  
      circle.addTo(map);
      marker.addTo(map);
      map.flyTo(position, map.getZoom());
    }
  }

  function onLocationFound(e) {
    if (position !== null && e?.latlng?.[0] === position?.[0] && e?.latlng?.[1] === position?.[1]) {
      return;
    } else {
      setPosition(e.latlng);
      setRadius(e.accuracy);
      setBbox(e.bounds.toBBoxString().split(","));
    }
  }

  useEffect(() => {
    const location = map.locate();
    location.on("locationfound", onLocationFound);
    // request.connection.remoteAddress
    // return () => location.off("locationfound", onLocationFound);
  }, []);

  return (
    <>
    <button className={styles.button} onClick={flyToPosition}
      style={{ position: "absolute", zIndex: 1000, top: 12, right: 9 }}>
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAD/ElEQVR4nO2az29VRRTHPwi2z2CsfaVAWEniRmuExB2sQUCKtLsCmpho6kZsyo+dyJJfG0hIWMiGf8CIIQ0QICRARH7Jwh9oWWm7MEDYUGoALznxe5PJ87775s6d+1pNv8kkfZ0zZ+bMnDnznTMX5vD/RR3YDBwETgG/AA+Av1Ts759VZzLvA93MEtSAD4AzwDMgKVieAqeBbUDnTBjwErADmHQGNQ2cB77QyryhGX9RpVv/s7o9wAW1SdtPAKOanLbgPeCuM4BrwMdAV4CuV4FPgOuOvnFgPRXCZuqY0+ENYG1E/euAW47+o1WszlIN3Dp4BHwGzI/dCf/o/ByYclZ7SSzly7XciaLOW1SPt4E76vM3jaEUeh2F3wOLaB+6gUvq+668Igg1x52uAAtpPxYC3zluFrRnjjnuZIfdTKHH8QoLAIVDbLqx27EnfPbMlMZk0c37sEvPCYtOswUjzub3crGdzjlRRYjNwgvAJmB/jswC4AeNzYzKRaeoggmvoXp0AB8CP6rPTS3kN0hustWqbHMiRJUwOrPbmTQrP2ll8jDPiaRb8gTPSsi4UxWwU3qvKH0jE/7IU8ew5MeaCdRFq6cDCWAejPUe170ki85PFKDx3dLzpNk4B6T0XEQD3gFOaILy7iW7Cuq9qHb9WZWHVGn3iRgRKKUXrcrDAA/Yq7YHsipPeUYO3wjkW/YF9DWgtiezKn9Vpflz2QjkW2w/LgswpE/tLS/wL9xXZT1CBPItXxGGRWr/Z1ZlGlHMRfLwOnAYeFzCACt/A28GGtLprGhhQ3wjkG/5OtCIloYUdS1fNDNkVckLX9LMtUI3eytkGWGhuQz68jZ7Gn4tA1i1IaEhPsVgXvhND0RLnsVEoxE+5LDUgbhZlZYtrNIQX3LoQ1E2NiNjKWm0DGAshJLDZqg7pPGVZkKn1aGlMaswpCg5zMKn0mV7uim2SshysbFQhhxmXaxuSt8QObBl/0OC7xIHZchhIzZK1+8+Ljoq4ZuRkg9lyGFj8uG29G3HAzUn12sJ5bJIdDssi1HpulMkYKxXoyklx8rgWQS2sNIhqYWfMo46M2Bpy1B8Qzn0KilnYzkSoqCmtFCiRHJoEns14XgZuKoxXC1zBvWKmKXPCva7XagDl9X3eIwHn+XO0pqbraB6rHT6NFb+WizFSxw3m1Lu1cJhbCxQdHrsuNPi2J3UnACQKKEc6/V1np4ybjv6j1T99r7OWfZEudjhwK8Y6uJOKe1I5EoxX4tbrs6IQ2cSMVKj118q79SnsN2h0qNHo0HJXGxIoRrt2D5TX0B0Kis+FpiUeCIWOzRTBmShS7lYu7V9q7fHe85HNfd0Ozwpmf68+8Qc+I/jOS1nuPxo2bI8AAAAAElFTkSuQmCC"/>
    </button>
    {/* <button onClick={() => {
      console.log("bb on click", map?.getBounds())
    }}
      style={{position: "absolute", zIndex: 1000, top: 12, right: 9 }}>
        my fdddddddddddddddddddddddd
    </button> */}
    </>
  );
}