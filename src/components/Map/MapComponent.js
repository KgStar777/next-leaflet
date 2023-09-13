import { useState } from 'react';

import Container from '@components/Container';
import Map from '@components/Map';
import SearchInput from '@components/SearchInput';

import styles from '@styles/Home.module.scss';

// import { useMap } from 'react-leaflet';
// import { LatLng, LatLngBounds } from 'leaflet';


// const DEFAULT_CENTER = new LatLng([38.907132, -77.036546]);
const DEFAULT_CENTER = [38.907132, -77.036546];
const mapMaxBounds = [[-175, -180], [175, 255]];
// const mapMaxBounds = new LatLngBounds(new LatLng(-175, -180), new LatLng(175, 255));
const MapComponent = () => {
  const [ latLng, setLatLng ] = useState(null);
  // const [isFullScreen, setIsFullScreen] = useState();

  console.log("latLng: ", latLng);

  return (
    <Container>
      <div style={{ position: "relative" }}>
        <div className={styles.mapPanel} style={{ position: "absolute", zIndex: 1000, top: "10px", left: "60px" }}>
          <SearchInput setLatLng={setLatLng} />
        </div>
        {/* <button
          title='Развернуть карту'
          className={styles.panelButton}>🖵
        </button> */}

        <Map
          className={styles.homeMap}
          currentPosition={latLng}
          width="800"
          height="400"
          center={latLng ? latLng : DEFAULT_CENTER}
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
              {/* <Marker position={DEFAULT_CENTER}> */}
              <Marker position={latLng ? latLng : DEFAULT_CENTER}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
            </>
          )}}
        </Map>
      </div>
    </Container>
  )
}

export default MapComponent;