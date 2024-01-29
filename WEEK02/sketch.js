let squaresG1 = []; // Left group of squares
let squaresG2 = []; // Right group of squares
let randomChosenSquareWhite = null;
let randomChosenSquareBlack;
let squareSize; // Global variable for square size

function setup() {
  createCanvas(windowWidth, windowHeight);
  strokeWeight(0.5);
  calculateSquareSize(); // Initialize square size
  initializeSquares(); // Initialize squares' positions
}

function draw() {
  background("white");
  drawSquares(); // Draw squares with current positions and sizes
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  calculateSquareSize(); // Recalculate square size on window resize
  initializeSquares(); // Reinitialize squares' positions on window resize
}

function calculateSquareSize() {
  squareSize = windowHeight / 8; // Calculate square size based on window height
}

function initializeSquares() {
  squaresG1 = [];
  squaresG2 = [];

  // Left group initialization
  for (let i = 0; i < 8; i++) {
    // Row number
    for (let j = 0; j < 4; j++) {
      // Column number
      squaresG1.push({
        positionX: j * squareSize,
        positionY: i * squareSize,
        originalX: j * squareSize,
        originalY: i * squareSize,
      });
    }
  }

  // Right group initialization
  for (let k = 0; k < 8; k++) {
    // Row number
    for (let l = 4; l < 8; l++) {
      // Column number
      squaresG2.push({
        positionX: l * squareSize,
        positionY: k * squareSize,
        originalX: l * squareSize,
        originalY: k * squareSize,
      });
    }
  }

  // Choose a random square to displace
  randomChosenSquareBlack = random(squaresG2);
  randomChosenSquareBlack.positionX += random(-10, 10);
  randomChosenSquareBlack.positionY += random(-10, 10);
}

function drawSquares() {
  // Draw white squares on the left
  for (let i = 0; i < squaresG1.length; i++) {
    fill("white");
    stroke("black");
    rect(
      squaresG1[i].positionX,
      squaresG1[i].positionY,
      squareSize,
      squareSize,
      5
    );
  }

  // Draw black squares on the right
  for (let i = 0; i < squaresG2.length; i++) {
    fill("black");
    stroke("white");
    rect(
      squaresG2[i].positionX,
      squaresG2[i].positionY,
      squareSize,
      squareSize,
      5
    );
  }
}

function mousePressed() {
  // Define displacement as a percentage of the smaller dimension of the window
  let displacementFactor = 0.02; // 2% of window dimension
  let maxDisplacement = min(windowWidth, windowHeight) * displacementFactor;

  // Iterate over squares on the left side
  squaresG1.forEach(square => {
    if (mouseX > square.positionX && mouseX < square.positionX + squareSize &&
        mouseY > square.positionY && mouseY < square.positionY + squareSize) {
      // Click is within a square on the left side
      if (randomChosenSquareWhite === square) {
        // Move the displaced white square back
        square.positionX = square.originalX;
        square.positionY = square.originalY;
        randomChosenSquareWhite = null;

        // Now displace a random black square
        randomChosenSquareBlack = random(squaresG2);
        randomChosenSquareBlack.positionX += random(-maxDisplacement, maxDisplacement);
        randomChosenSquareBlack.positionY += random(-maxDisplacement, maxDisplacement);
      }
    }
  });

  // Iterate over squares on the right side
  squaresG2.forEach(square => {
    if (mouseX > square.positionX && mouseX < square.positionX + squareSize &&
        mouseY > square.positionY && mouseY < square.positionY + squareSize) {
      // Click is within a square on the right side
      if (randomChosenSquareBlack === square) {
        // Move the displaced black square back
        square.positionX = square.originalX;
        square.positionY = square.originalY;
        randomChosenSquareBlack = null;

        // Now displace a random white square
        randomChosenSquareWhite = random(squaresG1);
        randomChosenSquareWhite.positionX += random(-maxDisplacement, maxDisplacement);
        randomChosenSquareWhite.positionY += random(-maxDisplacement, maxDisplacement);
      }
    }
  });
}


