import mediapipe as mp
import cv2
import math

mp_hands = mp.solutions.hands
hands = mp_hands.Hands(min_detection_confidence=0.7, min_tracking_confidence=0.7)
mp_drawing = mp.solutions.drawing_utils

def calculate_angle(a, b, c):
    # 벡터 (a, b), (b, c)를 계산하여 각도를 구합니다.
    ab = [a[0] - b[0], a[1] - b[1]]
    bc = [c[0] - b[0], c[1] - b[1]]

    dot_product = ab[0] * bc[0] + ab[1] * bc[1]
    magnitude_ab = math.sqrt(ab[0]**2 + ab[1]**2)
    magnitude_bc = math.sqrt(bc[0]**2 + bc[1]**2)

    cos_angle = dot_product / (magnitude_ab * magnitude_bc)
    angle = math.acos(cos_angle)
    return math.degrees(angle)

cap = cv2.VideoCapture(0)

while True:
    ret, frame = cap.read()
    if not ret:
        break

    frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    results = hands.process(frame_rgb)

    if results.multi_hand_landmarks:
        landmarks = results.multi_hand_landmarks[0]

        # 손목(WRIST), 1번 손가락 기저부(BASE), 2번 손가락 기저부(BASE) 인덱스를 사용하여 각도 계산
        wrist = landmarks.landmark[mp_hands.HandLandmark.WRIST]
        thumb_base = landmarks.landmark[mp_hands.HandLandmark.THUMB_CMC]
        index_base = landmarks.landmark[mp_hands.HandLandmark.INDEX_FINGER_MCP]

        angle = calculate_angle(
            (wrist.x, wrist.y),
            (thumb_base.x, thumb_base.y),
            (index_base.x, index_base.y)
        )

        cv2.putText(frame, f'Angle: {int(angle)}', (50, 50),
                    cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 0, 0), 2)

        # 각도 기준으로 손목 터널 증후군 판단 (예시: 150도 이상이혹은 65도 이하이면 위험 출력)
        if angle > 140 or angle < 80:
            cv2.putText(frame, "Risk: Carpal Tunnel Syndrome",
                        (50, 100), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)
        else:
            cv2.putText(frame, "Risk: NICE", (50, 100),
                        cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)

        mp_drawing.draw_landmarks(frame, landmarks, mp_hands.HAND_CONNECTIONS)

    cv2.imshow("Hand Tracking", frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
