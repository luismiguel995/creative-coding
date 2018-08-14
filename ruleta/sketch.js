var images = [];
var countries;
var files_map;
var filenames;
var assetsDir = 'assets/';
var emojisDir = assetsDir + 'emoji-flags/';
var scaling = 15;
var rx;
var ry;
var currentCountry;
var currentIndex;
var theta;
var hand;



function preload() {
  countries = Object.keys(files_map);
  filenames = Object.values(files_map);

  for(var i = 0; i < filenames.length; i++) {
    filepath = emojisDir + filenames[i];
    images.push(loadImage(filepath));
  }
}


function imageLoaded(image) {
  images.push(image);
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  ry = 0.95 * height / 2;
  hand = new Hand(ry);
  setupMusic();
}




function draw() {
  background(50);
  translate(width / 2, height / 2);
  drawFlags();
  hand.update();
  drawLargeFlag();
}


function drawFlags() {
  var x;
  var y;
  var img;
  var N = images.length;
  var flagTheta;
  for (var i = 0; i < N; i++) {
    img = images[i];
    imWidth = img.width / scaling;
    imHeight = img.height / scaling;
    flagTheta = i / N * TAU;
    x = ry * cos(flagTheta) - imWidth / 2;
    y = ry * sin(flagTheta) - imHeight / 2;
    image(img, x, y, imWidth, imHeight);
  }
}


function drawLargeFlag()  {
  currentIndex = Math.round(map(hand.theta, 0, TAU, 0, images.length));
  currentIndex = constrain(currentIndex, 0, images.length - 1);
  var img = images[currentIndex];
  var w = img.width * 2;
  var h = img.height * 2;
  image(img, -w / 2, -h / 2, w, h);
  var oldCountry = currentCountry;
  currentCountry = countries[currentIndex];
  if (currentCountry != oldCountry) {
    print(currentCountry);
    playEnv();
  }
}
