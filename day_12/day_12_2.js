const fs = require('fs');
let filename = process.argv[2] || 'finp.txt'
let f = fs.readFileSync(filename, 'utf8')
const m = f.split('\n').filter(item => item != '')
let moons = parseInput(m)

// Steps before previous position is encountered
let exploredSpace = new Map()
let step = 0
let params = ['x','y','z']
let spaceSteps = []
for (let param of params) {
  while(1) {
    moons = updateVelocity(moons,param)
    moons = updatePosition(moons,param)
    let spaceKeyX = getTotalPositionKey(moons, param)
    if (exploredSpace.has(spaceKeyX)) {
      let stepsTaken = step - exploredSpace.get(spaceKeyX)
      console.log('We have been here before! Only ' + stepsTaken + ' steps ago!')
      spaceSteps.push(stepsTaken)
      break
    } else {
      try {
        exploredSpace.set(spaceKeyX, step)
      } catch(error) {
        console.log('SpaceKey = ' + spaceKeyX)
        console.log('Step = ' + step)
        break
      }
    }
    step++
  }
}

let LCM = getLowestCommonMultiple(spaceSteps)
console.log('The total number of time steps until a system reset is', LCM)

function getLowestCommonMultiple (spaceSteps) {
  let multiplierA = 1
  let multiplierB = 1
  let planeA = spaceSteps[0]
  let planeB = spaceSteps[1]
  let productA = planeA * multiplierA++
  let productB = planeB * multiplierB++
  while (productA != productB) {
    if (productA < productB) {
      productA = planeA * multiplierA++
    } else {
      productB = planeB * multiplierB++
    }
  }
  if (spaceSteps.length > 2) {
    spaceSteps[1] = productA
    productA = getLowestCommonMultiple(spaceSteps.splice(1, spaceSteps.length-1))
  }
  return productA
}

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
function updateVelocity(moons, param) {
  for (let [moon, data] of moons) {
    for (let [otherMoon, otherData] of moons) {
      if (moon != otherMoon) {
        data.velocity[param] = (data.position[param] > otherData.position[param]) ?
          data.velocity[param] - 1 : (data.position[param] == otherData.position[param]) ?
          data.velocity[param] : data.velocity[param] + 1
      }
    }
  }
  return moons
}

function updatePosition(moons,param) {
  for (let [moon, data] of moons) {
    data.position[param] = data.position[param] + data.velocity[param]
  }
  return moons
}

function getTotalPositionKey (moons, param) {
  let idArray = []
  for (let [moon, data] of moons) {
    idArray.push(data.position[param])
    idArray.push(data.velocity[param])
  }
  return idArray.join("")
}
