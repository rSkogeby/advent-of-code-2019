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
  totalOrbits += stepsToCOM(planet[0],planetMap,0)
}

console.log('Total number of orbits is ' + totalOrbits)




function stepsToSanta(planet, planetMap, stepsFromStart, passedPlanets, passedPlanetsSet) {
  const motherPlanet = planetMap.get(planet).mother
  if (motherPlanet != '') {
    stepsFromStart++
    passedPlanets.push(planet)
    passedPlanetsSet.add(planet)
    if (motherPlanet != 'COM') {
      [stepsFromStart, passedPlanets, passedPlanetsSet] = stepsToSanta(motherPlanet, planetMap, stepsFromStart, passedPlanets, passedPlanetsSet)
    }
  } else {
    return [stepsFromStart, passedPlanets, passedPlanetsSet]

  }
  return [stepsFromStart, passedPlanets, passedPlanetsSet]
}

const [stepsFromStart_YOU, passedPlanets_YOU, passedPlanetsSet_YOU] = stepsToSanta('YOU',planetMap,0,new Array(), new Set())
const [stepsFromStart_SAN, passedPlanets_SAN, passedPlanetsSet_SAN] = stepsToSanta('SAN',planetMap,0,new Array(), new Set())


let orbitsToSanta = 0
for (let count=0; count<passedPlanets_SAN.length; count++){
  if (passedPlanetsSet_YOU.has(passedPlanets_SAN[count])) {
    orbitsToSanta += count - 1
    break
  }
}

for (let count=0; count<passedPlanets_YOU.length; count++){
  if (passedPlanetsSet_SAN.has(passedPlanets_YOU[count])) {
    orbitsToSanta += count - 1
    break
  }
}

console.log('Number of orbit jumps to Santa is ' + orbitsToSanta)
