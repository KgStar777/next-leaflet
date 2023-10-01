// import { useState } from "react";

import { mapMaxBounds, DEFAULT_CENTER } from './constants';
import Map from '@components/Map'; 

import "@maptiler/sdk/dist/maptiler-sdk.css";
import styles from "@styles/Home.module.scss";

const MapComponent = () => {
  return (
      <div className={styles.panelWrapper} style={{ position: "relative" }}>
        <Map
          className={styles.homeMap}
          width="100%"
          height="100vh"
          center={DEFAULT_CENTER}
          maxBounds={mapMaxBounds}
          maxBoundsViscosity={0.95}
          maxZoom={17}
          minZoom={2}
          zoom={5}>
          {({ TileLayer, Marker, Popup }) => {
            return (
            <>
            </>
          )}}
        </Map>
      </div>
  )
}

export default MapComponent;