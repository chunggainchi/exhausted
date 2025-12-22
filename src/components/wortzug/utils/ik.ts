import { ArmConfig, IKResult, Point } from '../types';

/**
 * Solves 2D Inverse Kinematics for a 2-joint arm.
 * Adapts coordinates from SVG (Y-Down) to Math (Y-Up).
 * Returns angles in DEGREES suitable for SVG transforms.
 */
export const solveIK = (target: Point, config: ArmConfig): IKResult => {
  // 1. Convert SVG coords to Robot-Local coords
  // SVG Origin is top-left. Robot shoulder is at (config.shoulder.x, config.shoulder.y).
  // In Math frame: Shoulder is (0,0). X is Right, Y is UP.
  
  const dx = target.x - config.shoulder.x;
  let dy = config.shoulder.y - target.y; // Invert Y so Up is positive

  // 2. Adjust for Wrist Length
  // We want the CLAW TIP to be at `target`. 
  // The IK solves for the WRIST JOINT position.
  // Since the hand is always vertical (pointing down), the wrist joint is 
  // exactly `wristLength` ABOVE the target.
  dy += config.wristLength;

  // 3. Distance from shoulder to wrist center
  let dist = Math.sqrt(dx * dx + dy * dy);
  const totalArmLen = config.l1 + config.l2;
  
  // 4. Clamp Reach (Prevent NaN if target is too far)
  let reachable = true;
  if (dist > totalArmLen) {
      dist = totalArmLen - 0.001; // Tiny offset to avoid straight-line singularities
      reachable = false;
  }

  // 5. Law of Cosines
  // c^2 = a^2 + b^2 - 2ab cos(C)
  // Triangle sides: a=L1, b=L2, c=dist
  const a = config.l1;
  const b = config.l2;
  const c = dist;

  const alpha = Math.acos((a*a + c*c - b*b) / (2*a*c)); // Angle of shoulder relative to target vector
  const beta = Math.acos((a*a + b*b - c*c) / (2*a*b));  // Internal Angle at elbow

  const baseAngle = Math.atan2(dy, dx); // Angle of vector to target
  
  const theta1 = baseAngle - alpha; // Shoulder angle (radians)
  const theta2 = Math.PI - beta;    // Elbow angle relative to L1 (radians)

  // 6. Convert to Degrees and SVG rotation Frame
  // In our SVG, we draw the arm pointing STRAIGHT UP (Negative Y) when rotation is 0.
  // Math 90deg (Up) = SVG 0deg.
  // Math 0deg (Right) = SVG 90deg.
  // Formula: SVG_Angle = 90 - Math_Degrees
  
  const deg1 = 90 - (theta1 * 180 / Math.PI);
  
  // Elbow angle `theta2` is the deviation from the straight line.
  // If straight, theta2 = 0.
  // In SVG, the forearm is a child of the upper arm. 
  // We just rotate it by -(theta2 converted to degrees).
  const deg2 = -(theta2 * 180 / Math.PI);

  return {
    theta1: deg1,
    theta2: deg2,
    reachable
  };
};
