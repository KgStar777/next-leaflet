import dynamic from 'next/dynamic';

const DynamicMap = dynamic(() => import('./DynamicMap'), {
  ssr: false
});

// const DEFAULT_WIDTH = 600;
// const DEFAULT_HEIGHT = 600;

const Map = (props) => {
  // const { width = DEFAULT_WIDTH, height = DEFAULT_HEIGHT } = props;
  return (
    // <div style={{ aspectRatio: width / height }}>
    <div style={{ width: "100%", height: "500px" }}>
      <DynamicMap {...props} />
    </div>
  )
}

export default Map;