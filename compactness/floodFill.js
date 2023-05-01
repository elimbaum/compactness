/* flood fill map starting at point p
 *
 */

let frontier = [];

let history = new Set();

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

}

function floodFill(map, p) {
  print("Start Flood Fill");
  FILL = color(255, 127, 0);
  frontier = [];
  frontier.push(p);

  map.stroke(255);
  map.strokeWeight(5);
  map.fill(255, 127, 0);

  history.clear();
  history.add(p);

  map.loadPixels();

  while (frontier.length) {
    p = frontier.pop()

    p2 = new Point(p.x + 1, p.y);
    if (checkPixel(map, p2)) {
      map.set(p2.x, p2.y, FILL);
      frontier.push(p2);
    }
    p2 = new Point(p.x - 1, p.y);
    if (checkPixel(map, p2)) {
      map.set(p2.x, p2.y, FILL);
      frontier.push(p2);
    }
    p2 = new Point(p.x, p.y + 1);
    if (checkPixel(map, p2)) {
      map.set(p2.x, p2.y, FILL);
      frontier.push(p2);
    }
    p2 = new Point(p.x, p.y - 1);
    if (checkPixel(map, p2)) {
      map.set(p2.x, p2.y, FILL);
      frontier.push(p2);
    }    
  }
  
  map.updatePixels();

  print("Finish Flood Fill");
}
