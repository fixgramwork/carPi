import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface RiskData {
  time: string;
  risk: number;
}

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: #f2f2f7;
  padding: 2rem;
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  color: #1c1c1e;
  font-size: 2rem;
  text-align: center;
  margin-bottom: 2rem;
`;

const RiskStatusSection = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const RiskCircle = styled.div<{ color: string }>`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: ${props => props.color};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 1.5rem auto;
  color: white;
  opacity: 0.9;

  span {
    font-size: 2.5rem;
    font-weight: bold;
  }

  p {
    font-size: 1.2rem;
    margin-top: 0.5rem;
  }
`;

const GraphSection = styled.div`
  margin-bottom: 3rem;
`;

const GraphTitle = styled.h3`
  color: #1c1c1e;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const RiskHistory = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  height: 200px;
  padding: 1rem;
  background: #f2f2f7;
  border-radius: 15px;
`;

const RiskItem = styled.div<{ height: string; color: string }>`
  position: relative;
  width: 30px;
  height: ${props => props.height};
  background-color: ${props => props.color};
  border-radius: 5px;
  transition: all 0.3s ease;

  &:hover .risk-tooltip {
    opacity: 1;
  }
`;

const RiskTooltip = styled.span`
  position: absolute;
  top: -40px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 0.5rem;
  border-radius: 8px;
  font-size: 0.8rem;
  opacity: 0;
  transition: opacity 0.2s;
  white-space: nowrap;
`;

const TimeLabel = styled.span`
  position: absolute;
  bottom: -25px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.8rem;
  color: #8e8e93;
`;

const RestartButton = styled.button`
  width: 100%;
  padding: 1rem;
  background: #007AFF;
  color: white;
  border: none;
  border-radius: 15px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #0056b3;
    transform: translateY(-2px);
  }
`;

const ResultPage = () => {
  const [riskLevel, setRiskLevel] = useState<number | null>(null);
  const [riskHistory, setRiskHistory] = useState<RiskData[]>([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const analysisResult = location.state?.analysisResult;
    if (analysisResult) {
      setRiskHistory(analysisResult.riskHistory);
      // 마지막 위험도를 현재 위험도로 설정
      const lastRisk = analysisResult.riskHistory[analysisResult.riskHistory.length - 1];
      setRiskLevel(lastRisk.risk);
    }
  }, [location.state]);

  const getRiskStatus = (risk: number) => {
    if (risk < 30) return { text: '안전', color: '#4CAF50' };
    if (risk < 70) return { text: '주의', color: '#FFC107' };
    return { text: '위험', color: '#FF5252' };
  };

  return (
    <PageContainer>
      <Container>
        <Title>손목 터널 증후군 위험도 분석</Title>
        
        <RiskStatusSection>
          <GraphTitle>현재 위험도</GraphTitle>
          <RiskCircle color={getRiskStatus(riskLevel || 0).color}>
            <span>{riskLevel}%</span>
            <p>{getRiskStatus(riskLevel || 0).text}</p>
          </RiskCircle>
        </RiskStatusSection>

        <GraphSection>
          <GraphTitle>시간별 위험도 변화</GraphTitle>
          <RiskHistory>
            {riskHistory.map((data, index) => (
              <RiskItem 
                key={index}
                height={`${data.risk}%`}
                color={getRiskStatus(data.risk).color}
              >
                <RiskTooltip>
                  {data.time}<br/>{data.risk}%
                </RiskTooltip>
                <TimeLabel>{data.time}</TimeLabel>
              </RiskItem>
            ))}
          </RiskHistory>
        </GraphSection>

        <RestartButton onClick={() => navigate('/Camera')}>
          다시 측정하기
        </RestartButton>
      </Container>
    </PageContainer>
  );
};

export default ResultPage;
