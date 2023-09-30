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
function MapPanel({
  layerPanel,
  setLayerPanel
}) {
  const map = ReactLeaflet.useMap();
  const [latLng, setLatLng] = useState(null);
  const [item, setItem] = useState(null);
  const [layerPanelChanger, setLayerPanelChanger] = useState(false);

  const togleLayerPanelOnClick = () => {
    setLayerPanelChanger(layer => !layer);
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
        absolute
        map={map}
        className={"layers"}
        style={{ right: 9, top: 60, zIndex: 1000 }}
      />

      {
        layerPanelChanger && (
          <div style={{position: "absolute", right: 0, height: "100vh", width: "400px", zIndex: 2000, background: "white"}}>
            <CommonMapComponent map={map}>
              <div onClick={() => setLayerPanelChanger(false)}>
                <img width={30} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABN0lEQVR4nO3ZTWrDMBCG4fcoXfQkLZTuK83CSc6eRc8QAk0hJWBDMTFxJM1oLPRBdsYzj34S2YGenp6e1vIKhIr1w9hDVl6AI/ALHLCPABfgOwczIa7jxxojI2Kqn4yJY/PXGWaHfnYLtW89FRkVi5kRrZqWGNGuZYExGzDNQuZLWBQK1tiHxQtXQ5RsoDqiRCNuEDkNuUOkNOYW8UyD7hFrGt0M4tFhr9bhMyv3Rn8zM7EWsylEMxBpYWkNLWx2aeHrNy40uv93jXtMXIFwj4lPINxiYgLCHSZkINxgQgFEdUxYKJzzm2COCQoIc0xQRJhhAvBjdMQQLczXAuJ2ptKKlMbcW06XnFf7BZ40h5SbfQBnw5mYZz4zJ+A99WYTxhoxx2QhpnxW/jN0AN4q1u/p6emhfP4AxlR3VfJGRpkAAAAASUVORK5CYII="/>
                <button onClick={() => {
                  setLayerPanel("topo-v2")
                }}>1</button>
                <button onClick={() => {
                  setLayerPanel("basic-v2")
                }}>2</button>
                <button onClick={() => {
                  setLayerPanel("streets-v2")
                }}>3</button>
                <button onClick={() => {
                  setLayerPanel("ocean")
                }}>3</button>
              </div>
            </CommonMapComponent>
          </div>
        )
      }
      <CommonMapComponent map={map}>
        <MapBoundsAndZoomTracker position={latLng}  />
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

  const [layerPanel, setLayerPanel] = useState("basic-v2");

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
      <ReactLeaflet.TileLayer
        crossOrigin
        minZoom={1}
        // url={`https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=${API_KEY}`}
        // url={`https://api.maptiler.com/maps/topo-v2/{z}/{x}/{y}.png?key=${API_KEY}`}
        // url={`https://api.maptiler.com/maps/satellite/{z}/{x}/{y}.png?key=${API_KEY}`}
        url={`https://api.maptiler.com/maps/${layerPanel}/{z}/{x}/{y}.png?key=${API_KEY}`}

        // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution={"\u003ca href=\"https://www.maptiler.com/copyright/\" target=\"_blank\"\u003e\u0026copy; MapTiler\u003c/a\u003e \u003ca href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e"}
        // attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
      />
      {/* кнопка позиции и определение местоположения при инициализации */}
      <ChangeLocationView />

      <MapPanel layerPanel={layerPanel} setLayerPanel={setLayerPanel} />
      <ChangeView center={center} zoom={zoom} />
      {children(ReactLeaflet, Leaflet)}
    </MapContainer>
  )
}

export default Map;
