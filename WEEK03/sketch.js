/*

slider logic:

when mouse pressed within the shape's area
  the shape follows the mouse (from a minimum to a maximum)

varX is mapped by mouseX

*/

let circleX = -50;
let a1 = 255;
let angleSpace = 20;
let range = 10;

//surrounding circles
let radius = 3;
let distanceFromCenter = 100;

function setup() {
  createCanvas(400, 400);
  rectMode(CENTER);
  noStroke();
  angleMode(DEGREES);
}

function draw() {
  background("black");
  translate(width / 2, height / 2);

  //bar
  push();
  fill(a1);
  rect(0, 0, 100, 10, 10, 10);
  circle(circleX, 0, 30);
  pop();

  //mouse control
  if (
    mouseIsPressed &&
    mouseX > 150 - range &&
    mouseX < 250 + range &&
    mouseY > 150 - range &&
    mouseY < 250 + range
  ) {
    circleX = map(mouseX, 150, 250, -50, 50); //button position
    a1 = map(mouseX, 150, 240, 255, 20); //bar and button alpha
    angleSpace = map(mouseX, 150, 250, 20, 30);
    radius = map(mouseX, 150, 250, 3, 20)
  }

  //surrounding circles
  for (let angle = 0; angle < 360; angle += angleSpace) {
    let x = cos(angle) * distanceFromCenter;
    let y = sin(angle) * distanceFromCenter;
    circle(x, y, radius * 2);
  }

  // print("mouseX" + mouseX);
  // print("mouseY" + mouseY);
  // print("circleX" + circleX);
}
