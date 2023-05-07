# compactness calculator

simple p5.js visual calculator for compactness.

instructions are included, but basics:
- click to toggle between drawing and viewing mode
- `q` to erase the entire screen
- `e` to enable the eraser tool
- `f` for flood fill (under mouse - should be an empty region)
- `c` to calculate compactness

live demo: [elibaum.com/compactness](https://elibaum.com/compactness)

more info: [wikipedia](https://en.wikipedia.org/wiki/Compactness_measure_of_a_shape)

## calculation

...is a bit janky, but good enough™. we perform the following steps:

1. flood fill again, but don't update any pixels
2. at the end of flood filling, the remaining pixels are the edge of our region
3. the area of our region is the number of pixels we flood-filled. this is an accurate measure of the area of the shape.
4. the perimeter is a bit trickier:
    1. take the edge points left over from the flood fill process
    2. sort by their x component
    3. starting at the first (i.e. leftmost) edge point, look for its nearest neighbor in the edge list. since we sorted, we know its neighbor can't be far (in either direction). of course, ignore all points already considered.
    4. if the neighbor is a cardinal direction away (U/D/L/R), add 1 to the perimeter. if it is a diagonal away, add $\sqrt 2$ (this helps us get a better approximation for, say, curves and angled lines)
    5. go around the entire shape, summing up these perimeters
    6. when we can't find a neighbor, we're either in an error case (see below) or done. we can check if we're done because we'll be right next to the starting point.
7. `compactness = 4 * pi * area / perimeter^2`

This seems to be a pretty good raster approximation!

- We expect squares to have compactness $4 \pi s^2 / (4s)^2 = \pi / 4 = 0.79$. this checks out.
- We expect circles to have compactness $4 \pi (\pi r^2) / (2 \pi r)^2 = 4 \pi^2 r^2 / 4 \pi^2 r^2 = 1$. If I'm really careful, I can get to about 0.9, but I think is a side effect of (a) sloppy drawing and (b) the perimeter approximation not being that good with curves. 

> sometimes, sharp corners create a warning. I suspect this is because the perimter-calculation algorithm attempts to walk the exterior of the region, and in certain cases, there will be a "one-way street" - specifically, a line of pixels in a row defining the perimeter. this shouldn't be an issue, generally, because when such a warning occurs, we pop a queue back to the last valid point.
