import { useEffect, useState } from 'react';

import Leaflet, { marker } from 'leaflet';
import * as ReactLeaflet from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import SearchInput from '@components/SearchInput';
// import SearchTypeChanger from '@components/SearchTypeChanger';
// import { changerList } from './constants';

import { ChangeLocationView } from './Components/ChangeLocationView';
import { MapBoundsAndZoomTracker } from "./Components/MapBoundsAndZoomTracker"
import { CommonMapComponent } from "./Components/CommonMapComponent"
import { CommonMapButton } from './Components/CommonMapButton';

import styles from './Map.module.scss';

const API_KEY = "TRw4XUxuBB8uJnI9VAtJ";
const { MapContainer } = ReactLeaflet;

function ChangeView({ center, zoom }) {
  const map = ReactLeaflet.useMap();
  map?.setView(center, zoom);

  return null;
}

//** поиск */
function SearchedPosition() {
  const map = ReactLeaflet.useMap();
  const [latLng, setLatLng] = useState(null);
  const [item, setItem] = useState(null);
  const [layerPanel, setLayerPanel] = useState();

  const togleLayerPanelOnClick = () => {
    setLayerPanel(layer => !layer);
  }

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
      <ReactLeaflet.TileLayer
        crossOrigin
        // tileSize={512}
        // zoomOffset={-1}
        minZoom={1}
        // url={`https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=${API_KEY}`}
        // url={`https://api.maptiler.com/maps/topo-v2/{z}/{x}/{y}.png?key=${API_KEY}`}
        // url={`https://api.maptiler.com/maps/satellite/{z}/{x}/{y}.png?key=${API_KEY}`}
        url={`https://api.maptiler.com/maps/basic-v2/{z}/{x}/{y}.png?key=${API_KEY}`}

        // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution={"\u003ca href=\"https://www.maptiler.com/copyright/\" target=\"_blank\"\u003e\u0026copy; MapTiler\u003c/a\u003e \u003ca href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e"}
        // attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
      />
      <div className={styles.mapPanel} style={{ position: "absolute", zIndex: 1000, top: "10px", left: "60px" }}>
        <CommonMapComponent map={map}>
          <SearchInput
            setLatLng={setLatLng}
            setItem={setItem}
          />
        </CommonMapComponent>
      </div>
      <CommonMapButton
        onClick={togleLayerPanelOnClick}
        absolute map={map}
        className={"layers"}
        style={{ right: 9, top: 60, zIndex: 1000 }}
      />
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
