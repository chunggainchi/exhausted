"use client";
import React, { useMemo, useEffect } from 'react';
import { motion, useSpring, useTransform, useMotionValue } from 'framer-motion';
import { Point } from './types';
import { solveIK } from './utils/ik';
import { ARM_CONFIG, COLORS } from './constants';

interface RoboticArmProps {
  target: Point;
  isGrabbing: boolean;
  heldLetter?: string;
}

export const RoboticArm: React.FC<RoboticArmProps> = ({
  target,
  isGrabbing,
  heldLetter
}) => {
  // 1) Destination angles from IK
  const { theta1: destTheta1, theta2: destTheta2, reachable } = useMemo(
    () => solveIK(target, ARM_CONFIG),
    [target]
  );

  const t1Driver = useMotionValue(destTheta1);
  const t2Driver = useMotionValue(destTheta2);

  useEffect(() => {
    t1Driver.set(destTheta1);
    t2Driver.set(destTheta2);
  }, [destTheta1, destTheta2, t1Driver, t2Driver]);

  // 2) Springs - tuned for "organic machine" feel
  // Lower stiffness/damping for fluid, heavy movement vs robotic snap
  const springConfig = { stiffness: 80, damping: 25, mass: 1.2 };
  const t1 = useSpring(t1Driver, springConfig);
  const t2 = useSpring(t2Driver, { ...springConfig, mass: 0.8 });

  // 3) FK Calculations
  const { l1, l2, shoulder } = ARM_CONFIG;
  const toRad = (deg: number) => (deg * Math.PI) / 180;

  const elbowX = useTransform(t1, (deg1) => shoulder.x + l1 * Math.sin(toRad(deg1)));
  const elbowY = useTransform(t1, (deg1) => shoulder.y - l1 * Math.cos(toRad(deg1)));

  const wristX = useTransform([t1, t2], ([deg1, deg2]: number[]) => {
    const rTot = toRad(deg1 + deg2);
    return shoulder.x + l1 * Math.sin(toRad(deg1)) + l2 * Math.sin(rTot);
  });

  const wristY = useTransform([t1, t2], ([deg1, deg2]: number[]) => {
    const rTot = toRad(deg1 + deg2);
    return shoulder.y - l1 * Math.cos(toRad(deg1)) - l2 * Math.cos(rTot);
  });

  const LIMB_WIDTH = 28;
  const JOINT_RADIUS = 16;

  return (
    <g>
      <defs>
        {/* Soft shadow for depth */}
        <filter id="limbShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="3" dy="3" stdDeviation="3" floodColor="rgba(0,0,0,0.3)" />
        </filter>
        {/* Metallic gradient for limbs */}
        <linearGradient id="limbGradient" x1="0" y1="0" x2="1" y2="0">
           <stop offset="0%" stopColor="#cbd5e1" />
           <stop offset="50%" stopColor="#f1f5f9" />
           <stop offset="100%" stopColor="#cbd5e1" />
        </linearGradient>
      </defs>

      {/* Base */}
      <g transform={`translate(${shoulder.x}, ${shoulder.y})`} filter="url(#limbShadow)">
        <path
          d="M-35,35 L-28,0 L28,0 L35,35 Z"
          fill={COLORS.robot.base}
          stroke={COLORS.robot.baseStroke}
          strokeWidth="2"
        />
      </g>

      {/* Limbs - using Gradient fill where possible or simpler stroke styling */}
      {/* Upper Arm */}
      <motion.line
        x1={shoulder.x}
        y1={shoulder.y}
        x2={elbowX}
        y2={elbowY}
        stroke="url(#limbGradient)"
        strokeWidth={LIMB_WIDTH}
        strokeLinecap="round"
        filter="url(#limbShadow)"
      />
      {/* Detail line on upper arm */}
      <motion.line
        x1={shoulder.x} y1={shoulder.y} x2={elbowX} y2={elbowY}
        stroke={COLORS.robot.limbStroke} strokeWidth="1" opacity="0.5"
      />

      {/* Forearm */}
      <motion.line
        x1={elbowX}
        y1={elbowY}
        x2={wristX}
        y2={wristY}
        stroke="url(#limbGradient)"
        strokeWidth={LIMB_WIDTH - 6}
        strokeLinecap="round"
        filter="url(#limbShadow)"
      />

      {/* Joints */}
      <g filter="url(#limbShadow)">
        <circle cx={shoulder.x} cy={shoulder.y} r={JOINT_RADIUS} fill={COLORS.robot.joint} stroke={COLORS.robot.jointStroke} strokeWidth="3" />
        <circle cx={shoulder.x} cy={shoulder.y} r={6} fill="rgba(255,255,255,0.4)" />
        
        <motion.circle cx={elbowX} cy={elbowY} r={JOINT_RADIUS - 2} fill={COLORS.robot.joint} stroke={COLORS.robot.jointStroke} strokeWidth="3" />
        <motion.circle cx={elbowX} cy={elbowY} r={5} fill="rgba(255,255,255,0.4)" />

        <motion.circle cx={wristX} cy={wristY} r={12} fill={COLORS.robot.joint} stroke={COLORS.robot.jointStroke} strokeWidth="3" />
      </g>

      {/* Claw at wrist */}
      <motion.g style={{ x: wristX, y: wristY }}>
        {/* Claw Left */}
        <motion.path
          animate={{ translateX: isGrabbing ? -6 : -18, rotate: isGrabbing ? 10 : -5 }}
          transition={{ duration: 0.15, ease: "easeInOut" }} // Snappy claw
          d="M 0,8 L -14,35 L -4,42 L 6,15 Z"
          fill={COLORS.robot.claw}
          stroke="#475569"
          strokeWidth="2"
        />
        {/* Claw Right */}
        <motion.path
          animate={{ translateX: isGrabbing ? 6 : 18, rotate: isGrabbing ? -10 : 5 }}
          transition={{ duration: 0.15, ease: "easeInOut" }} // Snappy claw
          d="M 0,8 L 14,35 L 4,42 L -6,15 Z"
          fill={COLORS.robot.claw}
          stroke="#475569"
          strokeWidth="2"
        />

        {heldLetter && (
          <motion.g
            initial={{ opacity: 0, scale: 0.8, y: 35 }}
            animate={{ opacity: 1, scale: 1, y: 25 }}
            exit={{ opacity: 0, scale: 0 }}
          >
            <rect x={-20} y={-20} width={40} height={40} rx={8} fill={COLORS.blocks.held} stroke="white" strokeWidth={3} />
            <text x={0} y={8} textAnchor="middle" fill={COLORS.blocks.text} fontWeight="bold" fontSize="26" className="font-mono">
              {heldLetter}
            </text>
            <rect x={-20} y={-20} width={40} height={40} rx={8} fill="none" stroke="white" strokeWidth="2" opacity="0.5" className="animate-pulse" />
          </motion.g>
        )}
      </motion.g>

      {!reachable && <text x={20} y={60} fill="#ef4444" className="font-mono font-bold text-xs tracking-widest">RANGE WARNING</text>}
    </g>
  );
};
