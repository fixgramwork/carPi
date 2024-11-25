import './CameraPage.css';
import { getRandomQuote } from '../utils/randomQuote';
import { useRef, useState, useEffect } from 'react';
import hamster from '../assests/mouse.jpeg';
import { useNavigate } from 'react-router-dom';

const CameraPage = () => {
  const navigate = useNavigate();
  const [randomQuote, setRandomQuote] = useState<{text: string}>({ text: '기본 명언' });
  const [time, setTime] = useState<number>(300); // 5분 = 300초
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [isTimeUp, setIsTimeUp] = useState<boolean>(false);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleStartTimer = () => {
    setIsRunning(true);
    timerRef.current = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 1) {
          handleStopTimer();
          setIsTimeUp(true);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  const handleStopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setIsRunning(false);
    setTime(300);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    setRandomQuote(getRandomQuote());
    const quoteInterval = setInterval(() => {
      setRandomQuote(getRandomQuote());
    }, 10000);
    return () => clearInterval(quoteInterval);
  }, []);

  return (
    <>
      <div className="timer-set" style={{ display: isTimeUp ? 'block' : 'none' }}>
        <div className='timer-set-container'>
          <h2 className='timer-set-title'>검사가 종료되었습니다!</h2>
          <button className='timer-set-btn' onClick={() => navigate('/Result')}>결과 보기</button>
        </div>
      </div>
      <div className='camera-page'>
        <div className='container'>
          <div className='camera-container'>
            <img src={hamster} alt="Camera" />
          </div>
          <div className='text-container'>
            <div className='timer-container'>
              <h4 className='timer-title'>남은 시간</h4>
              <div className='timer-time'>{formatTime(time)}</div>
              <div className='quote-container'>
                <p className='quote-text'>
                  {randomQuote?.text || '명언을 불러오는 중...'}
                </p>
              </div>
              <div 
                className='timer-button' 
                onClick={handleStartTimer}
                style={{ display: isRunning ? 'none' : 'flex' }}
              >
                촬영 시작
              </div>
              <div 
                className='timer-button'
                onClick={handleStopTimer}
                style={{ display: isRunning ? 'flex' : 'none' }}
              >
                촬영 중지
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CameraPage;
