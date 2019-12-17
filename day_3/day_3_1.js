// find the intersection point closest to the central port.
// d = dx+dy
// rows = a b c
// cols = 1 2 3
//

// let m1 = [R75,D30,R83,U83,L12,D49,R71,U7,L72]
// let m2 = [U62,R66,U55,R34,D71,R55,D58,R83]

const fs = require('fs'); let filename = process.argv[2] || 'inp.txt'
let f = fs.readFileSync(filename, 'utf8')
const m = f.split('\n').filter(item => item != '')
const m1 = m[0].split(',')
const m2 = m[1].split(',')
// x1-x2=m(y1-y2)

let startPoint_1 = [0, 0]
let endPoint_1 = [0, 0]
const allPoints_1 = []
m1.forEach(function (element) {
  if (element[0] == 'R') {
    const p1 = startPoint_1
    const mxR = parseInt(element.split('R')[1])
    endPoint_1 = [endPoint_1[0] + mxR, endPoint_1[1]]
    const p2 = endPoint_1
    allPoints_1.push([p1, p2])
    startPoint_1 = endPoint_1
  } else if (element[0] == 'L') {
    const p1 = startPoint_1
    const mxL = parseInt(element.split('L')[1])
    endPoint_1 = [endPoint_1[0] - mxL, endPoint_1[1]]
    const p2 = endPoint_1
    allPoints_1.push([p1, p2])
    startPoint_1 = endPoint_1
  } else if (element[0] == 'U') {
    const p1 = startPoint_1
    const myU = parseInt(element.split('U')[1])
    endPoint_1 = [endPoint_1[0], endPoint_1[1] + myU]
    const p2 = endPoint_1
    allPoints_1.push([p1, p2])
    startPoint_1 = endPoint_1
  } else if (element[0] == 'D') {
    const p1 = startPoint_1
    const myD = parseInt(element.split('D')[1])
    endPoint_1 = [endPoint_1[0], endPoint_1[1] - myD]
    const p2 = endPoint_1
    allPoints_1.push([p1, p2])
    startPoint_1 = endPoint_1
  }
})

const finalsol = []

let startPoint_2 = [0, 0]
let endPoint_2 = [0, 0]
const allPoints_2 = []
m2.forEach(function (element) {
  if (element[0] == 'R') {
    const p1 = startPoint_2
    const mxR = parseInt(element.split('R')[1])
    endPoint_2 = [endPoint_2[0] + mxR, endPoint_2[1]]
    const p2 = endPoint_2
    allPoints_2.push([p1, p2])
    startPoint_2 = endPoint_2
  } else if (element[0] == 'L') {
    const p1 = startPoint_2
    const mxL = parseInt(element.split('L')[1])
    endPoint_2 = [endPoint_2[0] - mxL, endPoint_2[1]]
    const p2 = endPoint_2
    allPoints_2.push([p1, p2])
    startPoint_2 = endPoint_2
  } else if (element[0] == 'U') {
    const p1 = startPoint_2
    const myU = parseInt(element.split('U')[1])
    endPoint_2 = [endPoint_2[0], endPoint_2[1] + myU]
    const p2 = endPoint_2
    allPoints_2.push([p1, p2])
    startPoint_2 = endPoint_2
  } else if (element[0] == 'D') {
    const p1 = startPoint_2
    const myD = parseInt(element.split('D')[1])
    endPoint_2 = [endPoint_2[0], endPoint_2[1] - myD]
    const p2 = endPoint_2
    allPoints_2.push([p1, p2])
    startPoint_2 = endPoint_2
  }
})
let intercept = []
for (let i = 0; i < allPoints_1.length; i++) {
  let line_seg_1 = {x_lo: Math.min(allPoints_1[i][0][0],allPoints_1[i][1][0]),
    x_hi: Math.max(allPoints_1[i][0][0],allPoints_1[i][1][0]),
    y_lo: Math.min(allPoints_1[i][0][1],allPoints_1[i][1][1]),
    y_hi: Math.max(allPoints_1[i][0][1],allPoints_1[i][1][1])}
  let d1x = (line_seg_1.x_hi - line_seg_1.x_lo)
  let d1y = (line_seg_1.y_hi - line_seg_1.y_lo)


  for (let j = 0; j < allPoints_2.length; j++) {
    let line_seg_2 = {x_lo: Math.min(allPoints_2[j][0][0],allPoints_2[j][1][0]),
                      x_hi: Math.max(allPoints_2[j][0][0],allPoints_2[j][1][0]),
                      y_lo: Math.min(allPoints_2[j][0][1],allPoints_2[j][1][1]),
                      y_hi: Math.max(allPoints_2[j][0][1],allPoints_2[j][1][1])}

    let d2x = (line_seg_2.x_hi - line_seg_2.x_lo)
    let d2y = (line_seg_2.y_hi - line_seg_2.y_lo)


    // Conditions if they overlap:
    if (d1x == 0 && d2x != 0) {     // Cond. 1: They are not parallel

      // line_seg_1.x_hi == line_seg_1.x_lo
      let line_seg_1_x = line_seg_1.x_hi // === line_seg_1.x_lo
      if (line_seg_1_x <= line_seg_2.x_hi && line_seg_1_x >= line_seg_2.x_lo) {       // Cond. 2: They overlap in x
        // line_seg_2.y_hi == line_seg_2.y_lo
        let line_seg_2_y = line_seg_2.y_hi // === line_seg_1.x_lo
        if (line_seg_2_y <= line_seg_1.y_hi && line_seg_2_y >= line_seg_1.y_lo) {         // Cond. 3: They overlap in y
          intercept.push({x: line_seg_1_x, y: line_seg_2_y})
        }
      }
    } else if (d1x != 0 && d2x == 0) {     // Cond. 1: They are not parallel
      // line_seg_2.x_hi == line_seg_2.x_lo
      let line_seg_2_x = line_seg_2.x_hi // === line_seg_2.x_lo
      if (line_seg_2_x <= line_seg_1.x_hi && line_seg_2_x >= line_seg_1.x_lo) {       // Cond. 2: They overlap in x
        // line_seg_1.y_hi == line_seg_1.y_lo
        let line_seg_1_y = line_seg_1.y_hi // === line_seg_1.x_lo
        if (line_seg_1_y <= line_seg_2.y_hi && line_seg_1_y >= line_seg_2.y_lo) {        // Cond. 3: They overlap in y
          intercept.push({x: line_seg_2_x, y: line_seg_1_y})
      }
    }
  }



}
}

  //if (intercept != null) {
    const dist = intercept.map(point => Math.abs(point.x) + Math.abs(point.y)).filter(distance => distance != 0)
    const min_dist = dist.reduce((mem, d) => mem=d<mem?d:mem,9999999)
    console.log(min_dist)

    //if (dis > 0) finalsol.push(dis)
  //}
