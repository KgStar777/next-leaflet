import Head from 'next/head';

import Layout from '@components/Layout';
import Section from '@components/Section';
import Container from '@components/Container';
import Map from '@components/Map';
// import Button from '@components/Button';
import SearchInput from '@components/SearchInput';

import styles from '@styles/Home.module.scss';

const DEFAULT_CENTER = [38.907132, -77.036546];

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Next.js Leaflet Starter</title>
        <meta name="description" content="Create mapping apps with Next.js Leaflet Starter" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Section>
        <Container>
          <div style={{ position: "relative" }}>
            <div className={styles.mapPanel} style={{ position: "absolute", zIndex: 1000, top: "9px", left: "60px" }}>
              <SearchInput />
            </div>
            <button
              title='Развернуть карту'
              className={styles.panelButton}>🖵
            </button>

            <Map className={styles.homeMap} width="800" height="400" center={DEFAULT_CENTER} zoom={12}>
              {({ TileLayer, Marker, Popup }) => (
                <>
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                  />
                  <Marker position={DEFAULT_CENTER}>
                    <Popup>
                      A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                  </Marker>
                </>
              )}
            </Map>
          </div>
        </Container>
      </Section>
    </Layout>
  )
}
