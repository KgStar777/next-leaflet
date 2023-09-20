import { useEffect, useState } from 'react';

import Leaflet, { marker } from 'leaflet';
import * as ReactLeaflet from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import SearchInput from '@components/SearchInput';
import SearchTypeChanger from '@components/SearchTypeChanger';
import { changerList } from './constants';

import styles from './Map.module.scss';
import { ChangeLocationView } from './Components/ChangeLocationView';

const { MapContainer } = ReactLeaflet;

function ChangeView({ center, zoom }) {
  const map = ReactLeaflet.useMap();
  map?.setView(center, zoom);

  return null;
}

//** следующий */
function SearchMoreInfo({ position }) {
  const searchEndPoint = (queryParams) => `/api/search-result?q=${queryParams}`;
  const map = ReactLeaflet.useMap();
  const [result, setResult] = useState();
  console.log("result: ", result?.data?.[0]);
  console.log("position: ", position);
  console.log("position: ", position);

  useEffect(() => {
    const controller = new AbortController();
    if (position) {
      fetch(
        searchEndPoint([position[0], position[1]]),
        { signal: controller.signal }
      )
      .then(response => response.json())
      .then(data => {
        setResult(data);
        // setActive(true); // надо не
      })
      .catch(error => {
        if (error.name === "AbortError") {
          console.log("API failure");
        } else {
          console.log("Some other error");
        }
        setResult([]);
      })
    }
    return () => controller.abort();
  }, [position]);

  useEffect(() => {
    if (!result) {
      return;
    } else {
      // console.log("result: ", result)
      result.data.forEach(item => {
        const marker = L.marker([item.latitude, item.longitude]);
        marker.addTo(map);
      });
      // return () => marker
    } 
  }, [result]);



  return null;
}

function SearchedPosition() {
  const map = ReactLeaflet.useMap();
  const [ latLng, setLatLng ] = useState(null);
  const [ item, setItem ] = useState(null);
  const [searchType, setSearchType] = useState(changerList[3]);

  console.log(latLng);
  console.log(item);

  const onMarkerClick = () => {
    const searchEndPoint = (queryParams) => `/api/reverse?q=${queryParams}`;
    console.log("item: ", item);
    // const controller = new AbortController();
    fetch(
      searchEndPoint(`${item.geo_lat}-${item.geo_lon}`),
      // { signal: controller.signal }
    )
    .then(response => response.json())
    .then(data => {
      // setResult(data);
      console.log("data: ", data);
    })
    .catch(error => {
      if (error.name === "AbortError") {
        console.log("API failure");
      } else {
        console.log("Some other error");
      }
      // setResult([]);
    })
    // return () => controller.abort();
  };

  useEffect(() => {
    if (latLng) {
      const marker = L.marker(latLng).on("click", onMarkerClick);
      marker.addTo(map);
      map.flyTo(latLng, map.getZoom());

      return () => marker.removeFrom(map);
      // return () => marker.off("click", onMarkerClick).removeFrom(map);
    }
  }, [latLng])

  return (
    <>
      <div className={styles.mapPanel} style={{ position: "absolute", zIndex: 1000, top: "10px", left: "60px" }}>
        <SearchInput searchType={searchType} setLatLng={setLatLng} setItem={setItem} />
      </div>
      <div className={styles.panel}>
        <SearchTypeChanger list={changerList} onChange={setSearchType} searchType={searchType} />
      </div>
      <SearchMoreInfo position={latLng} />
    </>
  )
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
  let mapClassName = styles.map;

  if ( className ) {
    mapClassName = `${mapClassName} ${className}`;
  }

  useEffect(() => {
    (async function init() {
      delete Leaflet.Icon.Default.prototype._getIconUrl;
      Leaflet.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://img.icons8.com/color/32/visit.png',
        iconUrl: 'https://img.icons8.com/color/48/visit.png',
        shadowUrl: 'leaflet/images/marker-shadow.png',
        iconSize: [40, 40],
        shadowSize: [40, 40],
        shadowAnchor: [7, 44]
      });
    })();
  }, []);

  return (
    <MapContainer className={mapClassName} {...rest}>
      <SearchedPosition />
      <ChangeView center={center} zoom={zoom} />
      <ChangeLocationView />
      {children(ReactLeaflet, Leaflet)}
    </MapContainer>
  )
}

export default Map;
