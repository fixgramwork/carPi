import styled from 'styled-components';
import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRandomQuote } from '../utils/randomQuote';

const Container = styled.div`
  min-height: calc(100vh - 60px);
  padding: 2rem;
  position: relative;
`;

const GlassCard = styled.div`
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  border-radius: 30px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.18);
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  z-index: 2;
`;

const CameraSection = styled.div<{ isRecording: boolean }>`
  position: relative;
  background: #000;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  border: ${props => props.isRecording ? '4px solid #FF3B30' : 'none'};
  aspect-ratio: 16/9;
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const InfoSection = styled.div`
  background: rgba(255, 255, 255, 0.8);
  border-radius: 20px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const TimerDisplay = styled.div`
  font-size: 3.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #007AFF, #00C6FF);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
`;

const QuoteContainer = styled.div`
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 15px;
  font-style: italic;
  color: #666;
  text-align: center;
  margin: 1rem 0;
`;

const ActionButton = styled.button<{ isRecording?: boolean }>`
  background: ${props => props.isRecording ? 
    'linear-gradient(135deg, #FF3B30, #FF9500)' : 
    'linear-gradient(135deg, #007AFF, #00C6FF)'};
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 15px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const CompletionOverlay = styled.div<{ show: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  z-index: 1000;
  display: ${props => props.show ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
`;

const CompletionCard = styled.div`
  background: white;
  padding: 3rem;
  border-radius: 30px;
  text-align: center;
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.15);

  h2 {
    font-size: 2rem;
    margin-bottom: 2rem;
    background: linear-gradient(135deg, #007AFF, #00C6FF);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const CameraPage = () => {
  const navigate = useNavigate();
  const [randomQuote, setRandomQuote] = useState<{text: string}>({ text: '기본 명언' });
  const [time, setTime] = useState<number>(300); // 5분 = 300초
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);

  if (time <= 0) {
      document.querySelector('.timer-set')?.setAttribute('style', 'display: block');
  }

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleStartTimer = () => {
    setIsRunning(true);
    // 녹화 시작
    if (videoRef.current?.srcObject) {
      const mediaRecorder = new MediaRecorder(videoRef.current.srcObject as MediaStream);
      mediaRecorderRef.current = mediaRecorder;
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setRecordedChunks((prev) => [...prev, event.data]);
        }
      };

      mediaRecorder.start();
    }

    timerRef.current = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 1) {
          handleStopTimer();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  const handleStopTimer = () => {
    // 녹화 중지
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }

    // 기존 타이머 중지 코드
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setIsRunning(false);
    setTime(300);
  };

  useEffect(() => {
    // 녹화가 완료되고 시간이 0이 되었을 때
    if (time === 0 && recordedChunks.length > 0) {
      const handleVideoUpload = async () => {
        try {
          const blob = new Blob(recordedChunks, {
            type: 'video/webm'
          });
          
          const formData = new FormData();
          formData.append('video', blob, 'recorded-video.webm');

          const uploadResponse = await fetch('Camera/record', {
            method: 'POST',
            body: formData,
          });

          if (!uploadResponse.ok) {
            throw new Error('영상 분석 중 오류가 발생했습니다.');
          }

          const result = await uploadResponse.json();
          
          navigate('/Result', { 
            state: { analysisResult: result }
          });

        } catch (error) {
          console.error('영상 업로드 오류:', error);
          alert('영상 분석 중 오류가 발생했습니다.');
        }
      };

      handleVideoUpload();
    }
  }, [time, recordedChunks, navigate]);

  // 컴포넌트 언마운트 시 메모리 정리
  useEffect(() => {
    return () => {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop();
      }
      setRecordedChunks([]);
    };
  }, []);

  useEffect(() => {
    setRandomQuote(getRandomQuote());
    const quoteInterval = setInterval(() => {
      setRandomQuote(getRandomQuote());
    }, 10000);
    return () => clearInterval(quoteInterval);
  }, []);

  useEffect(() => {
    // 웹캠 시작 함수
    const startWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: true,
          audio: false 
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error('웹캠 접근 오류:', err);
      }
    };

    startWebcam();

    // 컴포넌트 언마운트 시 웹캠 정지
    return () => {
      if (videoRef.current?.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <Container>
      <CompletionOverlay show={time <= 0}>
        <CompletionCard>
          <h2>검사가 종료되었습니다!</h2>
          <ActionButton onClick={() => navigate('/Result')}>
            결과 보기
          </ActionButton>
        </CompletionCard>
      </CompletionOverlay>

      <GlassCard>
        <CameraSection isRecording={isRunning}>
          <Video
            ref={videoRef}
            autoPlay
            playsInline
            muted
          />
        </CameraSection>

        <InfoSection>
          <TimerDisplay>{formatTime(time)}</TimerDisplay>
          <QuoteContainer>
            {randomQuote?.text || '명언을 불러오는 중...'}
          </QuoteContainer>
          {isRunning ? (
            <ActionButton isRecording onClick={handleStopTimer}>
              촬영 중지
            </ActionButton>
          ) : (
            <ActionButton onClick={handleStartTimer}>
              촬영 시작
            </ActionButton>
          )}
        </InfoSection>
      </GlassCard>
    </Container>
  );
};

export default CameraPage;
