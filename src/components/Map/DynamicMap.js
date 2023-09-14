import { useEffect, useState } from 'react';
import Leaflet from 'leaflet';
import * as ReactLeaflet from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// import { usePosition } from 'src/hooks/usePosition';

import styles from './Map.module.scss';

const { MapContainer } = ReactLeaflet;

function ChangeView({ center, zoom }) {
  const map = ReactLeaflet.useMap();
  map?.setView(center, zoom);

  return null;
}

function ChangeLocationView() {
  const [position, setPosition] = useState(null);
  const [bbox, setBbox] = useState([]);

  const positionIcon = L.icon({
    // iconUrl: "https://img.icons8.com/ultraviolet/40/center-direction.png",
    iconUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAADwUlEQVR4nO1ZS08TURSemCiuNRrURGWnuHTTEgmKG9cK7gyBe1vxUX8AU6j+A0LUP2DcGIUA9w66AnmIJgV5GSNtIvgLxPaesuqY04mmc2c6M52ZlpL0JGfTmTn3fPe8TxWlSU1qTGp7mdPLWTls1NYEUGeik4U2ysUgZeI1ZbAqWwB/Kz3jYvD+TOGi0giUSulHKIO7hIkFykSRctD/sQVA2TN8l3AxTxj0oowDUX6AFW5QJr6ZFPMKwMybMQ266qZ436x+nDB47qBQtQB0wyIwltD0lpoqf2987yRhsFxZEVglDEbIdOG6DMCwGKRKsVDhe8LFEnn/+0Qtld+yuz3K4V18av+S1zRK2P5lwmG8kkuFDgJNa3fzhImfMQYdfutAXINrhItdO0uE6k6EwwubQ+b7tT+ngsoe/JA7TZlYtMqHsTCzTVFWPswbSmh6iwUEE8XA2cnI8+ZUiW4Txs3bWoKLHfNZsBGoTmCRstxKBZ8Pg+g0dFqCWhM9vgWWKqz5Rt4qNSbKYEKy+Jz/3qbc95koyqnSjm5tJ1oiGTURzaqfo9lkHjmSTS5HMsOP27dSx9y+79f222WrDzC4UDUAookHUlZYcfsm8mPoXCSjrkWzSd2OI1l1teN76qybHMphzexK+VjVAIzO0eQ+Ix5uvqLyZbziZgnCxVMzAPHKBwBzycd06vR+NDv0xIPyBmfUR45n80K3FMxpT0rL1bMS2wLIJL94BYAxEfb5gQVEsmrOOwA1d6gBRLPqXsMBiBpp06sFPtUEQJAgxjzv2QLbww+dZA1ohZu+gtgpjeIw4vQ+pkbM8x7cJ301HT/qeDYXz4KnUdwwmAvZV7dvsEg5g1DTnTtDZ9zkEAYbwQuZ3Epw0LHMu32HlsA8j36OgW1wcgndxu3mkehM7orcSsSn4Lzih7Dvl6wwrtSYKIMpyX1mfQvDvY3c3uIYqNSIYhp0yefFuLgTbKDhsClNY7s4fIS+rmH5VsrELylxrAdefJVuRYoFHP/CHCn7cNfExZJl2zENnaEcgAO2zTplMQxL9LF8q0V5o/sdVUJdq9gcUpphK9ySl+oZM6xrdhtjClvofaO7Dj9VES6b5Hgo89UJOcU6AcBUSThM2snCGlCz7RwKtrfEf14zhpFCt3U3ij2+eIaBWel7wsRCzZQ3uxOMWQI76HKXwWjobuNE6L/Wku8DAIP10LKNrzqhiR7Kxceq/+BgYo4wcfvA/uCQCVcflIk4do7Y/toASBvP8jHfvU09ydcQ0kjUBNCkJil1ob9yFsJi1JypFQAAAABJRU5ErkJggg==",
    iconSize: [30, 30],
    popupAnchor: [-3, -76],
  });

  const map = ReactLeaflet.useMap();
  
  function flyToPosition(value) {
    map.flyTo(value, map.getZoom());
  }

  function onLocationFound(e) {
    if (position !== null && e?.latlng?.[0] === position?.[0] && e?.latlng?.[1] === position?.[1]) {
      return;
    } else {
      setPosition(e.latlng);
      flyToPosition(e.latlng);

      const radius = e.accuracy
      const marker = L.marker(e.latlng, {icon: positionIcon})
      const circle = L.circle(e.latlng, radius, {
        opacity: 0.1,
        fillOpacity: 0.1,
      });
      circle.addTo(map);
      marker.addTo(map);
      setBbox(e.bounds.toBBoxString().split(","));
    }
  }

  useEffect(() => {
    const location = map.locate();
    location.on("locationfound", onLocationFound);
    return () => location.off("locationfound", onLocationFound);
  }, [map]);

  return null;
}

const Map = ({
  children,
  className,
  width,
  height,
  currentPosition,
  center,
  zoom = 12,
  ...rest
}) => {
  // const userPosition = usePosition();
  // console.log("position: ", userPosition);
  // if (userPosition && !userPosition.error) {
  //   userPosition.latitude && userPosition.longitude
  // }

  let mapClassName = styles.map;

  if ( className ) {
    mapClassName = `${mapClassName} ${className}`;
  }

  useEffect(() => {
    (async function init() {
      delete Leaflet.Icon.Default.prototype._getIconUrl;
      Leaflet.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://img.icons8.com/color/32/visit.png',
        // iconUrl: 'leaflet/images/marker-icon.png',
        iconUrl: 'https://img.icons8.com/color/48/visit.png',
        shadowUrl: 'leaflet/images/marker-shadow.png',
        iconSize: [40, 40],
        shadowSize: [40, 40],
        shadowAnchor: [7, 44]
        // popupAnchor: [-3, -76],
      });
    })();
  }, []);

  return (
    <MapContainer className={mapClassName} {...rest}>
      <ChangeView center={center} zoom={zoom} />
      <ChangeLocationView />
      {children(ReactLeaflet, Leaflet)}
    </MapContainer>
  )
}

export default Map;
