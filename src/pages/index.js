import Head from 'next/head';

import Layout from '@components/Layout';
import Section from '@components/Section';
// import Button from '@components/Button';
import MapComponent from '@components/Map/MapComponent';

// import styles from '@styles/Home.module.scss';

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Next.js Leaflet Starter</title>
        <meta name="description" content="Create mapping apps with Next.js Leaflet Starter" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Section>
        <MapComponent />
      </Section>
    </Layout>
  )
}
