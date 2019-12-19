// Read file
const fs = require('fs'); let filename = process.argv[2] || 'finalInput.txt'
let f = fs.readFileSync(filename, 'utf8')
const m = f.split('\n').filter(item => item != '')

function mapParser(mapInput) {

  let planets = new Map()

  for (orbit of mapInput) {
    let orbitalSplit = orbit.split(')')
    let planet = orbitalSplit[0]
    let moon = orbitalSplit[1]

    if (!planets.has(planet)){
      planets.set(planet, {mother: '', moons:[moon]})
    } else {
      planets.get(planet).moons.push(moon)
    }

    if (!planets.has(moon)) {
      planets.set(moon, {mother: planet, moons: []})
    } else {
      planets.get(moon).mother = planet
    }

  }

  return planets
}

function stepsToCOM(planet, planetMap, stepsFromStart) {
  let motherPlanet = planetMap.get(planet).mother
  if (motherPlanet != '') {
    stepsFromStart++
    if (motherPlanet != 'COM'){
      stepsFromStart = stepsToCOM(motherPlanet, planetMap, stepsFromStart)
    }
  } else {
   return stepsFromStart

  }
  return stepsFromStart
}

planetMap = mapParser(m)
let totalOrbits = 0
for (planet of planetMap) {
  console.log(planet[0])
  totalOrbits += stepsToCOM(planet[0],planetMap,0)
}

console.log('Total number of orbits is ' + totalOrbits)
