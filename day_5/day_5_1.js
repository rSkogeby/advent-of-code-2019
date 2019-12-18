// Read file
const fs = require('fs'); let filename = process.argv[2] || 'inp.txt'
let f = fs.readFileSync(filename, 'utf8')
const m = f.split('\n').filter(item => item != '')


let opCode = m[0].split(',').map(item => parseInt(item))
//opCode[1] = 51
//opCode[2] = 21
let i = 0
while (1) {
    //opcode[i] = 100002 // 1 0 0
    //opcode[i] = 1001 // 0 1 0
    //opcode[i] = 101 // 0 0 1
    // Immediate mode

  let A = 0
  let B = 0
  let C = 0
  let opCodeObject = {A: 0, B: 0, C: 0, DE: 0}
  if (opCode[i] > 99) {
    oS = opCode[i].toString()
    opCodeObject.DE = parseInt(oS[oS.length-2] + oS[oS.length-1])
    if (oS.length == 5) {
      opCodeObject.A = parseInt(oS[0])
      opCodeObject.B = parseInt(oS[1])
      opCodeObject.C = parseInt(oS[2])
    } else if (oS.length == 4) {
      opCodeObject.A = 0
      opCodeObject.B = parseInt(oS[0])
      opCodeObject.C = parseInt(oS[1])
    } else if (oS.length == 3) {
      opCodeObject.A = 0
      opCodeObject.B = 0
      opCodeObject.C = parseInt(oS[0])
    }
  } else {
    opCodeObject.DE = opCode[i]
  }
  //================================
  // Immediate mode
  switch(opCodeObject.A) {
    case 0:
      A = opCode[opCode[i+3]]
      break
    case 1:
      A = opCode[i+3]
      break
  }
  switch(opCodeObject.B) {
    case 0:
      B = opCode[opCode[i+2]]
      break
    case 1:
      B = opCode[i+2]
      break
  }
  switch(opCodeObject.C) {
    case 0:
      C = opCode[opCode[i+1]]
      break
    case 1:
      C = opCode[i+1]
      break
  }

  // Position mode
  if (opCodeObject.DE == 1) {
      //opCode[i+3] = opCode[opCode[i+1]]+opCode[opCode[i+2]]
      if (opCodeObject.A == 0) {
        opCode[opCode[i+3]] = B+C
        i = i + 4
      } else if (opCodeObject.A == 1) {
        A = B+C
        i = i + 4
      }
  } else if (opCodeObject.DE == 2) {
    if (opCodeObject.A == 0) {
      opCode[opCode[i+3]] = B*C
      i = i + 4
    } else if (opCodeObject.A == 1) {
      A = B*C
      i = i + 4
    }
  } else if (opCodeObject.DE == 3) {
    if (opCodeObject.C == 0){
      opCode[opCode[i+1]] = 1
      i = i + 2
    } else if (opCodeObject.C == 1) {
      i = i + 2
    }
  } else if (opCodeObject.DE == 4) {
    console.log(C)
    i = i + 2
  } else if (opCodeObject.DE == 99) {
      console.log(opCode[i])
      break
  }
}
