# 🖱️ CarPi - 손목 터널 증후군 예방 서비스

## 📌 프로젝트 소개
CarPi는 웹캠을 통해 사용자의 손목 움직임을 분석하여 손목 터널 증후군의 위험도를 실시간으로 측정하는 웹 서비스입니다.

## 🌟 주요 기능
- 웹캠을 통한 실시간 손목 움직임 감지
- 5분 동안의 손목 움직임 분석
- 시간별 위험도 그래프 제공
- 위험도에 따른 실시간 피드백

## 👥 팀원
- 조하민 (Frontend Developer)
  - Frontend: React, TypeScript 개발
  - UI/UX 디자인 및 구현

- 김민재 (Backend & AI Developer)
  - Backend: Flask, Nest.js 서버 구축
  - AI/ML: 
    - MediaPipe를 활용한 손목 랜드마크 추출
    - OpenCV 기반 실시간 이미지 처리
    - NumPy를 활용한 각도 계산 알고리즘 구현
    - 위험도 분석 모델 개발

## 📝️ 기술 스택
### Frontend
- React
- TypeScript
- Vite
- React Router DOM

### Backend
- Flask
- Nest.js
- Python
- Platform
- OS

### AI/ML
- OpenCV
  - 실시간 이미지 프로세싱
  - 프레임 캡처 및 전처리
  - 이미지 필터링 및 변환
- MediaPipe
  - 손목 관절 랜드마크 추출
  - 실시간 포즈 추적
  - 3D 좌표 매핑
- NumPy
  - 행렬 연산
  - 각도 계산
  - 데이터 정규화

## ⚙️ 설치 및 실행 방법
1. 저장소 클론
```bash
git clone https://github.com/Hxmxx/NetworkProject.git
cd NetworkProject
```

2. 의존성 설치
```bash
# Frontend
npm install

# Backend
pip install -r requirements.txt
```

3. 개발 서버 실행
```bash
# Frontend
npm run dev

# Backend
python app.py
```

## 📝 라이선스
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details