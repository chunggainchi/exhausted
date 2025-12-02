export type Grid = number[][];

export type LevelConfig = {
    id: number;
    name: string;
    size: number;
    maxNumber: number;
    color: string;
    hasBlocks: boolean; // For 4x4 (2x2 blocks)
    emptyCount: number; // Approximate difficulty
};

export const LEVELS: LevelConfig[] = [
    { id: 1, name: 'Tiny', size: 3, maxNumber: 3, color: 'bg-green-400', hasBlocks: false, emptyCount: 3 },
    { id: 2, name: 'Mini', size: 4, maxNumber: 4, color: 'bg-blue-400', hasBlocks: true, emptyCount: 6 },
    { id: 3, name: 'Big', size: 5, maxNumber: 5, color: 'bg-purple-400', hasBlocks: false, emptyCount: 10 },
];

// Check if placing num at board[row][col] is valid
export const isValid = (board: Grid, row: number, col: number, num: number, size: number, hasBlocks: boolean): boolean => {
    // Check Row
    for (let x = 0; x < size; x++) {
        if (board[row][x] === num) return false;
    }

    // Check Col
    for (let x = 0; x < size; x++) {
        if (board[x][col] === num) return false;
    }

    // Check Subgrid (only for 4x4)
    if (hasBlocks && size === 4) {
        const blockSize = 2;
        const startRow = Math.floor(row / blockSize) * blockSize;
        const startCol = Math.floor(col / blockSize) * blockSize;
        for (let r = 0; r < blockSize; r++) {
            for (let c = 0; c < blockSize; c++) {
                if (board[startRow + r][startCol + c] === num) return false;
            }
        }
    }

    return true;
};

// Backtracking solver
export const solveSudoku = (board: Grid, size: number, hasBlocks: boolean): boolean => {
    for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
            if (board[r][c] === 0) {
                // Try numbers 1..size in random order to get random puzzles
                const nums = Array.from({ length: size }, (_, i) => i + 1).sort(() => Math.random() - 0.5);

                for (const num of nums) {
                    if (isValid(board, r, c, num, size, hasBlocks)) {
                        board[r][c] = num;
                        if (solveSudoku(board, size, hasBlocks)) return true;
                        board[r][c] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true;
};

export const generateGame = (levelId: number) => {
    const config = LEVELS.find(l => l.id === levelId) || LEVELS[0];
    const size = config.size;

    // 1. Create empty board
    const solution: Grid = Array.from({ length: size }, () => Array(size).fill(0));

    // 2. Fill diagonal (or just random first row) to seed randomness efficiently
    // For small grids, just solving from scratch with randomized number picking is fast enough.
    solveSudoku(solution, size, config.hasBlocks);

    // 3. Create puzzle by removing numbers
    // Deep copy solution to puzzle
    const puzzle: Grid = solution.map(row => [...row]);

    let removed = 0;
    const target = config.emptyCount;
    const attempts = 100; // safety break

    for (let i = 0; i < attempts && removed < target; i++) {
        const r = Math.floor(Math.random() * size);
        const c = Math.floor(Math.random() * size);
        if (puzzle[r][c] !== 0) {
            puzzle[r][c] = 0;
            removed++;
        }
    }

    return { puzzle, solution };
};
