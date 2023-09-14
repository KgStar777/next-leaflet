import dynamic from 'next/dynamic';

const DEFAULT_WIDTH = 600;
const DEFAULT_HEIGHT = 600;

const DynamicMap = dynamic(() => import('./DynamicMap'), {
  ssr: false
});

const Map = (props) => {
  const { width = DEFAULT_WIDTH, height = DEFAULT_HEIGHT } = props;
  return (
    <div style={{ width, height }}>
      <DynamicMap {...props} />
    </div>
  )
}

export default Map;