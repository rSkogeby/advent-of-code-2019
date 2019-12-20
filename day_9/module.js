exports.computer = function (input, opCode, i) {
  let output = 0
  let relativeBase = 0
  while (1) {
    let A = 0
    let B = 0
    let C = 0
    let oS = opCode[i[0]].toString()
    const opCodeObject = {
      A: (oS.length < 5) ? 0 : parseInt(oS[oS.length-5]),
      B: (oS.length < 4) ? 0 : parseInt(oS[oS.length-4]),
      C: (oS.length < 3) ? 0 : parseInt(oS[oS.length-3]),
      DE: (oS.length > 1) ? parseInt(oS[oS.length-2] + oS[oS.length-1]) : opCode[i[0]]
    }
// ================================
    switch (opCodeObject.A) {
      case 0:
        A = opCode[opCode[i[0]+3]]
        break
      case 1:
        A = opCode[i[0]+3]
        break
      case 2:
        A = opCode[opCode[i[0]+3]+relativeBase]
        break
    }
    switch (opCodeObject.B) {
      case 0:
        B = opCode[opCode[i[0]+2]]
        break
      case 1:
        B = opCode[i[0]+2]
        break
      case 2:
        B = opCode[opCode[i[0]+2]+relativeBase]
        break
    }
    switch (opCodeObject.C) {
      case 0:
        C = opCode[opCode[i[0]+1]]
        break
      case 1:
        C = opCode[i[0]+1]
        break
      case 2:
        C = opCode[opCode[i[0]+1]+relativeBase]
        break
    }

    // Position mode
    if (opCodeObject.DE == 1) {
      if (opCodeObject.A == 0) {
        opCode[opCode[i[0]+3]] = B+C
        i[0] = i[0] + 4
      } else if (opCodeObject.A == 1) {
        A = B+C
        i[0] = i[0] + 4
      } else if (opCodeObject.A == 2) {
        opCode[opCode[i[0]+3]+relativeBase] = B+C
        i[0] = i[0] + 4
      }
    } else if (opCodeObject.DE == 2) {
      if (opCodeObject.A == 0) {
        opCode[opCode[i[0]+3]] = B*C
      } else if (opCodeObject.A == 1) {
        A = B*C
      } else if (opCodeObject.A == 2) {
        opCode[opCode[i[0]+3]+relativeBase] = B*C
      }
      i[0] = i[0] + 4
    } else if (opCodeObject.DE == 3) {
      if (opCodeObject.C == 0) {
        opCode[opCode[i[0]+1]] = input.shift()
      } else if (opCodeObject.C == 1) {
      } else if (opCodeObject.C == 2) {
        opCode[opCode[i[0]+1]+relativeBase] = input.shift()
      }
      i[0] = i[0] + 2
    } else if (opCodeObject.DE == 4) {
      output = C
      i[0] = i[0] + 2
      return [C, 4]
    } else if (opCodeObject.DE == 5) {
      if (C != 0) {
        i[0] = B
      } else {
        i[0] = i[0] + 3
      }
    } else if (opCodeObject.DE == 6) {
      if (C == 0) {
        i[0] = B
      } else {
        i[0] = i[0] + 3
      }
    } else if (opCodeObject.DE == 7) {
      if (opCodeObject.A == 0) {
        if (C < B) {
          opCode[opCode[i[0]+3]] = 1
        } else {
          opCode[opCode[i[0]+3]] = 0
        }
      } else if (opCodeObject.A == 2) {
        if (C < B) {
          opCode[opCode[i[0]+3]+relativeBase] = 1
        } else {
          opCode[opCode[i[0]+3]+relativeBase] = 0
        }
      }
      i[0]=i[0]+4
    } else if (opCodeObject.DE == 8) {
      if (opCodeObject.A == 0) {
        if (C == B) {
          opCode[opCode[i[0]+3]] = 1
        } else {
          opCode[opCode[i[0]+3]] = 0
        }
      } else if (opCodeObject.A == 2) {
        if (C == B) {
          opCode[opCode[i[0]+3]+relativeBase] = 1
        } else {
          opCode[opCode[i[0]+3]+relativeBase] = 0
        }
      }
      i[0]=i[0]+4
    } else if (opCodeObject.DE == 9) {
      if (true) {
        relativeBase += opCode[i[0]+1]
      }
      i[0] += 2
    } else if (opCodeObject.DE == 99) {
      return [C, 99]
    }
  }
  return output
}
