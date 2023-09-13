import Container from '@components/Container';

const FullScreen = ({ isFullScreen, chidren }) => {
  return isFullScreen
    ? <Container>{chidren}</Container>
    : chidren;
};

export default FullScreen;