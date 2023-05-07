const STROKE_WEIGHT = 5;
const PIXEL_DENSITY = 2;

const DEFAULT_FILL = 200;

let map;

function setupFormat() {
  map.stroke(DEFAULT_FILL);
  map.strokeWeight(STROKE_WEIGHT);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
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
let isErasing = false;
let isCalculating = false;

let showStats = false;

let cornerError = null;

let startup = true;

function getStatusText() {
  s = "";
  if (isDrawing) {
    s += "drawing";
  } else if (isErasing) {
    s += "erasing";
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

  if (!!cornerError) {
    s += "\nwarning! try fixing the corner."
  }

  return s;
}

function draw_help_text() {
    kbd = [
      "instructions",
      "",
      "click: draw/stop drawing",
      "Q: erase entire screen",
      "E: erase tool",
      "F: flood fill under mouse",
      "C: calculate compactness under mouse",
    ];
    
    text("\n" + kbd.join("\n"), 10, height - 16 * 1.5 * kbd.length);
}

function draw() {
  background(0);

  if (isDrawing || isErasing) {
    //showStats = false;
    let p = new Point(mouseX, mouseY);
    if (lastP != p) {
      map.push();
      if (isErasing) {
        map.stroke(0);
      }
      map.line(lastP.x, lastP.y, p.x, p.y);
      map.pop();
      lastP = p;
    }
  }

  image(map, 0, 0, width, height);
  
  push();
  fill(255);
  text(getStatusText(), 10, 20);
  draw_help_text();
  pop();
  
  push();
  strokeWeight(2);
  stroke('red');
  edge.forEach(e => point(e.x, e.y));
  pop();

  if (!!cornerError) {
    push();
    stroke('cyan');
    strokeWeight(5);
    point(cornerError.x, cornerError.y);
    pop();
  }

}

function mouseClicked() {
  if (isErasing) {
    isDrawing = false;
  } else {
     isDrawing = ! isDrawing;
  }
  
  isErasing = false;
  cornerError = false;
  
  if (isDrawing) {
    lastP = new Point(mouseX, mouseY);
  }
}

let ERASE_SCREEN_KEY = 'q';
let ERASE_KEY = 'e';
let FILL_KEY = 'f';
let CALC_KEY = 'c';
let INSPECT_KEY = 'i';

function keyPressed() {
  cornerError = false;
  isErasing = false;
  
  if (key == ERASE_SCREEN_KEY) {
    showStats = false;
    map.background(0);
    edge = [];
    isDrawing = false;
  } else if (key == ERASE_KEY) {
    lastP = lastP = new Point(mouseX, mouseY);
    isErasing = true;
    isDrawing = false
  } else if (key == FILL_KEY) {
    //showStats = false;
    floodFill(map, new Point(mouseX, mouseY));
  } else if (key == CALC_KEY) {
    isCalculating = true;
    showStats = true;
    calculate(map, new Point(mouseX, mouseY));
    isCalculating = false;
  } else if (key == INSPECT_KEY) {
    x = mouseX;
    y = mouseY;
    print("color @", x, y, map.get(x, y));
  }

  setupFormat();
}
