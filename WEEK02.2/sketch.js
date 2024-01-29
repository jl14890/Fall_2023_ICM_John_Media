let colorValue = 0;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0);
  stroke(colorValue);
  fill(colorValue);

  if (mouseY > 200) {
    //lower part of the canvas
    print("caught");
    //Lower part background
    push();
    fill("black");
    rect(0, 200, 400, 200);
    pop();

    // Circle and lines follow the mouse
    push();
    noStroke();
    circle(mouseX + random(-10, 10), mouseY + random(-10, 10), random(30,60));
    pop();
    
    //the line that follows the mouse from the bottom
    line(
      random(width),
      height,
      mouseX + random(-10, 10),
      mouseY + random(-10, 10)
    );
    //the line that follows the mouse from the center of the canvas
    line(
      random(width),
      height / 2,
      mouseX + random(-10, 10),
      mouseY + random(-10, 10)
    );
  } else {
    print("released");
    
    //upper part of the canvas
    push();
    fill("black");
    rect(0, 0, 400, 200);
    pop();
    
    //my approach to make the circle flipped and symmetrical to the mouse without using the translate fucntion to center the origin for I think this might seriosly affect my other values
    
    let awayX = width / 2 + (width / 2 - mouseX);
    let awayY = height / 2 + (height / 2 - mouseY);
    let circleX = awayX + random(-5, 5);
    let circleY = awayY + random(-5, 5);
    let circleR = map(mouseY, 0, 200, 10, 100);


    push();
    noStroke();
    ellipse(circleX, circleY, circleR);
    pop();
    
    line(random(width), 0, mouseX, mouseY);
    
    //line that tied to mouse on one end, and tied to the circle on the other.
    line(mouseX, mouseY, circleX, circleY);
  }
}

//press and release effect

function mousePressed() {
  if (colorValue == 0) {
    colorValue = 255;
  } else {
    colorValue = 0;
  }
}

function mouseReleased() {
  if (colorValue == 255) {
    colorValue = 0;
  } else {
    colorValue = 255;
  }
}

// //my experiment with line
// function draw() {
//   background(220);
//     line(
//       width,
//       0,
//       mouseX,
//       mouseY
//     );
// }
