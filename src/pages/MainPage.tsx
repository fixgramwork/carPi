import styled from 'styled-components';
import arrowIcon from '../assests/arrow.svg';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  position: relative;
  min-height: calc(100vh - 60px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const GlassCard = styled.div`
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  border-radius: 30px;
  padding: 3rem;
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.18);
  text-align: center;
  max-width: 600px;
  width: 90%;
  z-index: 2;
`;

const SloganText = styled.div`
  font-size: 3.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #007AFF, #00C6FF);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1.5rem;
`;

const Description = styled.div`
  font-size: 1.4rem;
  color: #666;
  margin-bottom: 3rem;
  font-weight: 500;
`;

const StartButton = styled.button`
  background: linear-gradient(135deg, #007AFF, #00C6FF);
  color: white;
  border: none;
  padding: 1rem 2.5rem;
  border-radius: 20px;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin: 0 auto;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 122, 255, 0.2);
  }

  img {
    width: 20px;
    height: 20px;
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: translateX(5px);
  }
`;

const FloatingShapes = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  z-index: 1;

  &::before, &::after {
    content: '';
    position: absolute;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    opacity: 0.2;
  }

  &::before {
    background: linear-gradient(45deg, #007AFF, #00C6FF);
    top: -100px;
    right: -100px;
  }

  &::after {
    background: linear-gradient(45deg, #00C6FF, #007AFF);
    bottom: -100px;
    left: -100px;
  }
`;

function MainPage() {
    const navigate = useNavigate();

    return (
        <Container>
            <FloatingShapes />
            <GlassCard>
                <SloganText>
                    All in CarPi
                </SloganText>
                <Description>Life Better, Nice Wrist.</Description>
                <StartButton onClick={() => navigate('/Camera')}>
                    기능 메뉴로 가기
                    <img src={arrowIcon} alt="화살표" />
                </StartButton>
            </GlassCard>
        </Container>
    );
}

export default MainPage;
