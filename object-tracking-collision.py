import numpy as np
import cv2
import main

import time

cap = cv2.VideoCapture(0, cv2.CAP_DSHOW)

cap.set(cv2.CAP_PROP_FRAME_WIDTH, 1280)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 720)

# coordinates = np.array(main.get_segments(), np.int32)
coordinates = [[[534, 500], [536, 578], [607, 594], [623, 494]], [[483, 398], [481, 444], [544, 448], [560, 386]], [[593, 398], [606, 452], [645, 450], [645, 392]], [[393, 458], [397, 514], [514, 522], [479, 456]], [[338, 386], [342, 424], [411, 424], [403, 358]], [[653, 504],
[647, 586], [696, 596], [712, 498]], [[727, 372], [744, 484], [819, 472], [821, 362]]]

coordinates = np.array(coordinates, np.int32)

frameCount = 0

time_before = 0

def do_nothing():
    return

cv2.namedWindow("Output_red")
cv2.namedWindow("Output_green")
cv2.namedWindow("Output_blue")

cv2.createTrackbar("Threshold", "Output_red",0,255,do_nothing)
cv2.setTrackbarPos("Threshold", "Output_red", 25)

cv2.createTrackbar("Threshold", "Output_green",0,255,do_nothing)
cv2.setTrackbarPos("Threshold", "Output_green", 67)

cv2.createTrackbar("Threshold", "Output_blue",0,255,do_nothing)
cv2.setTrackbarPos("Threshold", "Output_blue", 189)

cxArr, cyArr, oldCxArr, oldCyArr = [0,0], [0,0], [0,0], [0,0]



oldCX, oldCY = 0,0

fgbg = cv2.createBackgroundSubtractorKNN(detectShadows=False)

masks = [
    np.zeros((720, 1280), dtype="uint8"),
    np.zeros((720, 1280), dtype="uint8"),
    np.zeros((720, 1280), dtype="uint8"),
    np.zeros((720, 1280), dtype="uint8"),
    np.zeros((720, 1280), dtype="uint8"),
    np.zeros((720, 1280), dtype="uint8"),
    np.zeros((720, 1280), dtype="uint8"),

    ]

inside_kick = False
inside_leftTom = False
inside_rightTom = False
inside_snare = False
inside_hihat = False
inside_cymbal = False
inside_floorTom = False

