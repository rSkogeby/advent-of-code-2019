const intcode = require('./module_2.js')

const fs = require('fs');
let filename = process.argv[2] || 'finp.txt'
let f = fs.readFileSync(filename, 'utf8')
const m = f.split('\n').filter(item => item != '')
const opCode = m[0].split(',').map(item => parseInt(item))

function amplifierModifications(phase, m) {
  let amp = {
    A: {input: [parseInt(phase[0])], output: [0,0], i: [0], opCode: m[0].split(',').map(item => parseInt(item))},
    B: {input: [parseInt(phase[1])], output: [0,0], i: [0], opCode: m[0].split(',').map(item => parseInt(item))},
    C: {input: [parseInt(phase[2])], output: [0,0], i: [0], opCode: m[0].split(',').map(item => parseInt(item))},
    D: {input: [parseInt(phase[3])], output: [0,0], i: [0], opCode: m[0].split(',').map(item => parseInt(item))},
    E: {input: [parseInt(phase[4])], output: [0,0], i: [0], opCode: m[0].split(',').map(item => parseInt(item))}
  }

let maxThrusterSignal = 0
while (amp.E.output[1] != 99) {
    amp.A.input.push(amp.E.output[0])
    amp.A.output = intcode.computer(amp.A.input, amp.A.opCode, amp.A.i)
    if (amp.A.output[1] == 99) {
      break
    }
    amp.B.input.push(amp.A.output[0])
    amp.B.output = intcode.computer(amp.B.input, amp.B.opCode, amp.B.i)

    amp.C.input.push(amp.B.output[0])
    amp.C.output = intcode.computer(amp.C.input, amp.C.opCode, amp.C.i)

    amp.D.input.push(amp.C.output[0])
    amp.D.output = intcode.computer(amp.D.input, amp.D.opCode, amp.D.i)

    amp.E.input.push(amp.D.output[0])
    amp.E.output = intcode.computer(amp.E.input, amp.E.opCode, amp.E.i)
    console.log(amp.E.output)
  }
  return amp
}
let amplifierPhaseSetting = '98765'
let amplifier = amplifierModifications(amplifierPhaseSetting, m)

let maxThrustSetting = 0
let ampPhSet = amplifierPhaseSetting
for (let n1 of ampPhSet) {
  for (let n2 of ampPhSet) {
    for (let n3 of ampPhSet) {
      for (let n4 of ampPhSet) {
        for (let n5 of ampPhSet) {
          if (n1 != n2 && n1 != n3 && n1 != n4 && n1 != n5 &&
            n2 != n3 && n2 != n4 && n2 != n5 &&
            n3 != n4 && n3 != n5 &&
            n4 != n5) {
            amplifierPhaseSetting = n1 + n2 + n3 + n4 + n5
            let amplifier = amplifierModifications(amplifierPhaseSetting, m)
            if (amplifier.E.output[0] > maxThrustSetting) {
              maxThrustSetting = amplifier.E.output[0]
            }
          }
        }
      }
    }
  }
}
console.log(maxThrustSetting)
