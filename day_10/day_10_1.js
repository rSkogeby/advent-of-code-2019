const fs = require('fs');
let filename = process.argv[2] || 'inp.txt'
let f = fs.readFileSync(filename, 'utf8')
const m = f.split('\n').filter(item => item != '')


// check coordinate of each asteroid
// for each asteroid calculate number of unique angles to other asteroids
// asteroid with the highest number of unique angles wins

const grid = {
  x: m[0].length,
  y: m.length
}

// check coordinate of each asteroid
let asteroids = []
for (let x = 0; x < grid.x; x++) {
  for (let y = 0; y < grid.y; y++) {
    if (m[x][y] == '#') {
      asteroids.push({x: x, y: y})
    }
  }
}

// for each asteroid calculate number of unique angles to other asteroids
let asteroidMetaData = []
for (let monitoringStation of asteroids) {
  let uniqueAngles = new Set()
  for (let asteroid of asteroids) {
    if (asteroid != monitoringStation) {
      let prospect = getAngle(monitoringStation, asteroid)
      let angle = prospect.angle
      if (!uniqueAngles.has(angle)) {
        uniqueAngles.add(angle)
      }
    }
  }
  asteroidMetaData.push({coordinates: monitoringStation, asteroidsDetected: uniqueAngles.size , asts: uniqueAngles})
}

// asteroid with higest number of unique angles wins
monitoringStation = asteroidMetaData.reduce((mem,asteroid) => mem = (mem.asteroidsDetected<asteroid.asteroidsDetected) ? asteroid : mem, {asteroidsDetected: 0})
console.log('The maximum number of asteroids you can detect from any other asteroid is ' + monitoringStation.asteroidsDetected)

function getAngle(monitoringStation, asteroid) {
  let deltaX = asteroid.x - monitoringStation.x
  let deltaY = asteroid.y - monitoringStation.y
  let semisphere = (deltaX > 0) ? 1:0
  let angle = Math.atan(deltaY/deltaX) * 180/Math.PI
  if (semisphere == 0) {
    angle = angle + 180
  } else if (semisphere == 1) {
    if (angle < 0) {
      angle = angle + 360
    }
  }
  return {asteroid: asteroid, angle: angle}
}
