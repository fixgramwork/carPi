import './ResultPage.css';

import { useState, useEffect } from 'react';

const ResultPage = () => {
  const [riskLevel, setRiskLevel] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      fetch('http://10.150.149.49:8000/api/movement', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ x: Math.random() * 200, y: Math.random() * 200 }), // 예시로 임의 데이터
      })
        .then(response => response.json())
        .then(data => {
          setRiskLevel(data.risk_level);
        });
    }, 1000); // 1초마다 서버 요청

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <h1>손목 터널 증후군 위험도</h1>
      <p>현재 위험도: {riskLevel}</p>
    </>
  );
};

export default ResultPage;
