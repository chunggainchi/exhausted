export type Cell = number | null;
export type Board = Cell[][];

export function createEmptyBoard(size: number): Board {
    return Array.from({ length: size }, () => Array(size).fill(null));
}

export function isValidMove(board: Board, row: number, col: number, num: number, size: number): boolean {
    // Check Row
    for (let x = 0; x < size; x++) {
        if (board[row][x] === num) return false;
    }

    // Check Column
    for (let x = 0; x < size; x++) {
        if (board[x][col] === num) return false;
    }

    // Check Subgrid (Only for 4x4)
    if (size === 4) {
        const startRow = Math.floor(row / 2) * 2;
        const startCol = Math.floor(col / 2) * 2;
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 2; j++) {
                if (board[startRow + i][startCol + j] === num) return false;
            }
        }
    }

    return true;
}

function solveSudoku(board: Board, size: number): boolean {
    for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
            if (board[row][col] === null) {
                // Try numbers 1 to size
                // Randomize order to get different puzzles
                const nums = Array.from({ length: size }, (_, i) => i + 1).sort(() => Math.random() - 0.5);

                for (const num of nums) {
                    if (isValidMove(board, row, col, num, size)) {
                        board[row][col] = num;
                        if (solveSudoku(board, size)) return true;
                        board[row][col] = null;
                    }
                }
                return false;
            }
        }
    }
    return true;
}

export function generatePuzzle(size: number): { initial: Board, solved: Board } {
    // 1. Generate a full valid board
    const solved = createEmptyBoard(size);
    solveSudoku(solved, size);

    // 2. Clone for the puzzle
    const initial = solved.map(row => [...row]);

    // 3. Remove numbers based on difficulty/size
    // Heuristic: Keep N cells filled
    let cellsToKeep;
    if (size === 3) cellsToKeep = 4; // Very easy
    else if (size === 4) cellsToKeep = 6;
    else if (size === 5) cellsToKeep = 8;
    else cellsToKeep = Math.floor(size * size * 0.4);

    let attempts = size * size * 2;
    while (attempts > 0 && countFilled(initial) > cellsToKeep) {
        const row = Math.floor(Math.random() * size);
        const col = Math.floor(Math.random() * size);
        if (initial[row][col] !== null) {
            initial[row][col] = null;
            // Ideally we should check if unique solution remains, but for kids app simple removal is usually fine
            // and ensures solvability since we started from a solved state.
        }
        attempts--;
    }

    return { initial, solved };
}

function countFilled(board: Board): number {
    return board.flat().filter(c => c !== null).length;
}

export function checkWin(board: Board, size: number): boolean {
    // Check if full
    if (countFilled(board) !== size * size) return false;

    // Validate all cells
    for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
            const val = board[r][c];
            if (val === null) return false;

            // Temporarily remove to check validity
            board[r][c] = null;
            const valid = isValidMove(board, r, c, val, size);
            board[r][c] = val;

            if (!valid) return false;
        }
    }
    return true;
}
