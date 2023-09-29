import { useEffect, useState } from 'react';

import Leaflet, { marker } from 'leaflet';
import * as ReactLeaflet from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import SearchInput from '@components/SearchInput';
// import SearchTypeChanger from '@components/SearchTypeChanger';
import { changerList } from './constants';

import styles from './Map.module.scss';
import { ChangeLocationView } from './Components/ChangeLocationView';
import { MapBoundsAndZoomTracker } from "./Components/MapBoundsAndZoomTracker"
import { CommonMapComponent } from "./Components/CommonMapComponent"


const { MapContainer } = ReactLeaflet;

function ChangeView({ center, zoom }) {
  const map = ReactLeaflet.useMap();
  map?.setView(center, zoom);

  return null;
}

//** поиск */
function SearchedPosition() {
  const map = ReactLeaflet.useMap();
  const [ latLng, setLatLng ] = useState(null);
  const [ item, setItem ] = useState(null);
  const [bounds, setBounds] = useState();
  const [zoom, setZoom] = useState();

  console.log(latLng);
  console.log(item);

  // ** Клик по маркеру */
  const onMarkerClick = () => {

  };

  //** Устанавливаем новую ключевую точку */
  useEffect(() => {
    if (latLng) {
      const marker = L.marker(latLng).on("click", onMarkerClick);
      marker.addTo(map);
      map.setView(latLng, map.getZoom());

      return () => marker.off("click", onMarkerClick).removeFrom(map);
    }
  }, [latLng])

  return (
    <>
      <div className={styles.mapPanel} style={{ position: "absolute", zIndex: 1000, top: "10px", left: "60px" }}>
        <CommonMapComponent map={map}>
          <SearchInput
            setLatLng={setLatLng}
            setItem={setItem}
          />
        </CommonMapComponent>
      </div>
      {/* <MapBoundsAndZoomTracker position={latLng} /> */}
      <CommonMapComponent map={map}>
        <MapBoundsAndZoomTracker />
      </CommonMapComponent>
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
      {/* кнопка позиции и определение местоположения при инициализации */}
      <ChangeLocationView />

      <SearchedPosition />
      <ChangeView center={center} zoom={zoom} />
      {children(ReactLeaflet, Leaflet)}
    </MapContainer>
  )
}

export default Map;
