import { useState } from 'react';

// import Container from '@components/Container';
import Map from '@components/Map';

import { mapMaxBounds, DEFAULT_CENTER } from './constants';

import styles from '@styles/Home.module.scss';

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
          maxBoundsViscosity={0.95}
          maxZoom={17}
          zoom={8}>
          {({ TileLayer, Marker, Popup }) => {
            return (
            <>
              {/* <ChangeView center={latLng ? latLng : DEFAULT_CENTER} /> */}
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
              />
              {/* <Marker
                position={latLng ? latLng : DEFAULT_CENTER}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker> */}
            </>
          )}}
        </Map>
      </div>
    // </Container>
  )
}

export default MapComponent;