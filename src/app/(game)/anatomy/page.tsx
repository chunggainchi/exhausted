import AnatomyGame from '@/components/anatomy/AnatomyGame';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Anatomie Entdecker - Exhausted Rocket',
    description: 'Lerne die innere Anatomie von Tieren und Menschen kennen.',
};

export default function AnatomyPage() {
    return <AnatomyGame />;
}
