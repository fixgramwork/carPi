import './ResultPage.css';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface RiskData {
  time: string;  // 시간 정보 (예: "00:30")
  risk: number;  // 위험도
}

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
    <div className='result-page'>
      <div className="result-container">
        <h1>손목 터널 증후군 위험도 분석</h1>
        
        <div className="risk-status-container">
          <div className="risk-status">
            <h3>현재 위험도</h3>
            <div 
              className="risk-circle"
              style={{ 
                backgroundColor: getRiskStatus(riskLevel || 0).color,
                opacity: 0.8
              }}
            >
              <span>{riskLevel}%</span>
              <p>{getRiskStatus(riskLevel || 0).text}</p>
            </div>
          </div>
        </div>

        <div className="graph-container">
          <h3>시간별 위험도 변화</h3>
          <div className="risk-history">
            {riskHistory.map((data, index) => (
              <div 
                key={index} 
                className="risk-item" 
                style={{
                  height: `${data.risk}%`,
                  backgroundColor: getRiskStatus(data.risk).color
                }}
              >
                <span className="risk-tooltip">
                  {data.time}<br/>{data.risk}%
                </span>
                <span className="time-label">{data.time}</span>
              </div>
            ))}
          </div>
        </div>

        <button 
          className="restart-button"
          onClick={() => navigate('/Camera')}
        >
          다시 측정하기
        </button>
      </div>
    </div>
  );
};

export default ResultPage;
