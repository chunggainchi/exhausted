export interface CVPoint {
  x: number;
  y: number;
}

export interface Mat {
  rows: number;
  cols: number;
  data: any;
  data32F: Float32Array;
  delete: () => void;
  copyTo: (dest: Mat) => void;
  roi: (rect: any) => Mat;
}

export interface VideoCapture {
  read: (mat: Mat) => void;
}

export interface OpenCV {
  Mat: any;
  VideoCapture: any;
  Size: any;
  TermCriteria: any;
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
    winSize: any,
    maxLevel: number,
    criteria: any
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