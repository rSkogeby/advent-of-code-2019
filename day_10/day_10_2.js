const fs = require('fs');
let filename = process.argv[2] || 'inp.txt'
let f = fs.readFileSync(filename, 'utf8')
const m = f.split('\n').filter(item => item != '')


// check coordinate of each asteroid
// for each asteroid calculate number of unique angles to other asteroids
// asteroid with the highest number of unique angles wins

const grid = {
  x: m.length,
  y: m[0].length
}

// check coordinate of each asteroid
let asteroids = []
for (let x = 0; x < grid.x; x++) {
  for (let y = 0; y < grid.y; y++) {
    if (m[y][x] == '#') {
      asteroids.push({x: x, y: y})
    }
  }
}

// for each asteroid calculate number of unique angles to other asteroids
let asteroidMetaData = []
for (let monitoringStation of asteroids) {
  let uniqueAngles = new Set()
  let asteroidData = new Array()
  let anglesArray = new Array()
  for (let asteroid of asteroids) {
    if (asteroid != monitoringStation) {
      let prospect = getAngle(monitoringStation, asteroid)
      let angle = prospect.angle
      asteroidData.push({coords: prospect.asteroid, angle: angle})
      if (!uniqueAngles.has(angle)) {
        uniqueAngles.add(angle)
        anglesArray.push(angle)
      }
    }
  }
  asteroidMetaData.push({coordinates: monitoringStation, asteroidsDetected: uniqueAngles.size , uniqueAngles: anglesArray, asteroidData: asteroidData})
}

// asteroid with higest number of unique angles wins
let monitoringStation = asteroidMetaData.reduce((mem,asteroid) => mem = (mem.asteroidsDetected<asteroid.asteroidsDetected) ? asteroid : mem, {asteroidsDetected: 0})
//console.log(monitoringStation.asts)
console.log('The maximum number of asteroids you can detect from any other asteroid is ' + monitoringStation.asteroidsDetected)

stationCoords = monitoringStation.coordinates
console.log('The coordinates for the deployed Monitoring Station are ' + '(' + stationCoords.x + ',' + stationCoords.y + ')')

function getAngle(monitoringStation, asteroid) {
  let deltaX = asteroid.x - monitoringStation.x
  let deltaY = monitoringStation.y - asteroid.y
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


// for each unique angle keep a list of asteroids
// sort list by absolute distance from monitoringStation, shortest dist first
// starting at 90->0 deg, then 0->270 deg and so on
// for each angle, if .length!=0 do .shift()
// count until 200 shifts

// for each unique angle keep a list of asteroids
let angleMap = new Map()
for (let asteroid of monitoringStation.asteroidData) {
  let deltaX = asteroid.coords.x - monitoringStation.coordinates.x
  let deltaY = asteroid.coords.y - monitoringStation.coordinates.y
  asteroid.distance = Math.sqrt(deltaX*deltaX + deltaY*deltaY)
  if (angleMap.has(asteroid.angle)) {
    angleMap.get(asteroid.angle).push(asteroid)
  } else {
    angleMap.set(asteroid.angle, [asteroid])
  }
}

//angleMap.map(angle => angle.)


// sort list by absolute distance from monitoringStation, shortest dist first
// Set iterator
let angles = monitoringStation.uniqueAngles.sort((a,b) => a=b-a)
let sortedAngles = []
for (let itr = 0; itr < angles.length; itr++) {
  let tmp = angles.pop()
  angles.unshift(tmp)
  if (tmp == 90) {
    break
  }
}

let loops = 0
let count = 0
let currentAsteroid = 0
let oneMore = 1
while(oneMore) {

  for (angle of angles) {
    oneMore = 0
    let asteroidsInAngle = angleMap.get(angle)
    asteroidsInAngle.sort((a,b) =>  (a.distance > b.distance) ? 1 : -1)
    if (asteroidsInAngle.length > 0) {
      currentAsteroid = asteroidsInAngle.shift()
      count++
      oneMore = 1
    }

    if (count == 200) {
      break
    }

  }
  if (count == 200) {
    break
  }
  loops++
  //console.log(loops)

}

console.log('X*100+Y = ' + parseInt(currentAsteroid.coords.x*100+currentAsteroid.coords.y))
