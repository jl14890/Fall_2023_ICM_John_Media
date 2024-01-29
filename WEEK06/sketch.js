let balls = [];

function setup() {
  createCanvas(400, 400);
  let initialBall = new BouncingBall(width / 2, height / 2);
  balls.push(initialBall); // Add the initial ball to the balls array
}

function draw() {
  background(255, 255, 255, 100);

  for (let ball of balls) {
    ball.moveTowardsMouse();
    ball.display();
  }
}

function mousePressed() {
  let newBall = new BouncingBall(mouseX, mouseY);
  balls.push(newBall);
}

function keyPressed() {
  if (keyCode === BACKSPACE || keyCode === DELETE) {
    balls.pop(); // Removes the last ball from the array
  }
}

class BouncingBall {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 24;
    this.speed = 2; // Speed at which the ball moves towards the mouse
  }

  moveTowardsMouse() {
    // Calculate direction vector towards the mouse
    let dirX = mouseX - this.x;
    let dirY = mouseY - this.y;

    // Normalize the direction vector
    let mag = sqrt(dirX * dirX + dirY * dirY);
    
    //GPT debug: the ball is generated exactly where the mouse is, so naturally mag will be 0 resulting in an infinite uncalculatable number. By adding this condition, it tells the ball only to move if the mouse is no longer at the position where it was clicked.
    
    //On the canvas, it will be shown as: the ball doesnt move when it was first generated and only moves when the mouse moves
    
    
    if (mag != 0) {
      dirX /= mag;
      dirY /= mag;

      // Move the ball in the direction of the mouse
      this.x += dirX * this.speed;
      this.y += dirY * this.speed;
    }
  }

  display() {
    fill("black");
    ellipse(this.x, this.y, this.size);
  }
}
