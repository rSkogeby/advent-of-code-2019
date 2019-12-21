const fs = require('fs');
let filename = process.argv[2] || 'inp.txt'
let f = fs.readFileSync(filename, 'utf8')
const m = f.split('\n').filter(item => item != '')


// check coordinate of each asteroid
// for each asteroid calculate number of unique angles to other asteroids
// asteroid with most unique angles wins

const grid = {
  x: m[0].length,
  y: m.length
}

let asteroids = []
for (let x = 0; x < grid.x; x++) {
  for (let y = 0; y < grid.y; y++) {
    if (m[x][y] == '#') {
      asteroids.push({x: x, y: y})
    }
  }
}

let asteroidMetaData = []
for (let monitoringStation of asteroids) {
  //console.log(asteroid)
  let uniqueAngles = new Set()
  for (let asteroid of asteroids) {
    if (asteroid != monitoringStation) {
      let prospect = getAngle(monitoringStation, asteroid)
      let angle = prospect.angle
      let quadrant = prospect.quadrant
      if (quadrant == 0) {
        angle = angle + 180
      } else if (quadrant == 1) {
        angle = angle
      }
      if (!uniqueAngles.has([angle,quadrant])) {
        uniqueAngles.add(angle)
      }
    }
  }
  asteroidMetaData.push({coordinates: monitoringStation, asteroidsDetected: uniqueAngles.size })
}

maxNumAsteroidsDetected = asteroidMetaData.reduce((mem,asteroid) => mem = (mem<asteroid.asteroidsDetected) ? asteroid.asteroidsDetected : mem, 0)
console.log('The maximum number of asteroids you can detect from any other asteroid is ' + maxNumAsteroidsDetected)

function getAngle(monitoringStation, asteroid) {
  let deltaX = asteroid.x - monitoringStation.x
  let deltaY = asteroid.y - monitoringStation.y
  let quadrant = (deltaX >= 0) ? 1:0
  let angle = Math.atan(deltaY/deltaX)*180/Math.PI + 90
  return {asteroid: asteroid, angle: angle, quadrant: quadrant}
}
