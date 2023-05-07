class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  
  equals(other) {
    return other.x == this.x && other.y == this.y;
  }
  
  oneAxisDistance(other) {
    return max(abs(other.x - this.x), abs(other.y - this.y));
  }
  
  cartesianDist(other) {
    let dx = other.x - this.x;
    let dy = other.y - this.y;
    return sqrt(dx * dx + dy * dy);
  }
  
  toString() {
    return `(${this.x},${this.y})`;
  }
   
  toKey() {
     return this.x + "_" + this.y;
  }
}
