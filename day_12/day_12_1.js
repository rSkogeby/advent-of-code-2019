const fs = require('fs');
let filename = process.argv[2] || 'finp.txt'
let f = fs.readFileSync(filename, 'utf8')
const m = f.split('\n').filter(item => item != '')

// Track four largest moons on approach to Jupiter: Io, Europa, Ganymede and Callisto
// Scan moons and calculate position (this is the input)
// Simulate motion to avoid them
let moons = parseInput(m)


let numberOfSteps = 1000
for (let step = 0; step < numberOfSteps; step++) {
  moons = updateVelocity(moons)
  moons = updatePosition(moons)
  moons = updateEnergy(moons)
}
let totalEnergy = getTotalEnergy(moons)

console.log(totalEnergy)

function parseInput (m) {
  let moons = new Map()
  let moonNames = ['Io', 'Europa', 'Ganymede', 'Callisto']
  for (let item of m) {
    item = item.replace('>','')
    let coordinateValues = item.split(',')
    let moonName = moonNames.pop()
    let data = {
      position: {
        x: parseInt(coordinateValues[0].split('=')[1]),
        y: parseInt(coordinateValues[1].split('=')[1]),
        z: parseInt(coordinateValues[2].split('=')[1])
      },
      velocity: {x: 0, y: 0, z: 0},
      energy: {
        total: 0,
        kinetic: 0,
        potential: 0
      }
    }
    moons.set(moonName, data)
  }
  return moons
}
function updateVelocity(moons) {
  for (let [moon, data] of moons) {
    for (let [otherMoon, otherData] of moons) {
      if (moon != otherMoon) {
        data.velocity.x = (data.position.x > otherData.position.x) ?
          data.velocity.x - 1 : (data.position.x == otherData.position.x) ?
          data.velocity.x : data.velocity.x + 1
        data.velocity.y = (data.position.y > otherData.position.y) ?
          data.velocity.y - 1 : (data.position.y == otherData.position.y) ?
          data.velocity.y : data.velocity.y + 1
        data.velocity.z = (data.position.z > otherData.position.z) ?
          data.velocity.z - 1 : (data.position.z == otherData.position.z) ?
          data.velocity.z : data.velocity.z + 1
      }
    }
  }
  return moons
}

function updatePosition(moons) {
  for (let [moon, data] of moons) {
    data.position.x = data.position.x + data.velocity.x
    data.position.y = data.position.y + data.velocity.y
    data.position.z = data.position.z + data.velocity.z
  }
  return moons
}

function updateEnergy (moons) {
  for (let [moon, data] of moons) {
      data.energy.potential = Math.abs(data.position.x) + Math.abs(data.position.y) + Math.abs(data.position.z)
      data.energy.kinetic = Math.abs(data.velocity.x) + Math.abs(data.velocity.y) + Math.abs(data.velocity.z)
      data.energy.total = data.energy.potential * data.energy.kinetic // this expression hurts me too ...
  }
  return moons
}

function getTotalEnergy (moons) {
  let totalEnergy = 0
  for (let [moon, data] of moons) {
    totalEnergy += data.energy.total
  }
  return totalEnergy
}
