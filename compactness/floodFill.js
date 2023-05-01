/* flood fill map starting at point p
 *
 */

let frontier = [];
let edge = [];

let history = new Set();

let FILL;

function checkPixel(map, p) {
  // https://p5js.org/reference/#/p5/pixels
  if (history.has(p.toKey())) {
    return false;
  }
  history.add(p.toKey());

  idx = 4 * (p.y * PIXEL_DENSITY * width * PIXEL_DENSITY + p.x * PIXEL_DENSITY);

  _r = map.pixels[idx];
  _b = map.pixels[idx + 1];
  _g = map.pixels[idx + 2];
  _a = map.pixels[idx + 3];
  isEmpty = (_r == 0 && _g == 0 && _b == 0);

  if (isEmpty) {
    map.set(p.x, p.y, FILL);
    frontier.push(p);
  } else {
    edge.push(p);
  }
}

function floodFill(map, p) {
  print("Start Flood Fill");
  FILL = color(255);
  frontier = [];
  edge = [];
  frontier.push(p);

  map.stroke(FILL);
  map.strokeWeight(STROKE_WEIGHT/2);

  history.clear();
  history.add(p);

  map.loadPixels();

  while (frontier.length) {
    p = frontier.pop();

    checkPixel(map, new Point(p.x + 1, p.y    ));
    checkPixel(map, new Point(p.x - 1, p.y    ));
    checkPixel(map, new Point(p.x    , p.y + 1));
    checkPixel(map, new Point(p.x    , p.y - 1));
  }
  
  map.updatePixels();
  
  // fill in the edge
  edge.forEach(e => map.point(e.x, e.y));
  
  print("Finish Flood Fill");
}
