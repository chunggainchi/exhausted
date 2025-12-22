export interface Point {
  x: number;
  y: number;
}

export interface WordConfig {
  word: string;
  image?: string; // Placeholder for future use
}

export enum GameState {
  IDLE = 'IDLE', // Waiting for start
  WAITING_FOR_INPUT = 'WAITING_FOR_INPUT',
  MOVING_TO_PRINTER = 'MOVING_TO_PRINTER',
  GRABBING = 'GRABBING',
  MOVING_TO_WAGON = 'MOVING_TO_WAGON',
  DROPPING = 'DROPPING',
  RETURNING = 'RETURNING',
  COMPLETED_WORD = 'COMPLETED_WORD', // Train driving away
}

export interface ArmConfig {
  shoulder: Point;
  l1: number; // Upper arm length
  l2: number; // Forearm length
  wristLength: number; // Distance from wrist joint to claw tip
}

export interface IKResult {
  theta1: number; // Shoulder angle (Degrees)
  theta2: number; // Elbow angle (Degrees)
  reachable: boolean;
}