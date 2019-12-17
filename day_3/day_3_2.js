// find the intersection point closest to the central port.
// d = dx+dy
// rows = a b c
// cols = 1 2 3
//

// let m1 = [R75,D30,R83,U83,L12,D49,R71,U7,L72]
// let m2 = [U62,R66,U55,R34,D71,R55,D58,R83]


function parseInputLine(line) {
  const instructions = line.split(',')
  let coords_current = [0,0]
  let id = 0
  let totalSegDistance = 0

  return instructions.map(function(instruction) {
    const direction = instruction[0]
    const distance = parseInt(instruction.slice(1))
    const result = {id: id++, startX: coords_current[0], startY: coords_current[1],
      orthogonality: (direction=='R'||direction=='L')?'horizontal':'vertical', direction: direction,
      hasIntersection: false,
      intersections: {
        point: [] ,
        id: []
      },
      distanceUntilSegment: 0,
      segmentLength: totalSegDistance}

    switch (direction) {
      case 'R':
        coords_current[0] = coords_current[0] + distance
        break
      case 'L':
        coords_current[0] = coords_current[0] - distance
        break
      case 'U':
        coords_current[1] = coords_current[1] + distance
        break
      case 'D':
        coords_current[1] = coords_current[1] - distance
        break
    }
    result.distanceUntilSegment = totalSegDistance
    totalSegDistance += distance
    result.segmentLength = distance
    result.endX = coords_current[0]
    result.endY = coords_current[1]
    return result
  })
}

function getLineIntercept (segment1,segment2) {
  // Return true if lines intercept, else return false
  let intersection = {x: 0, y:0, exists: false}
  if (segment1.orthogonality == segment2.orthogonality) {
    intersection.exists = false
    return intersection
  }

  x1 = {i: segment1.startX, f: segment1.endX}
  x2 = {i: segment2.startX, f: segment2.endX}
  y1 = {i: segment1.startY, f: segment1.endY}
  y2 = {i: segment2.startY, f: segment2.endY}

  if (segment1.orthogonality == 'horizontal') { // y1 =  const, x2 = const
    if (y1.i >= Math.min(y2.i,y2.f) && y1.i <= Math.max(y2.i,y2.f) &&
      x2.i >= Math.min(x1.i,x1.f) && x2.i <=  Math.max(x1.i,x1.f) ) { //
      //They intersect
      intersection.exists = true
      intersection.y = y1.i
      intersection.x = x2.i
      return intersection
    }
  } else if (segment1.orthogonality == 'vertical') { // x1 =  const, y2 = const
    if (x1.i >= Math.min(x2.i,x2.f) && x1.i <= Math.max(x2.i,x2.f) &&
        y2.i >= Math.min(y1.i,y1.f) && y2.i <= Math.max(y1.i,y1.f) ) { //
      //They intersect
      intersection.exists = true
      intersection.y = y2.i
      intersection.x = x1.i
      return intersection
    }
  }
  return intersection
}

// Read file
const fs = require('fs'); let filename = process.argv[2] || 'inp.txt'
let f = fs.readFileSync(filename, 'utf8')
const m = f.split('\n').filter(item => item != '')

// Parse input to object
const line_1 = parseInputLine(m[0])
totalSegDistance = 0
const line_2 = parseInputLine(m[1])

// Add intersections to objects
for (let segment_1 of line_1) {
  for (let segment_2 of line_2) {
    let lineIntercept = getLineIntercept(segment_1, segment_2)
    if (lineIntercept.exists == false) {
      continue
    } else {
      segment_1.hasIntersection = true
      segment_1.intersections.point.push([lineIntercept.x,lineIntercept.y])
      segment_1.intersections.id.push(segment_2.id)
     // console.log(segment_1)
    }
  }
}


// Check where intersection occurs and filter out the origin
segmentsWithIntersections = line_1.filter(seg => seg.hasIntersection == true && seg.id != 0)

// Find manhattan distance to origin for each intersection
let min_manhattan_distance = 9999
for (const segment of segmentsWithIntersections) {
  for (const point of segment.intersections.point){
    let d = Math.abs(point[0])+Math.abs(point[1])
    if (d < min_manhattan_distance) {
      min_manhattan_distance = d
    }
  }
}
console.log('The minimum Manhattan distance is ' + min_manhattan_distance)


// Part 2
for (const segment of line_1.filter(seg => seg.id != 0)) {
  if (segment.hasIntersection) {
    console.log(segment)
    console.log(segment.intersections.point[0])
    if (segment.orthogonality == 'vertical') {
      let distanceToIntersection_1 = segment.distanceUntilSegment + Math.abs(segment.intersections.point[0][1]-segment.startY)
      let segment2 = line_2[segment.intersections.id[0]]
      let distanceToIntersection_2 = segment2.distanceUntilSegment +  Math.abs(segment.intersections.point[0][0]-segment2.startX)
      let totalDistance = distanceToIntersection_1 + distanceToIntersection_2
      console.log(totalDistance)
    } else {
      let distanceToIntersection_1 = segment.distanceUntilSegment + Math.abs(segment.intersections.point[0][0]-segment.startX)
      let segment2 = line_2[segment.intersections.id[0]]
      let distanceToIntersection_2 = segment2.distanceUntilSegment +  Math.abs(segment.intersections.point[0][1]-segment2.startY)
      let totalDistance = distanceToIntersection_1 + distanceToIntersection_2
      console.log(totalDistance)
    }
    break
  }
}
