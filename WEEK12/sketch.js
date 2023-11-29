let meowSound;
let osc, env;
let startTime;
let duration = 60; // Duration of the composition in seconds


function preload() {
    meowSound = loadSound('meow.mp3'); // Load the meow sound
}

function setup() {
    // Initialize sound objects
    osc = new p5.Oscillator('sine');
    noise = new p5.Noise('white');
    env = new p5.Envelope();
    env.setADSR(0.01, 0.5, 0.1, 0.5);
    env.setRange(0.8, 0);

    // Start the composition
    startTime = millis();
}

function draw() {
    let currentTime = millis() - startTime;

    // Play different sounds at different times
    if (currentTime < 20000) { // First 20 seconds
        playMeowWithTone(220, currentTime);
    } else if (currentTime < 40000) { // Next 20 seconds
        playNoise(currentTime);
    } else if (currentTime < 60000) { // Last 20 seconds
        playMeowWithTone(800, currentTime);
    } else {
        // Stop the composition after 60 seconds
        osc.stop();
        meowSound.stop();
        noLoop();
    }
}

function playMeowWithTone(freq, time) {
    let modFreq = freq + sin(time * 0.001) * 150; // Modulate frequency
    osc.freq(modFreq);
    if (!osc.started) {
        osc.start();
    }

    if (!meowSound.isPlaying()) {
        meowSound.loop(); // Loop the meow sound
    }

    // Adjust the playback rate based on the modulated frequency
    let playbackRate = modFreq / freq;
    meowSound.rate(playbackRate);
}

// function playTone(freq, time) {
//     let modFreq = freq + sin(time * 0.001) * 100; // Modulate frequency
//     osc.freq(modFreq);
//     if (!osc.started) {
//         osc.start();
//     }
// }

function playNoise(time) {
    if (!noise.started) {
        noise.start();
    }
    if (time % 1000 < 50) { // Trigger envelope every second
        env.play(noise);
    }
}
