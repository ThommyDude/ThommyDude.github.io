const images = {
    1: "./images/wolfiBoop.png",
    2: "./images/wolfiHeart.png",
    3: "./images/wolfiLick.png",
    4: "./images/wolfiNotes.png",
    5: "./images/wolfiPog.png",
    6: "./images/wolfiShrug.png",
    7: "./images/wolfiSmurt.png",
    8: "./images/wolfiSquish.png",
    9: "./images/wolfiWork.png",
};

function sudokuLibraryGridToCustomGrid(rows) {
    // Loop rows
    rows.forEach(
        (row, rowIndex) => {
            row.forEach(
                (col, colIndex) => {
                    if (col === '.') {
                        row[colIndex] = 0;
                    } else {
                        row[colIndex] = Number(col);
                    }
                }
            );
        }
    );

    return rows;
}

function createSudoku(sudokuGrid) {
    const sudokuContainer = document.getElementById('sudoku');
    sudokuContainer.innerHTML = '';

    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            const cellValue = sudokuGrid[row][col];
            const cell = document.createElement('div');
            cell.className = 'cell';
            
            if (cellValue !== 0) {
                const img = document.createElement('img');
                img.src = images[cellValue];
                cell.appendChild(img);
                cell.setAttribute('value', cellValue);
            }
            
            sudokuContainer.appendChild(cell);
        }
    }
}

function generateEasy() {
    let sudokuString = sudoku.generate("easy");
    let sudokuGrid = sudoku.board_string_to_grid(sudokuString);

    sudokuGrid = sudokuLibraryGridToCustomGrid(sudokuGrid);

    createSudoku(sudokuGrid);
}

function generateMedium() {
    let sudokuString = sudoku.generate("medium");
    let sudokuGrid = sudoku.board_string_to_grid(sudokuString);

    sudokuGrid = sudokuLibraryGridToCustomGrid(sudokuGrid);

    createSudoku(sudokuGrid);
}

function generateHard() {
    let sudokuString = sudoku.generate("hard");
    let sudokuGrid = sudoku.board_string_to_grid(sudokuString);

    sudokuGrid = sudokuLibraryGridToCustomGrid(sudokuGrid);

    createSudoku(sudokuGrid);
}

generateEasy();

const easyButton = document.getElementById('generateButtonEasy');
const mediumButton = document.getElementById('generateButtonMedium');
const hardButton = document.getElementById('generateButtonHard');

easyButton.addEventListener(
    'click',
    () => {
        generateEasy();
    }
);

mediumButton.addEventListener(
    'click',
    () => {
        generateMedium();
    }
);

hardButton.addEventListener(
    'click',
    () => {
        generateHard();
    }
);