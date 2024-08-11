import cv2
import mediapipe as mp

mp_face_detection = mp.solutions.face_detection
mp_drawing = mp.solutions.drawing_utils

cap = cv2.VideoCapture(0)

def detect_objects():
    with mp_face_detection.FaceDetection(min_detection_confidence=0.2) as face_detection:
        while cap.isOpened():
            success, image = cap.read()
            if not success:
                print("Ignoring empty camera frame.")
                continue

            image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
            results = face_detection.process(image_rgb)

            if results.detections:
                for detection in results.detections:
                    bboxC = detection.location_data.relative_bounding_box
                    h, w, _ = image.shape
                    bbox = int(bboxC.xmin * w), int(bboxC.ymin * h), int(bboxC.width * w), int(bboxC.height * h)
                    cv2.rectangle(image, bbox, (255, 0, 0), 2)  

                    if detection.score
  <button className="select-none no-underline">
  <a className="" href="" target="_blank">
        <span className="relative -top-[0rem] inline-flex">
          <span className="h-[1rem] min-w-[1rem] items-center justify-center rounded-full  text-center px-1 text-xs font-mono bg-muted text-[0.60rem] text-muted-foreground">
            0
          </span>
        </span>
      </a>
    </button> > 0.5:   
                        print("Device Detected!")

            cv2.imshow('Object Detection', image)

            if cv2.waitKey(5) & 0xFF == 27:  # Press 'Esc' to exit
                break

    cap.release()
    cv2.destroyAllWindows()

if __name__ == '__main__':
    detect_objects()