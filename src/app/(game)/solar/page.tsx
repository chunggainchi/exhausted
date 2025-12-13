import React from 'react';
import { Metadata } from 'next';
import SolarSystem from '@/components/solar/SolarSystem';

export const metadata: Metadata = {
    title: 'Solar System Explorer - Interactive 3D Learning',
    description: 'Explore the solar system in 3D! Learn about planets, their moons, and fun facts in this interactive educational game.',
};

export default function SolarSystemPage() {
    return <SolarSystem />;
}
