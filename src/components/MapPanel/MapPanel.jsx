import { useEffect, useState } from 'react';

import * as ReactLeaflet from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import SearchInput from '@components/SearchInput';
// import SearchTypeChanger from '@components/SearchTypeChanger';
// import { changerList } from './constants';

// import { MapBoundsAndZoomTracker } from "@components/MapBoundsAndZoomTracker"
import { CommonMapComponent } from "@components/CommonMapComponent"
import { CommonMapButton } from '@components/CommonMapButton';

export function MapPanel({
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
      {layerPanelChanger && (
        <div style={{position: "absolute", right: 0, height: "100vh", width: "400px", zIndex: 2000, background: "white"}}>
          <CommonMapComponent map={map}>
            <div onClick={() => setLayerPanelChanger(false)}>
              <img width={30} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABN0lEQVR4nO3ZTWrDMBCG4fcoXfQkLZTuK83CSc6eRc8QAk0hJWBDMTFxJM1oLPRBdsYzj34S2YGenp6e1vIKhIr1w9hDVl6AI/ALHLCPABfgOwczIa7jxxojI2Kqn4yJY/PXGWaHfnYLtW89FRkVi5kRrZqWGNGuZYExGzDNQuZLWBQK1tiHxQtXQ5RsoDqiRCNuEDkNuUOkNOYW8UyD7hFrGt0M4tFhr9bhMyv3Rn8zM7EWsylEMxBpYWkNLWx2aeHrNy40uv93jXtMXIFwj4lPINxiYgLCHSZkINxgQgFEdUxYKJzzm2COCQoIc0xQRJhhAvBjdMQQLczXAuJ2ptKKlMbcW06XnFf7BZ40h5SbfQBnw5mYZz4zJ+A99WYTxhoxx2QhpnxW/jN0AN4q1u/p6emhfP4AxlR3VfJGRpkAAAAASUVORK5CYII="/>
              <button onClick={() => {
                setLayerPanel("topo-v2")
              }}>
              </button>
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
      )}

      <CommonMapComponent map={map}>
        <MapBoundsAndZoomTracker position={latLng}  />
      </CommonMapComponent>
    </>
  )
}