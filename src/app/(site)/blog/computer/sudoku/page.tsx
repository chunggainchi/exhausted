import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Grid3x3, Music, Trophy } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Kinder Sudoku: Logik spielerisch lernen',
    description: 'Ein neues interaktives Spiel für Kinder: Farbenfrohes Sudoku mit tollen Sounds und Konfetti-Belohnung.',
};

export default function SudokuBlogPost() {
    return (
        <article className="max-w-4xl mx-auto px-4 py-12">
            <header className="mb-12 text-center">
                <div className="inline-block p-3 rounded-2xl bg-purple-100 text-purple-600 mb-6">
                    <Grid3x3 size={48} />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 mb-6">
                    Kinder Sudoku: Logik spielerisch lernen
                </h1>
                <p className="text-xl text-zinc-600 max-w-2xl mx-auto">
                    Ein neues, farbenfrohes Spiel, das Kindern hilft, logisches Denken und Zahlenverständnis zu entwickeln – ganz ohne Frust.
                </p>
            </header>

            <div className="prose prose-lg dark:prose-invert mx-auto mb-12">
                <p>
                    Sudoku ist ein fantastisches Gehirntraining, aber die klassischen Gitter mit 9x9 Feldern sind für kleine Kinder oft zu überwältigend. Deshalb habe ich eine kinderfreundliche Version entwickelt, die sanft in die Welt der Logikrätsel einführt.
                </p>

                <div className="my-12 p-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-3xl text-white text-center shadow-xl transform hover:scale-[1.02] transition-transform">
                    <h2 className="text-3xl font-bold mb-4 text-white mt-0">Bereit zum Spielen?</h2>
                    <p className="text-purple-100 mb-8 text-lg">
                        Wähle dein Level und starte sofort im Browser.
                    </p>
                    <Link
                        href="/sudoku"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-600 rounded-xl font-bold text-xl hover:bg-purple-50 transition-colors shadow-lg"
                    >
                        Sudoku starten <ArrowRight />
                    </Link>
                </div>

                <h3>Was macht dieses Sudoku besonders?</h3>

                <div className="grid md:grid-cols-3 gap-6 not-prose my-8">
                    <div className="p-6 bg-zinc-50 rounded-2xl border border-zinc-100">
                        <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-4">
                            <Grid3x3 size={24} />
                        </div>
                        <h4 className="font-bold text-lg mb-2">3 Schwierigkeitsstufen</h4>
                        <p className="text-zinc-600 text-sm">
                            Von ganz einfach (3x3 Felder) über mittel (4x4) bis hin zu knifflig (5x5). Perfekt für den Einstieg.
                        </p>
                    </div>

                    <div className="p-6 bg-zinc-50 rounded-2xl border border-zinc-100">
                        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4">
                            <Music size={24} />
                        </div>
                        <h4 className="font-bold text-lg mb-2">Tolles Feedback</h4>
                        <p className="text-zinc-600 text-sm">
                            Lustige Sounds und visuelle Effekte motivieren bei jedem richtigen Zug. Kein Frust bei Fehlern!
                        </p>
                    </div>

                    <div className="p-6 bg-zinc-50 rounded-2xl border border-zinc-100">
                        <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-xl flex items-center justify-center mb-4">
                            <Trophy size={24} />
                        </div>
                        <h4 className="font-bold text-lg mb-2">Erfolgserlebnisse</h4>
                        <p className="text-zinc-600 text-sm">
                            Ein Konfetti-Regen belohnt jedes gelöste Rätsel und stärkt das Selbstvertrauen.
                        </p>
                    </div>
                </div>

                <h3>Wie es funktioniert</h3>
                <p>
                    Das Spielprinzip ist einfach: In jeder Zeile und jeder Spalte darf jede Zahl nur einmal vorkommen. Im 4x4-Modus gibt es zusätzlich kleine 2x2-Quadrate, in denen ebenfalls jede Zahl nur einmal stehen darf.
                </p>
                <p>
                    Um es Kindern leichter zu machen, hat jede Zahl ihre eigene feste Farbe. So können Muster schneller erkannt werden.
                </p>
            </div>
        </article>
    );
}
