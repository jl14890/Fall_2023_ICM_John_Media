let cX1, cX2, cY1, cY2, cX3, cY3;
let speed;

function setup() {
  createCanvas(windowWidth, windowHeight);

  //set the starting point of all circles
  cX1 = windowWidth / 2;
  cX2 = windowWidth / 2;
  cY1 = windowHeight / 2;
  cY2 = windowHeight / 2;

  cX3 = windowWidth / 2;
  cY3 = windowHeight / 2;
  cX4 = windowWidth / 2;
  cY4 = windowHeight / 2;
  cX5 = windowWidth / 2;
  cY5 = windowHeight / 2;
  cX6 = windowWidth / 2;
  cY6 = windowHeight / 2;

  speed = 2;
  speed2 = 20;
  noStroke();
}

function draw() {
  background("white");
  fill("black");

  //group 1: moving left and right
  //circle moving right
  let cR = map(mouseX, 0, windowWidth, 10, 200); //a bit fun with sizes

  circle(cX1, windowHeight / 2, cR);
  cX1 += speed; //circle moving towards a direction
  if (cX1 > windowWidth) {
    cX1 = windowWidth / 2; //reset the position once touched the edge
  }

  //circle moving left
  circle(cX2, windowHeight / 2, cR);
  cX2 -= speed;
  if (cX2 < 0) {
    cX2 = windowWidth / 2;
  }

  //group 2: moving top and down
  //circle moving top

  circle(windowWidth / 2, cY1, cR);
  cY1 -= speed;
  if (cY1 < 0) {
    cY1 = windowHeight / 2;
  }

  //circle moving down
  circle(windowWidth / 2, cY2, cR);

  cY2 += speed;
  if (cY2 > windowHeight) {
    cY2 = windowHeight / 2;
  }

  //group 3: moving to top right and left
  //circle moving top left

  fill("red");
  circle(cX3, cY3, cR);

  //constrain the circle inside the canvas so that it actually goes to the corner instead of going outside and wait for the other value to satisfy the condition.
  //the value only keep decreasing/increasing if they within the set boundaries, if not, stop decreasing/increasing

  if (cX3 > 0) {
    cX3 -= speed;
  }
  if (cY3 > 0) {
    cY3 -= speed;
  }

  //reset position only when both axis reaches the position
  if (cX3 <= 0 && cY3 <= 0) {
    cX3 = windowWidth / 2;
    cY3 = windowHeight / 2;
  }

  //circle moving top right
  circle(cX4, cY4, cR);

  if (cX4 < windowWidth) {
    cX4 += speed;
  }

  if (cY4 > 0) {
    cY4 -= speed;
  }

  if (cX4 >= windowWidth && cY4 <= 0) {
    cX4 = windowWidth / 2;
    cY4 = windowHeight / 2;
  }

  //circle moving bottom left
  circle(cX5, cY5, cR);

  if (cX5 > 0) {
    cX5 -= speed;
  }

  if (cY5 < windowHeight) {
    cY5 += speed;
  }

  if (cX5 <= 0 && cY5 >= windowHeight) {
    cX5 = windowWidth / 2;
    cY5 = windowHeight / 2;
  }

  //circle moving bottom left
  circle(cX6, cY6, cR);

  if (cX6 < windowWidth) {
    cX6 += speed;
  }

  if (cY6 < windowHeight) {
    cY6 += speed;
  }

  if (cX6 >= windowWidth && cY6 >= windowHeight) {
    cX6 = windowWidth / 2;
    cY6 = windowHeight / 2;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
