let meow, mic;
let button;
let img, angryImg, popImg, loveImg, earImg;
let isButtonPressed = false;


let manyMeows = [];
let currentSoundIndex = 0;

function preload() {
    meow = loadSound('assets/meow.wav');
    img = loadImage('assets/cute.jpg');
    angryImg = loadImage('assets/angry.jpg'); // Image to display when threshold is exceeded
    popImg1 = loadImage('assets/pop1.png'); // Image that always changes size
    popImg0 = loadImage('assets/pop0.png');

    loveImg = loadImage('assets/love.gif')
    earImg = loadImage('assets/earTraining.png')


    for (let i = 0; i < 10; i++) {
        manyMeows[i] = loadSound(`assets/meow${i}.mp3`);
    }
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    img.loadPixels();

    mic = new p5.AudioIn();
    mic.start();

    button = createButton('Meow~');
    centerButton();

    button.mousePressed(function () {
        isButtonPressed = true;
        playing();
    });
}

function draw() {
    background(255);

    let micLevel = mic.getLevel();
    let size = map(micLevel, 0, 1, 200, 1000); // Map the mic level to a size value

    if (micLevel > 0.05) {
        image(angryImg, 0, 0, windowWidth, windowHeight);
    } else {
        image(img, 0, 0, windowWidth, windowHeight);
    }

    if(micLevel > 0.02){
        image(popImg1, (windowWidth - size) / 2, (windowHeight - size) / 2 + 100, size, size);
    }else{
        image(popImg0, (windowWidth - size) / 2, (windowHeight - size) / 2 + 100, size, size);
    }

    // image(loveImg, windowWidth / 2 - 100, (windowHeight + size) / 2 + 100, 100, 100)
    image(earImg, windowWidth / 2 - 50, (windowHeight + size) / 2 + 100, 100, 100)

    fill("pink");
    stroke("black")
    strokeWeight(5)
    strokeCap(ROUND);
    strokeJoin(ROUND);
    text("Press button to hear the full MEOW audio, Click around to hear MEOWs <3", windowWidth / 2, windowHeight / 2 - 100);
    text("aaaand try not to speak too loud~", windowWidth / 2, windowHeight / 2 - 50);
    textSize(30);
    textAlign(CENTER);
}

//
function playing() {
    if (meow.isPlaying()) {
        meow.pause();
        button.html('Meow~');
    } else {
        meow.play();
        button.html('Shush!');
    }
    meow.setVolume(1.0);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    centerButton();
}

function centerButton() {
    button.position((windowWidth - button.width) / 2, (windowHeight - button.height) / 2);
}

function mousePressed() {

    if (isButtonPressed) {
        isButtonPressed = false; // Reset the flag
        return; // Exit if the button was pressed
    }
    // Check if the current sound is playing
    if (manyMeows[currentSoundIndex].isPlaying()) {
        manyMeows[currentSoundIndex].pause();
    } else {
        manyMeows[currentSoundIndex].play();
    }
    // Move to the next sound file
    currentSoundIndex = (currentSoundIndex + 1) % manyMeows.length;
}