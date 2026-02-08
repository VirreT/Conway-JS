// Simulation Logic for Conway's Game of Life

// Import the canvas element and set up the drawing context
const canvas = document.getElementById("conway");
const ctx = canvas.getContext("2d");

// Define the dimensions of the grid and the size of each pixel
let height;
let width;
let pixelsize;
let conway;
let simulationRunning = false;
let currentSimulationId = 0;

// Updates the dimensions for when the screen changes size
function updateDimensions() {
    height = Math.floor(window.innerHeight / 20);
    width = Math.floor(window.innerWidth / 20);
    pixelsize = Math.sqrt((window.innerWidth * window.innerHeight) / (width * height));
}


// Creates a 2D array depending on the dimensions of the screen
function createGrid(x, y) {
    let grid = Array(x).fill(null).map(() => Array(y));

    for (let i = 0; i < x; i++) {

        for (let j = 0; j < y; j++) {

            grid[i][j] = 0;

        }

    }
    return grid;
}

//console.log(conway);

//randomises the pixels in the grid
function randomisePixels(grid) {
    let x = grid.length;
    let y = grid[0].length;

    for (let i = 0; i < x; i++) {

        for (let j = 0; j < y; j++) {

            let emptyPixel = Math.floor(Math.random() * 4) // 25% chance for a pixel to be alive

            if (emptyPixel == 1) {
                grid[i][j] = 1;
            }

        }
    }

}

// Draws a grid on the canvas (not used for the final version)

/*
function drawGrid(grid, size) {
    let x = grid.length;

    let y = grid[0].length;

    ctx.strokeStyle = "#3d444d";

    for (let i = 0; i < x; i++) {

        for (let j = 0; j < y; j++) {
            ctx.strokeRect(i * size, j * size, size, size);
        }
    }

}
*/

//Initializes the canvas, 0's are drawn to cut down on computation

function initializeBackground(grid, size) {
    let x = grid.length;
    let y = grid[0].length;
    
    
    ctx.fillStyle = "#3d444d";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    
    ctx.fillStyle = "#b0b0b0";
    ctx.font = size * 0.8 + "px Courier New";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    
    for (let i = 0; i < x; i++) {
        for (let j = 0; j < y; j++) {
            ctx.fillText("0", i * size + size / 2, j * size + size / 2);
        }
    }
}

// Draws the alive pixels on the canvas

function drawAlivePixels(grid, size, previousGrid) {
    let x = grid.length;
    let y = grid[0].length;
    
    for (let i = 0; i < x; i++) {
        for (let j = 0; j < y; j++) {
            
            if (previousGrid[i][j] != grid[i][j] || grid[i][j] == 1) {
                let xPos = i * size;
                let yPos = j * size;
                
                if (grid[i][j] == 1) {
                    
                    ctx.fillStyle = "#9a9a9a";
                    ctx.fillRect(xPos, yPos, size, size);
                    
                    ctx.fillStyle = "#000000";
                    ctx.font = size * 0.8 + "px Arial";
                    ctx.textAlign = "center";
                    ctx.textBaseline = "middle";
                    ctx.fillText("1", xPos + size / 2, yPos + size / 2);
                } else {
                    
                    ctx.fillStyle = "#3d444d";
                    ctx.fillRect(xPos, yPos, size, size);
                    ctx.fillStyle = "#b0b0b0";
                    ctx.font = size * 0.8 + "px Courier New";
                    ctx.textAlign = "center";
                    ctx.textBaseline = "middle";
                    ctx.fillText("0", xPos + size / 2, yPos + size / 2);
                }
            }
        }
    }
}

// Tick function to control the simulation speed

function TICK(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Defines the rules of the simulation (not 100% optimized, but it works)
function rules(grid){

    let x = grid.length;
    let y = grid[0].length;
    let newGrid = Array(x).fill(null).map(() => Array(y).fill(0));

    for (let i = 0; i < x ; i++){
        
        for (let j = 0; j < y; j++){

            let aliveNeighbors = 0;
            
            if (i > 0 && grid[i - 1][j] == 1) aliveNeighbors++;
            if (i < x - 1 && grid[i + 1][j] == 1) aliveNeighbors++;
            if (j > 0 && grid[i][j - 1] == 1) aliveNeighbors++;
            if (j < y - 1 && grid[i][j + 1] == 1) aliveNeighbors++;
            if (i > 0 && j > 0 && grid[i - 1][j - 1] == 1) aliveNeighbors++;
            if (i > 0 && j < y - 1 && grid[i - 1][j + 1] == 1) aliveNeighbors++;
            if (i < x - 1 && j > 0 && grid[i + 1][j - 1] == 1) aliveNeighbors++;
            if (i < x - 1 && j < y - 1 && grid[i + 1][j + 1] == 1) aliveNeighbors++;

            
            if (grid[i][j] == 1) {
                
                if (aliveNeighbors == 2 || aliveNeighbors == 3) {
                    newGrid[i][j] = 1;
                }
            } else {
                
                if (aliveNeighbors == 3) {
                    newGrid[i][j] = 1;
                }
            }
        }
    }
    
    
    for (let i = 0; i < x; i++) {
        for (let j = 0; j < y; j++) {
            grid[i][j] = newGrid[i][j];
        }
    }
}

//  Simulation loop

async function simulate(grid, size, simId) {
    
    initializeBackground(grid, size);
    
    let previousGrid = createGrid(grid.length, grid[0].length);
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            previousGrid[i][j] = grid[i][j];
        }
    }
    
    // Change grid values when grid resized
    while (currentSimulationId === simId) {
        
        drawAlivePixels(grid, size, previousGrid);
        
        
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[0].length; j++) {
                previousGrid[i][j] = grid[i][j];
            }
        }
        
        await TICK(1500);
        rules(grid);
    }
}

// IF the dimensions of the screen change, change pixels by setting new simulation ID

window.addEventListener('resize', () => {
    currentSimulationId++;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    updateDimensions();
    conway = createGrid(width, height);
    randomisePixels(conway);
    simulate(conway, pixelsize, currentSimulationId);
});

// When the page loads, set 

window.addEventListener('DOMContentLoaded', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    updateDimensions();
    conway = createGrid(width, height);
    randomisePixels(conway);
    currentSimulationId++;
    simulate(conway, pixelsize, currentSimulationId);
});