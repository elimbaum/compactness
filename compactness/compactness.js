const STROKE_WEIGHT = 10;
const PIXEL_DENSITY = 1;

let map;

function setupFormat() {
  map.stroke(255);
  map.strokeWeight(STROKE_WEIGHT);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(PIXEL_DENSITY);
  
  map = createGraphics(windowWidth, windowHeight);
  map.pixelDensity(PIXEL_DENSITY);

  map.background(0);
  fill(255);
  textSize(16);

  setupFormat();
}

let lastP = null;
let isDrawing = false;

function getStatusText() {
  s = "";
  if (isDrawing) {
    s += "drawing";
  } else {
    s += "viewing";
  }

  return s;
}

function draw() {
  background(0);

  if (isDrawing) {
    let p = new Point(mouseX, mouseY);
    if (lastP != p) {
      map.line(lastP.x, lastP.y, p.x, p.y);
      lastP = p;
    }
  }

  image(map, 0, 0, width, height);
  text(getStatusText(), 10, 20);
}

function mouseClicked() {
  isDrawing = ! isDrawing;
  if (isDrawing) {
    lastP = new Point(mouseX, mouseY);
  }
}

let ERASE_KEY = 'x';
let FILL_KEY = 'f';

function keyPressed() {
  if (key == ERASE_KEY) {
    map.background(0);
    isDrawing = false;
    return;
  }
  
  if (key == FILL_KEY) {
    floodFill(map, new Point(mouseX, mouseY));
    setupFormat();
  }
}
