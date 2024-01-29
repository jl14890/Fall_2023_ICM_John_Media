//Instruction: scroll the mouse wheel; drag the letter "o"

//the actual "letter width" is in fact letterWidth*2+inner stroke spacing e.g. "H"
let letterWidth = 50;
let letterHeight = letterWidth * 2;
let letterSpace = letterWidth / 10;

let oPosX;
let oPosY;

let oStartX;
let oStartY;

let isDraggingO = false;

let posX;
let posY;

let myFont;

function preload() {
  myFont = loadFont("Adequate-ExtraLight.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  letterWidth = 50;
  letterHeight = letterWidth * 2;

  oPosX = calculateOPosX();
  oPosY = calculateOPosY();

  posX = windowWidth / 8;
  posY = windowHeight / 2 - letterHeight / 2;

  background(255);
  noStroke();
  drawJohn(); // Initial drawing
  oPosX = calculateOPosX();
  oPosY = calculateOPosY();
}

// New functions to calculate the starting X and Y positions of 'O' to avoid writing the same calculation for oPosX and oPosY everytime that the position needs to be re-calculated.

function calculateOPosX() {
  return posX + letterWidth * 3 + letterSpace;
}
function calculateOPosY() {
  return posY + letterHeight / 2;
}

//Somehow if I do not put drawJohn into draw function, "O" doesnt know where to position
function draw() {
  drawJohn();
}

function drawJohn() {
  background(255); // Clear canvas before drawing
  JOHN(letterWidth);
}

function JOHN(letterWidth) {
  fill(0);

  let jHeight = letterHeight - letterWidth;
  let jRPosX = posX + letterWidth;
  let oPosX2 = jRPosX + letterWidth * 2 + letterSpace;
  let hPosX1 = oPosX2 + letterWidth + letterSpace;
  let hPosX2 = hPosX1 + letterWidth + letterSpace / 2;
  let nTPosX1 = hPosX2 + letterWidth + letterSpace;
  let nTPosX2 = nTPosX1 + letterWidth * 2;
  let nRPosX = nTPosX1 + letterWidth;

  // Rectangle part of J
  rect(jRPosX, posY, letterWidth, jHeight);

  // Semi-circle part of J
  arc(
    posX + letterWidth,
    posY + jHeight,
    letterWidth * 2,
    letterWidth * 2,
    0,
    PI
  );

  //letter "O"
  circle(oPosX, oPosY, letterWidth * 2);

  //letter "O" strokes
  push();
  strokeWeight(2);
  stroke("black");
  noFill();
  circle(oPosX2, posY + letterHeight / 2, letterWidth * 2);
  
  //letter "H" horizontal stroke
  line(
    hPosX1+letterWidth,
    posY + letterHeight / 2,
    hPosX2,
    posY + letterHeight / 2
  );
  pop();

  //letter "H"
  rect(hPosX1, posY, letterWidth, letterHeight);
  rect(hPosX2, posY, letterWidth, letterHeight);

  //letter "N"
  triangle(
    nTPosX1,
    posY,
    nTPosX1,
    posY + letterHeight,
    nTPosX2,
    posY + letterHeight
  );
  rect(nRPosX, posY, letterWidth, letterHeight);

  //the text around letter "O"
  let typeSize = map(letterWidth, 10, 90, 5, 20);
  let typeHeight = map(letterWidth, 10, 90, 5, 20);

  textFont(myFont);
  textSize(typeSize);

  textAlign(CENTER, CENTER);
  push();
  fill("white");
  text(int(letterWidth * 2), oPosX, oPosY);
  pop();

  text(int(oPosX), oPosX, oPosY - letterWidth - typeHeight);
  text(int(oPosY), oPosX, oPosY + letterWidth + typeHeight);
}

function mouseWheel(event) {
  event.preventDefault();
  //IMPORTANT!!!
  
  if (isDraggingO) {
    return; // disable the function if isDraggingO is true
  }
  letterWidth += -event.delta * 0.05; // how much they change according to the scrolling
  letterWidth = constrain(letterWidth, 10, 90);

  // Recalculate circle's position when letterWidth changes
  oPosX = calculateOPosX();
  oPosY = calculateOPosY();

  //Everytime the mouse wheel is scrolled, re-draw everything
  drawJohn();
}

//Record the current "O" position
function mousePressed() {
  if (dist(mouseX, mouseY, oPosX, oPosY) <= letterWidth) {
    isDraggingO = true;
    oStartX = oPosX;
    oStartY = oPosY;
  }
}

//Allow "O" to be dragged
function mouseDragged() {
  if (isDraggingO) {
    oPosX = mouseX;
    oPosY = mouseY;

    //everyframe mouse is dragged, re-draw everything
    drawJohn();
  }
}

//Put the "O" back to the recorded last position
function mouseReleased() {
  if (isDraggingO) {
    isDraggingO = false;
    oPosX = oStartX; // Reset to starting position
    oPosY = oStartY;

    //everyframe mouse is released, re-draw everything
    drawJohn();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  posX = windowWidth / 8;
  posY = windowHeight / 2 - letterHeight / 2;

  // Recalculate circle's position when window changes
  oPosX = calculateOPosX();
  oPosY = calculateOPosY();

  // Everytime the window is resized, redraw everything
  drawJohn();
}
