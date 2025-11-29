'use client';

import React, { useState } from 'react';
import { anatomyData, AnatomyObject, categories } from '@/lib/anatomy-data';
import CategoryView from './CategoryView';
import XRayViewer from './XRayViewer';
import InfoModal from './InfoModal';
import GameNavigation from './GameNavigation';

export default function AnatomyGame() {
    const [selectedObject, setSelectedObject] = useState<AnatomyObject | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>(categories[0]);
    const [isInfoOpen, setIsInfoOpen] = useState(false);

    return (
        <div className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-green-500/30">
            <GameNavigation
                objects={anatomyData}
                onSelect={setSelectedObject}
                selectedObject={selectedObject}
            />

            {!selectedObject ? (
                <CategoryView
                    objects={anatomyData}
                    onSelect={setSelectedObject}
                    selectedCategory={selectedCategory}
                    onCategoryChange={setSelectedCategory}
                />
            ) : (
                <XRayViewer
                    object={selectedObject}
                    onBack={() => setSelectedObject(null)}
                    onInfoTrigger={() => setIsInfoOpen(true)}
                />
            )}

            <InfoModal
                isOpen={isInfoOpen}
                onClose={() => setIsInfoOpen(false)}
                title={selectedObject?.name || ''}
                description={selectedObject?.description || ''}
            />
        </div>
    );
}
