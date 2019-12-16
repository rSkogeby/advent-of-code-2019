// Read the file and print its contents.
let fs = require('fs'), filename = process.argv[2];

let data = fs.readFileSync(filename, 'utf8')
let datas = data.split('\n').filter(item => item!='').map(item => parseInt(item, 10))

function getFuelMass(m) {
  if (m < 9) {
    return 0
  } else {
    let fuel_mass = Math.floor(m / 3) - 2
    let total_mass = fuel_mass + getFuelMass(fuel_mass)
    return total_mass
  }
}

//data=[1,2,3];
let f = datas.map(function(m) {
    total_mass=getFuelMass(m)
    return total_mass
  });// fuel required for a module

let s = f.reduce((mem, modu) => mem+modu, 0) // sum of all modules' fule consumptiom
console.log(s)
