from fastapi import FastAPI
from pydantic import BaseModel
import cv2
import mediapipe as mp
import numpy as np
import math

app = FastAPI()

mp_hands = mp.solutions.hands
mp_pose = mp.solutions.pose

def calculate_angle(a, b, c):
    ab = np.array([b[0] - a[0], b[1] - a[1]])
    bc = np.array([c[0] - b[0], c[1] - b[1]])
    
    dot_product = np.dot(ab, bc)
    magnitude_ab = np.linalg.norm(ab)
    magnitude_bc = np.linalg.norm(bc)
    
    cos_angle = dot_product / (magnitude_ab * magnitude_bc)
    angle = np.arccos(np.clip(cos_angle, -1.0, 1.0))
    return math.degrees(angle)

def check_carpal_tunnel_syndrome(angle):
    if angle < 60 or angle > 160:
        return True
    return False

@app.post("/calculate_angle/")
async def calculate_wrist_angle(image: bytes):
    np_arr = np.frombuffer(image, np.uint8)
    img = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
    
    hands = mp_hands.Hands(min_detection_confidence=0.5, min_tracking_confidence=0.5)
    pose = mp_pose.Pose(min_detection_confidence=0.5, min_tracking_confidence=0.5)
    
    img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    result_hands = hands.process(img_rgb)
    result_pose = pose.process(img_rgb)
    
    if result_pose.pose_landmarks:
        shoulder = result_pose.pose_landmarks.landmark[mp_pose.PoseLandmark.LEFT_SHOULDER]
        elbow = result_pose.pose_landmarks.landmark[mp_pose.PoseLandmark.LEFT_ELBOW]
        wrist = result_pose.pose_landmarks.landmark[mp_pose.PoseLandmark.LEFT_WRIST]
        
        shoulder_coords = (shoulder.x, shoulder.y)
        elbow_coords = (elbow.x, elbow.y)
        wrist_coords = (wrist.x, wrist.y)
        
        angle = calculate_angle(shoulder_coords, elbow_coords, wrist_coords)
        
        is_risky = check_carpal_tunnel_syndrome(angle)
        
        return {"angle": angle, "is_risky": is_risky}

    return {"error": "No pose landmarks detected"}