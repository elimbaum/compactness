class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  
  equals(other) {
    return other.x == this.x && other.y == this.y;
  }
  
  toString() {
    return `(${this.x},${this.y})`;
   }
   
   toKey() {
     return this.x + "_" + this.y;
   }
}
