let glitch;
let videoCapture;
let myPoseNet;
let noseX = 0;
let noseY = 0;
let poses = [];
let prevNoseX = 0;
let prevNoseY = 0;

function setup() {
  createCanvas(640, 480);
  glitch = new Glitch();
  videoCapture = createCapture(VIDEO);
  videoCapture.hide();

  // Initialize PoseNet
  myPoseNet = ml5.poseNet(videoCapture, modelReady);
  myPoseNet.on('pose', gotPoses);

  // Load the glitch image
  loadImage("kitten.jpg", function (im) {
    glitch.loadImage(im);
  });
}

function gotPoses(results) {
  // If there are any poses, set noseX and noseY
  if (results.length > 0) {
    poses = results;
    let nose = poses[0].pose.keypoints.find(k => k.part === "nose");
    if (nose) {
      noseX = nose.position.x;
      noseY = nose.position.y;
    }
  }
}

function modelReady() {
  console.log('Model Ready');
}

function draw() {

  translate(videoCapture.width, 0);
  scale(-1, 1);
  image(videoCapture, 0, 0);

  let glitchAmount = calculateGlitchAmount(prevNoseX, prevNoseY);

  // Apply glitch effect and display video
  glitch.resetBytes();
  glitch.randomBytes(glitchAmount);
  glitch.buildImage();

  // Display glitch image at nose position if poses detected
  if (poses.length > 0) {

    prevNoseX = noseX;
    prevNoseY = noseY;
    // Map the glitch image size to the nose position
    let glitchWidth = glitch.image.width / 6;
    let glitchHeight = glitch.image.height / 6;

    let imgX = noseX - glitchWidth / 2;
    let imgY = noseY - glitchHeight / 2;

    image(glitch.image, imgX, imgY, glitchWidth, glitchHeight);
  }

  console.log(glitchAmount);
}

function calculateGlitchAmount(x, y) {
  // Implement logic to calculate the glitch amount based on the nose position
  // For example, you might map the nose X position to a range of values for glitch
  let glitchValue = map(y, height / 2, 0, 1, 200); // This is an example, adjust as needed
  return glitchValue;
}

function mousePressed() {
  // When the user clicks, regenerate the glitch effect
  glitch.randomBytes(10);
  glitch.buildImage();
}
