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

  if (isEmpty) {
    map.point(p.x, p.y);
    frontier.push(p);
  }
}

function floodFill(map, p) {
  frontier = [];
  const FILL = color(127, 255, 0);
  
  map.stroke(255);
  map.strokeWeight(1);
  map.fill(255, 127, 0);

  history.clear();
  history.add(p);

  frontier.push(p);
  map.loadPixels();

  while (frontier.length) {
    p = frontier.pop();
    print(p.x, p.y);
    //print(history);

    checkPixel(map, new Point(p.x + 1, p.y));
    checkPixel(map, new Point(p.x - 1, p.y));
    checkPixel(map, new Point(p.x, p.y + 1));
    checkPixel(map, new Point(p.x, p.y - 1));
    
    map.rect(p.x, p.y, 2, 2);

    //p2 = new Point(p.x + 1, p.y);
    //if (checkPixel(map, p2)) {
    //  map.point(p2.x, p2.y);
    //  frontier.push(p2);
    //}
    
    //p2 = new Point(p.x - 1, p.y);
    //if (checkPixel(map, p2)) {
    //  map.point(p2.x, p2.y);
    //  frontier.push(p2);
    //}
    
    //p2 = new Point(p.x, p.y + 1);
    //if (checkPixel(map, p2)) {
    //  map.point(p2.x, p2.y);
    //  frontier.push(p2);
    //}
    
    //p2 = new Point(p.x, p.y - 1);
    //if (checkPixel(map, p2)) {
    //  map.point(p2.x, p2.y);
    //  frontier.push(p2);
    //}
    
    map.updatePixels();
  }
  
}
