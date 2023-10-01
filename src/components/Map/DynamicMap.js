import { useEffect, useState } from 'react';

import Leaflet from 'leaflet';
import * as ReactLeaflet from 'react-leaflet';

import SearchInput from '@components/SearchInput';

import { ChangeLocationView } from './Components/ChangeLocationView';
import { MapBoundsAndZoomTracker } from "./Components/MapBoundsAndZoomTracker"
import { CommonMapComponent } from "./Components/CommonMapComponent";
import { TileLayerComponent } from './Components/TileLayerComponent';

import 'leaflet/dist/leaflet.css';
import styles from './Map.module.scss';

const { MapContainer } = ReactLeaflet;

function ChangeView({ center, zoom }) {
  const map = ReactLeaflet.useMap();
  map?.setView(center, zoom);

  return null;
}

//** поиск */
function MapPanel() {
  const map = ReactLeaflet.useMap();
  const [latLng, setLatLng] = useState(null);
  const [item, setItem] = useState(null);

  const onMarkerClick = () => {
    return;
  }

  console.log("item for onMarkerClick", item);
  console.log("latlng for onMarkerClick", latLng);
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

      {/* <CommonMapButton
        onClick={togleLayerPanelOnClick}
        absolute
        map={map}
        className={"layers"}
        style={{ right: 9, top: 60, zIndex: 1000 }}
      /> */}
      
      <MapBoundsAndZoomTracker position={latLng} />  
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
  zoom,
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

  const [data] = useState(JSON.parse(localStorage.getItem("your-favorite-map")) || "");

  const props = {
    ...rest,
    position: data?.position ?? center,
    zoom: data?.zoom ?? zoom,
  };

  return (
    <MapContainer className={mapClassName} {...props}>
      <TileLayerComponent />
      {/* кнопка позиции и определение местоположения при инициализации */}
      <ChangeLocationView />

      <MapPanel />
      <ChangeView center={data?.position ?? center} zoom={data?.zoom ?? zoom} />
      {children(ReactLeaflet, Leaflet)}
    </MapContainer>
  )
}

export default Map;
