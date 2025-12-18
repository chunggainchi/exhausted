import React from 'react';
import { Metadata } from 'next';
import Script from 'next/script';
import DibhDiverGame from '@/components/dibh-diver/DibhDiverGame';

export const metadata: Metadata = {
  title: 'DIBH DIVER',
  description: 'A simple obstacle-avoidance game controlled by breathing.',
};

export default function DibhDiverPage() {
  return (
    <>
      <Script 
        src="https://docs.opencv.org/4.8.0/opencv.js" 
        strategy="beforeInteractive" 
      />
      <DibhDiverGame />
    </>
  );
}