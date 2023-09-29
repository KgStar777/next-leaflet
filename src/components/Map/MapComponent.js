// import Container from '@components/Container';
import Map from '@components/Map';

import { mapMaxBounds, DEFAULT_CENTER } from './constants';

// import * as maptilersdk from '@maptiler/sdk';

import "@maptiler/sdk/dist/maptiler-sdk.css";
import styles from "@styles/Home.module.scss";
// import "./MarkerCluster.Default.css";

const MapComponent = () => {
  return (
    // <Container>
      <div className={styles.panelWrapper} style={{ position: "relative" }}>
        <Map
          className={styles.homeMap}
          // currentPosition={latLng}
          width="100%"
          height="100vh"
          center={DEFAULT_CENTER}
          maxBounds={mapMaxBounds}
          // maxBoundsViscosity={0.95}
          // maxZoom={17}
          zoom={8}>
          {({ TileLayer, Marker, Popup }) => {
            return (
            <>
              {/* <TileLayer
                crossOrigin
                // tileSize={512}
                // zoomOffset={-1}
                // minZoom={1}
                url={`https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=${API_KEY}`}
                // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
              /> */}
            </>
          )}}
        </Map>
      </div>
    // </Container>
  )
}

export default MapComponent;