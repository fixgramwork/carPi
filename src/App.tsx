import styled from 'styled-components';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import MainPage from './pages/MainPage';
import CameraPage from './pages/CameraPage';
import ResultPage from './pages/ResultPage';

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(
    135deg,
    #f6f8ff 0%,
    #e9f0ff 100%
  );
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 100%;
    height: 100%;
    background: radial-gradient(
      circle,
      rgba(124, 177, 255, 0.1) 0%,
      rgba(124, 177, 255, 0) 70%
    );
    transform: rotate(-45deg);
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -50%;
    left: -50%;
    width: 100%;
    height: 100%;
    background: radial-gradient(
      circle,
      rgba(124, 177, 255, 0.1) 0%,
      rgba(124, 177, 255, 0) 70%
    );
    transform: rotate(45deg);
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
  padding-top: 60px; // Header 높이만큼 패딩
`;

function App() {
  return (
    <AppContainer>
      <Header />
      <ContentWrapper>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/camera" element={<CameraPage />} />
          <Route path="/result" element={<ResultPage />} />
        </Routes>
      </ContentWrapper>
    </AppContainer>
  );
}

export default App;
