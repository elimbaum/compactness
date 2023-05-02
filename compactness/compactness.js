const STROKE_WEIGHT = 5;
const PIXEL_DENSITY = 2;

const DEFAULT_FILL = 200;

let map;

function setupFormat() {
  map.stroke(DEFAULT_FILL);
  map.strokeWeight(STROKE_WEIGHT);
}

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  pixelDensity(PIXEL_DENSITY);

  map = createGraphics(width, height);
  map.pixelDensity(PIXEL_DENSITY);

  map.background(0);
  fill(DEFAULT_FILL);
  textSize(16);

  setupFormat();

  //map.drawingContext.imageSmoothingEnabled = false;
  //drawingContext.imageSmoothingEnabled = false;
}

let lastP = null;
let isDrawing = false;
let isCalculating = false;

let showStats = false;

function getStatusText() {
  s = "";
  if (isDrawing) {
    s += "drawing";
  } else {
    s += "viewing";
  }
  
  if (isCalculating) {
    s += "\ncalculating...";
  }
  
  if (showStats) {
    c = compactness;
    s += `\narea: ${count}\nperim: ${perimeter.toFixed(2)}\nc: ${c.toFixed(2)}\n1/c: ${(1/c).toFixed(2)}`
  }

  return s;
}

function draw() {
  background(0);

  if (isDrawing) {
    //showStats = false;
    let p = new Point(mouseX, mouseY);
    if (lastP != p) {
      map.line(lastP.x, lastP.y, p.x, p.y);
      lastP = p;
    }
  }

  image(map, 0, 0, width, height);
  text(getStatusText(), 10, 20);
  
  push();
  strokeWeight(2);
  stroke('red');
  edge.forEach(e => point(e.x, e.y));
  pop();
}

function mouseClicked() {
  isDrawing = ! isDrawing;
  if (isDrawing) {
    lastP = new Point(mouseX, mouseY);
  }
}

let ERASE_KEY = 'x';
let FILL_KEY = 'f';
let CALC_KEY = 'c';
let INSPECT_KEY = 'i';

function keyPressed() {
  if (key == ERASE_KEY) {
    showStats = false;
    map.background(0);
    edge = [];
    isDrawing = false;
  } else if (key == FILL_KEY) {
    //showStats = false;
    floodFill(map, new Point(mouseX, mouseY));
  } else if (key == CALC_KEY) {
    isCalculating = true;
    calculate(map, new Point(mouseX, mouseY));
    isCalculating = false;
    showStats = true;
  } else if (key == INSPECT_KEY) {
    x = mouseX;
    y = mouseY;
    print("color @", x, y, map.get(x, y));
  }

  setupFormat();
}
