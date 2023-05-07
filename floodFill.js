/* flood fill map starting at point p
 *
 */

let frontier = [];
let edge = [];
let count = 0;
let perimeter = 0;
let compactness = 0;

let history = new Set();

function isNear(a, b, limit) {
  return abs(a - b) <= limit;
}

// no idea why we need this.
let COLOR_LIMIT = 2;

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
  isEmpty = (isNear(_r, 0, COLOR_LIMIT) &&
    isNear(_g, 0, COLOR_LIMIT) &&
    isNear(_b, 0, COLOR_LIMIT));

  if (isEmpty) {
    map.set(p.x, p.y, DEFAULT_FILL);
    frontier.push(p);
  } else {
    edge.push(p);
  }
}

function checkFilled(map, p) {
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
  isFilled = (isNear(_r, DEFAULT_FILL, COLOR_LIMIT) &&
    isNear(_g, DEFAULT_FILL, COLOR_LIMIT) &&
    isNear(_b, DEFAULT_FILL, COLOR_LIMIT));

  if (isFilled) {
    count += 1;
    frontier.push(p);
  } else {
    edge.push(p);
  }
}

function floodFill(map, p) {
  print("Start Flood Fill");
  frontier = [];
  edge = [];
  frontier.push(p);

  map.stroke(DEFAULT_FILL);
  map.strokeWeight(STROKE_WEIGHT/2);

  history.clear();
  history.add(p);

  map.loadPixels();

  while (frontier.length) {
    p = frontier.pop();

    checkPixel(map, new Point(p.x + 1, p.y    ));
    checkPixel(map, new Point(p.x - 1, p.y    ));
    checkPixel(map, new Point(p.x, p.y + 1));
    checkPixel(map, new Point(p.x, p.y - 1));
  }

  map.updatePixels();

  // fill in the edge
  edge.forEach(e => map.point(e.x, e.y));
  edge = [];

  print("Finish Flood Fill");
}

function computePerimeter(edge) {
  // sort by x
  edge.sort((a, b) => (a.x - b.x));

  print(edge);

  history.clear();

  perim = 0;
  
  let start = edge[0];
  let last = [];
  
  let i = 0;
  let p;
  while (true) {
    p = edge[i];
    if (!p) { break; }
    
    true_dist = 0;
    history.add(p.toKey());
    // p's next neighbor must be either (-1, 0, +1) in each direction: check both sides
    // in the array
    offset = 1;
    while (abs(offset) < edge.length) {
      _offset = offset;
      offset = -offset;
      if (offset > 0) {
        offset += 1;
      }

      q = edge[i + _offset];
      if (!q) {
        continue;
      }
      if (history.has(q.toKey())) {
        continue;
      }

      d = p.oneAxisDistance(q);
      //print(p, q, d)
      if (d > 1) {
        continue;
      }
      if (d == 1) {
        true_dist = p.cartesianDist(q);
        perim += true_dist;  
        //print(`${p} -> ${q} (d ${d}, ${true_dist}) [p ${perim}]`)
        break;
      }
    }
    if (! true_dist) {
      // no neighbors found. either an issue or we're done.
      if (p.cartesianDist(start) < 2) {
        return perim;
      }
      print("WARNING: no neighbor for", p);
      i = last.pop();
      cornerError = p;
      //showStats = false;
      continue;
    }
    // last good one
    last.push(i);
    i += _offset;
  }

  return perim;
}

function calculate(map, p) {
  frontier = [];
  edge = [];
  count = 0;

  frontier.push(p);

  history.clear();
  history.add(p);

  map.loadPixels();


  while (frontier.length) {
    p = frontier.pop();

    checkFilled(map, new Point(p.x + 1, p.y));
    checkFilled(map, new Point(p.x - 1, p.y));
    checkFilled(map, new Point(p.x, p.y + 1));
    checkFilled(map, new Point(p.x, p.y - 1));
  }

  map.updatePixels();

  print("count", count);
  //print("edge", edge);
  perimeter = computePerimeter(edge);
  compactness = (4 * PI * count) / (perimeter * perimeter);
  print("compactness", compactness);
  print("perim", perimeter, "edge len", edge.length);

  return edge;
}
