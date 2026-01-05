import React from 'react';
import { Metadata } from 'next';
import { Chronos } from '../../../components/chronos/Chronos';

export const metadata: Metadata = {
    title: 'Chronos - Time Visualizer',
    description: 'Chronos - The Time Consumption Visualizer',
};

export default function ChronosPage() {
    return <Chronos />;
}