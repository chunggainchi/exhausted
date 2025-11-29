'use client';

import React, { useState } from 'react';
import { AnatomyObject, categories } from '@/lib/anatomy-data';
import { motion } from 'framer-motion';

interface CategoryViewProps {
    objects: AnatomyObject[];
    onSelect: (object: AnatomyObject) => void;
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
}

export default function CategoryView({ objects, onSelect, selectedCategory, onCategoryChange }: CategoryViewProps) {
    const filteredObjects = objects.filter(obj => obj.category === selectedCategory);

    return (
        <div className="w-full max-w-6xl mx-auto p-6">
            <h1 className="text-4xl font-bold text-white mb-8 text-center">Anatomie Entdecker</h1>

            {/* Category Tabs */}
            <div className="flex justify-center gap-4 mb-12">
                {categories.map(category => (
                    <button
                        key={category}
                        onClick={() => onCategoryChange(category)}
                        className={`px-6 py-3 rounded-full text-lg font-medium transition-all ${selectedCategory === category
                            ? 'bg-green-500 text-white shadow-lg shadow-green-500/25 scale-105'
                            : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredObjects.map((obj) => (
                    <motion.div
                        key={obj.id}
                        layoutId={obj.id}
                        onClick={() => onSelect(obj)}
                        className="group relative aspect-[4/3] bg-zinc-900 rounded-xl overflow-hidden cursor-pointer border border-zinc-800 hover:border-green-500/50 transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <img
                            src={obj.outerImage}
                            alt={obj.name}
                            className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                            <h3 className="text-xl font-bold text-white">{obj.name}</h3>
                            {obj.subcategory && (
                                <span className="text-sm text-zinc-400">{obj.subcategory}</span>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
