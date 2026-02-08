# Conway JS

A JavaScript implementation of Conway's Game of Life that runs in your browser with an interactive canvas display.

---

![Conway's Game of Life Simulation](https://raw.githubusercontent.com/VirreT/Conway-JS/main/preview.gif)

---

## Overview
This project simulates Conway's Game of Life, a cellular automaton where cells on a grid evolve based on simple rules:
- A live cell with 2-3 neighbors survives
- A dead cell with exactly 3 neighbors becomes alive
- All other cells die or stay dead

The simulation automatically adjusts to your screen size and displays the game state in real-time.

## Features
- Real-time simulation on HTML5 canvas
- Responsive design that adapts to window resizing
- Random initial state generation
- Visual display of live (1) and dead (0) cells

## How to Use
1. Clone or download this repository
2. Open `Conway JS/index.html` in your web browser
3. The simulation will start automatically with a random initial population
4. Watch as the cells evolve according to Conway's Game of Life rules

## Files
- `index.html` - Main HTML file
- `conway.js` - Simulation logic
- `conway.css` - Styling
