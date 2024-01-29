/* Plain Language & starting idea
The canvas is divided into two sections;
each section has a grid of squares of 2x4
the left side has squares filled in black with white strokes
the right side has squares filled in white with black strokes

the left side squares have a random square that has a x+=random(0,5) and y+=random(0,5) position change, making this one squaring not aligned.
while the right side squares are perfectly algined.


-------------------NOTES AFTER FINISHED------------------

the description is merely a reflection of my thinking process, it's not the decription of the finished work

---------------------------------------------------------

-----------------------INSTRUCTION-----------------------

the user will need to click on either side of the screen to "move back" the mispositioned square. 

---------------------------------------------------------

*/

//ARRAY & FOR LOOP PRACTICE

// let squares = [];
// let squareSize = 400/4;

// function setup() {
//   createCanvas(400, 400);

//   for (let i = 0; i < 4; i++) {
//     for (let j = 0; j < 4; j++) {
//       let intX = j * squareSize;
//       let intY = i * squareSize;
//       squares.push({ positionX: intX, positionY: intY});
//     }
//   }
// }

// function draw() {
//   background(220);
//   for (let i = 0; i < squares.length; i++) {
//     rect(squares[i].positionX, squares[i].positionY, squareSize, squareSize);
//   }
// }

//GETTING SERIOUS

let squaresG1 = []; //left group of squares
let squaresG2 = []; //right group of squares

let squareSize = 400 / 8;

let randomChosenSquareWhite = null;
let randomChosenSquareBlack;

function setup() {
  createCanvas(400, 400);
  strokeWeight(0.5);

  //left group
  for (let i = 0; i < 8; i++) {
    //row number
    for (let j = 0; j < 4; j++) {
      //column number

      squaresG1.push({
        positionX1: j * squareSize,
        positionY1: i * squareSize,
        originalX1: j * squareSize,
        originalY1: i * squareSize,
      });
    }
  }

  //right group
  for (let k = 0; k < 8; k++) {
    //row number
    for (let l = 4; l < 8; l++) {
      //column number

      squaresG2.push({
        positionX2: l * squareSize,
        positionY2: k * squareSize,
        originalX2: l * squareSize,
        originalY2: k * squareSize,
      });
    }
  }

  randomChosenSquareBlack = random(squaresG2);
  randomChosenSquareBlack.positionX2 += random(-10, 10);
  randomChosenSquareBlack.positionY2 += random(-10, 10);
}

function draw() {
  background("white");

  //black background for white squares
  push();
  fill("black");
  rect(0, 0, width / 2, height);
  pop();

  for (let i = 0; i < squaresG1.length; i++) {
    fill("white");
    stroke("black");
    rect(
      squaresG1[i].positionX1,
      squaresG1[i].positionY1,
      squareSize,
      squareSize,
      5
    );
  }

  for (let i = 0; i < squaresG2.length; i++) {
    fill("black");
    stroke("white");
    rect(
      squaresG2[i].positionX2,
      squaresG2[i].positionY2,
      squareSize,
      squareSize,
      5
    );
  }
}

function mousePressed() {
  //move back the black squares and mess up the white ones
  if (
    randomChosenSquareBlack &&
    mouseX > randomChosenSquareBlack.positionX2 &&
    mouseX < randomChosenSquareBlack.positionX2 + squareSize &&
    mouseY > randomChosenSquareBlack.positionY2 &&
    mouseY < randomChosenSquareBlack.positionY2 + squareSize &&
    !randomChosenSquareWhite
  ) {
    randomChosenSquareWhite = random(squaresG1);
    //call out a random object of the array.
    randomChosenSquareWhite.positionX1 += random(-20, 20);
    randomChosenSquareWhite.positionY1 += random(-20, 20);
    //randomly move it.

    randomChosenSquareBlack.positionX2 = randomChosenSquareBlack.originalX2;
    randomChosenSquareBlack.positionY2 = randomChosenSquareBlack.originalY2;
    randomChosenSquareBlack = null;
    print(
      "Black:" + randomChosenSquareBlack + " White: " + randomChosenSquareWhite
    ); //put back the square that is moved on the side by using the stored orignal position.
  }

  //move back the white squares and mess up the black ones
  if (
    randomChosenSquareWhite &&
    mouseX > randomChosenSquareWhite.originalX1 &&
    mouseX < randomChosenSquareWhite.originalX1 + squareSize &&
    mouseY > randomChosenSquareWhite.originalY1 &&
    mouseY < randomChosenSquareWhite.originalY1 + squareSize &&
    !randomChosenSquareBlack
  ) {
    randomChosenSquareBlack = random(squaresG2);
    randomChosenSquareBlack.positionX2 += random(-20, 20);
    randomChosenSquareBlack.positionY2 += random(-20, 20);

    randomChosenSquareWhite.positionX1 = randomChosenSquareWhite.originalX1;
    randomChosenSquareWhite.positionY1 = randomChosenSquareWhite.originalY1;

    randomChosenSquareWhite = null;
    print(
      "Black:" + randomChosenSquareBlack + " White: " + randomChosenSquareWhite
    );
  }
}

////testing with the released function

// function mouseReleased() {
//   if (mouseX < width / 2) {
//     if (randomChosenSquareWhite) {
//       randomChosenSquareWhite.positionX1 = randomChosenSquareWhite.originalX1;
//       randomChosenSquareWhite = null;
//     }
//   }
// }