while cap.isOpened():
    #Capture video frame by frame
    ret, frame = cap.read()

    frame = cv2.flip(frame, 1)

    b,g,r = cv2.split(frame)

    mask_grey = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    if frameCount == 0:
        #firstFrame = mask würden nicht die Pixel kopiert, sondern nur die Referenz. .copy() wichtig
        firstFrame = mask_grey.copy()
        frameCount += 1
        segment_mask = np.zeros(frame.shape[:2], dtype="uint8")


    fgmask = fgbg.apply(frame)
    # cv2.imshow('frame', fgmask)

    # aktuelles frame von hINTERGRUND subtrahieren
    cv2.absdiff(mask_grey, firstFrame, mask_grey)
    ret, mask_grey = cv2.threshold(mask_grey, 42, 255, cv2.THRESH_BINARY_INV)
    # mask_grey = 255 - mask_grey
    # cv2.imshow("test", mask_grey)

    threshold_red = cv2.getTrackbarPos("Threshold", "Output_red")
    threshold_green = cv2.getTrackbarPos("Threshold", "Output_green")
    threshold_blue = cv2.getTrackbarPos("Threshold", "Output_blue")


    lower_boundary_red = 0 - threshold_red
    upper_boundary_red = 0 + threshold_red

    lower_boundary_green = 200 - threshold_green
    upper_boundary_green = 255 + threshold_green

    lower_boundary_blue = 0 - threshold_blue
    upper_boundary_blue = 0 + threshold_blue


    mask_red = cv2.inRange(r,lower_boundary_red,upper_boundary_red)
    mask_green = cv2.inRange(g,lower_boundary_green,upper_boundary_green)
    mask_blue = cv2.inRange(b,lower_boundary_blue,upper_boundary_blue)

    mask = mask_red * mask_blue * mask_green
    new_mask = mask - mask_grey

    ret, thresh = cv2.threshold(new_mask, 1, 255, cv2.THRESH_BINARY)
    contours, hierarchy = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    new_mask = thresh


    
    # M = cv2.moments(new_mask)

    # #x,y coordinaten vom center
    # if M["m00"] != 0:
    #     cX = int(M["m10"] / M["m00"])
    #     cY = int(M["m01"] / M["m00"])
    #     oldCX, oldCY = cX, cY
    # else:
    #     cX, cY = oldCX, oldCY


    # for c in contours:
    #     print(c)
    #     M = cv2.moments(c)

    #     #x,y coordinaten vom center
    #     if M["m00"] != 0:
    #         cX = int(M["m10"] / M["m00"])
    #         cY = int(M["m01"] / M["m00"])
    #         oldCX, oldCY = cX, cY
    #     else:
    #         cX, cY = oldCX, oldCY

    # print(coordinates)

    for i in range(0, len(coordinates)):
            cv2.fillPoly(masks[i], pts = [coordinates[i]], color= (255,255,255))
            cv2.fillPoly(frame, pts= [coordinates[i]], color= (0,0,0))
            cv2.fillPoly(segment_mask, pts= [coordinates[i]], color= (255,255,255))


    cv2.drawContours(frame, contours, -1, (255,255,255), 10, cv2.LINE_AA)

    # cv2.circle(frame, (cX, cY), 10, (255, 255, 255), -1)

    # for i in range(0, len(cxArr)):
        # print((cxArr[i], cyArr[i]))
        # cv2.circle(frame, (cxArr[i], cyArr[i]), 10, (255, 255, 255), -1)

    kick_masked = cv2.bitwise_and(frame, frame, mask=masks[0])
    leftTom_masked = cv2.bitwise_and(frame, frame, mask=masks[1])
    rightTom_masked = cv2.bitwise_and(frame, frame, mask=masks[2])
    snare_masked = cv2.bitwise_and(frame, frame, mask=masks[3])
    hihat_masked = cv2.bitwise_and(frame, frame, mask=masks[4])
    floorTom_masked = cv2.bitwise_and(frame, frame, mask=masks[5])
    cymbal_masked = cv2.bitwise_and(frame, frame, mask=masks[6])
    masked = cv2.bitwise_and(frame, frame, mask=segment_mask)



    if np.count_nonzero(kick_masked[np.amin(coordinates[0]):np.amax(coordinates[0])]) > 0 and inside_kick == False:
        print("IN KICK BEREICH")
        inside_kick = True
    elif np.count_nonzero(kick_masked[np.amin(coordinates[0]):np.amax(coordinates[0])]) <= 1:
        inside_kick = False

    if np.count_nonzero(leftTom_masked[np.amin(coordinates[1]):np.amax(coordinates[1])]) > 0 and inside_leftTom == False:
        print("IN leftTom BEREICH")
        inside_leftTom = True
    elif np.count_nonzero(leftTom_masked[np.amin(coordinates[1]):np.amax(coordinates[1])]) <= 1:
        inside_leftTom = False

    if np.count_nonzero(rightTom_masked[np.amin(coordinates[2]):np.amax(coordinates[2])]) > 0 and inside_rightTom == False :
        print("IN rightTOm BEREICH")
        inside_rightTom = True
    elif np.count_nonzero(rightTom_masked[np.amin(coordinates[2]):np.amax(coordinates[2])]) <= 1:
        inside_rightTom = False

    if np.count_nonzero(snare_masked[np.amin(coordinates[3]):np.amax(coordinates[3])]) > 0 and inside_snare == False:
        print("IN snare BEREICH")
        inside_snare = True
    elif np.count_nonzero(snare_masked[np.amin(coordinates[3]):np.amax(coordinates[3])]) <= 1:
        inside_snare = False

    if np.count_nonzero(hihat_masked[np.amin(coordinates[4]):np.amax(coordinates[4])]) > 0 and inside_hihat == False:
        print("IN hihat BEREICH")
        inside_hihat = True
    elif np.count_nonzero(hihat_masked[np.amin(coordinates[4]):np.amax(coordinates[4])]) <= 1:
        inside_hihat = False

    if np.count_nonzero(floorTom_masked[np.amin(coordinates[5]):np.amax(coordinates[5])]) > 0 and inside_floorTom == False:
        print("IN floortom BEREICH")
        inside_floorTom = True
    elif np.count_nonzero(floorTom_masked[np.amin(coordinates[5]):np.amax(coordinates[5])]) <= 1:
        inside_floorTom = False

    if np.count_nonzero(cymbal_masked[np.amin(coordinates[6]):np.amax(coordinates[6])]) > 0 and inside_cymbal == False:
        print("IN cymbal BEREICH")
        inside_cymbal = True
    elif np.count_nonzero(cymbal_masked[np.amin(coordinates[6]):np.amax(coordinates[6])]) <= 1:
        inside_cymbal = False


    # frame[np.amin(coordinates[6]):np.amax(coordinates[6])] = [255, 255, 255]



    cv2.imshow("masked image", masked)
    cv2.imshow("frame", frame)
    #circle am centerpoint

    # for points in coordinates:
    #     for point in points:
    #         frame[point[1],point[0]] = [255,255,255]

    # for points in coordinates:
    #     print(np.sum(frame[points[0][1]:points[-1][1], points[0][0]:points[-1][0]]))



    #anzeigen des frames
    # cv2.imshow('Output_red', mask_red)
    # cv2.imshow('Output_green', mask_green)
    # cv2.imshow('Output_blue', mask_blue)
    # cv2.imshow("Output_multiplied", mask)
    # cv2.imshow("NEWMASK", new_mask)
    # cv2.imshow("Segment_mask", segment_mask)


    if cv2.waitKey(30) != -1:
        break


cap.release()
cv2.destroyAllWindows()

