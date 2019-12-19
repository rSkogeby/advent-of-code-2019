// Read file
const fs = require('fs'); let filename = process.argv[2] || 'inp.txt'
let f = fs.readFileSync(filename, 'utf8')
const m = f.split('\n').filter(item => item != '')


/*
planet1(
  'B': {
  orbit: 'COM',
  moons: ['C','D']
  }
)

planet2(
  'C': {
    orbit: 'B',
    moons: ['E']
  }
)
*/


function mapParser(mapInput) {

  let planets = new Map()

  for (orbit of mapInput) {
    let orbitalSplit = orbit.split(')')
    let planet = orbitalSplit[0]
    let moon = orbitalSplit[1]

    if (!planets.has(planet)){
      planets.set(planet, {orbits: '', moons:[moon]})
    } else {
      planets.get(planet).moons.push(moon)
    }

    if (!planets.has(moon)) {
      planets.set(moon, {orbits: planet, moons: []})
    } else {
      planets.get(moon).orbits = planet
    }

  }

  return planets
}

function orbitDrawer (planetArray) {
  for (planet in planetArray) {
    continue
  }
}
//console.log(f)
astralMap = mapParser(m)
console.log(astralMap)
