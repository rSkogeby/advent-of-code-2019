const intcode = require('./module.js')

const fs = require('fs'); let filename = process.argv[2] || 'inp.txt'
let f = fs.readFileSync(filename, 'utf8')
const m = f.split('\n').filter(item => item != '')
const opCode = m[0].split(',').map(item => parseInt(item))

let amplifierPhaseSetting = '01234'
let amplifier = {A: {}, B: {}, C: {}, D:{}, E:{}}

let maxThrustSetting = 0
let ampPhSet = amplifierPhaseSetting
for(let n1 of ampPhSet) {
  for (let n2 of ampPhSet) {
    for (let n3 of ampPhSet) {
      for (let n4 of ampPhSet) {
        for (let n5 of ampPhSet) {
          if (n1 != n2 && n1 != n3 && n1 != n4 && n1 != n5 &&
            n2 != n3 && n2 != n4 && n2 != n5 &&
            n3 != n4 && n3 != n5 &&
            n4 != n5) {
              amplifierPhaseSetting = n1+n2+n3+n4+n5
              // Amplifier A
              amplifier.A = {input: 0, phase: parseInt(amplifierPhaseSetting[0]), output: 0}
              amplifier.A.output = intcode.computer([amplifier.A.input, amplifier.A.phase], m[0].split(',').map(item => parseInt(item)))

              amplifier.B = {input: amplifier.A.output, phase: parseInt(amplifierPhaseSetting[1]), output: 0}
              amplifier.B.output = intcode.computer([amplifier.B.input, amplifier.B.phase], m[0].split(',').map(item => parseInt(item)))

              amplifier.C = {input: amplifier.B.output, phase: parseInt(amplifierPhaseSetting[2]), output: 0}
              amplifier.C.output = intcode.computer([amplifier.C.input, amplifier.C.phase], m[0].split(',').map(item => parseInt(item)))

              amplifier.D = {input: amplifier.C.output, phase: parseInt(amplifierPhaseSetting[3]), output: 0}
              amplifier.D.output = intcode.computer([amplifier.D.input, amplifier.D.phase], m[0].split(',').map(item => parseInt(item)))

              amplifier.E = {input: amplifier.D.output, phase: parseInt(amplifierPhaseSetting[4]), output: 0}
              amplifier.E.output = intcode.computer([amplifier.E.input, amplifier.E.phase], m[0].split(',').map(item => parseInt(item)))
              if(amplifier.E.output > maxThrustSetting) {
                maxThrustSetting = amplifier.E.output
              }
          }
        }
      }
    }
  }
}

console.log(maxThrustSetting)
