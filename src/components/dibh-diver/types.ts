export interface CVPoint {
  x: number;
  y: number;
}

export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface TermCriteria {
  type: number;
  maxCount: number;
  epsilon: number;
}

export interface Mat {
  rows: number;
  cols: number;
  data: Uint8Array;
  data32F: Float32Array;
  delete: () => void;
  copyTo: (dest: Mat) => void;
  roi: (rect: Rect) => Mat;
}

export interface VideoCapture {
  read: (mat: Mat) => void;
}

export interface OpenCV {
  Mat: new (rows?: number, cols?: number, type?: number) => Mat;
  VideoCapture: new (videoSource: HTMLVideoElement | string) => VideoCapture;
  Size: new (width: number, height: number) => Size;
  TermCriteria: new (type: number, count: number, epsilon: number) => TermCriteria;
  CV_8UC1: number;
  CV_8UC4: number;
  CV_32FC2: number;
  COLOR_RGBA2GRAY: number;
  TERM_CRITERIA_EPS: number;
  TERM_CRITERIA_COUNT: number;
  calcOpticalFlowPyrLK: (
    prevImg: Mat,
    nextImg: Mat,
    prevPts: Mat,
    nextPts: Mat,
    status: Mat,
    err: Mat,
    winSize: Size,
    maxLevel: number,
    criteria: TermCriteria
  ) => void;
  cvtColor: (src: Mat, dst: Mat, code: number) => void;
}

declare global {
  interface Window {
    cv: OpenCV;
  }
}

export enum AppStatus {
  LOADING_CV = 'LOADING_CV',
  READY = 'READY',
  TRACKING = 'TRACKING',
  LOST = 'LOST',
}