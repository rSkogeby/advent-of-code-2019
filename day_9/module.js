exports.computer = function (input, opCode, i) {
  let output = 0
  let relBase = 0
  while (1) {
    let oS = opCode[i[0]].toString()
    const mode = {
      A: (oS.length < 5) ? 0 : parseInt(oS[oS.length-5]),
      B: (oS.length < 4) ? 0 : parseInt(oS[oS.length-4]),
      C: (oS.length < 3) ? 0 : parseInt(oS[oS.length-3]),
      DE: (oS.length > 1) ? parseInt(oS[oS.length-2] + oS[oS.length-1]) : opCode[i[0]]
    }
// ================================
    let addr = {
      A: (mode.A == 0) ? opCode[i[0]+3] : (mode.A == 1) ? i[0]+3 : opCode[i[0]+3]+relBase,
      B: (mode.B == 0) ? opCode[i[0]+2] : (mode.B == 1) ? i[0]+2 : opCode[i[0]+2]+relBase,
      C: (mode.C == 0) ? opCode[i[0]+1] : (mode.C == 1) ? i[0]+1 : opCode[i[0]+1]+relBase
    }
    let A = opCode[addr.A]
    let B = opCode[addr.B]
    let C = opCode[addr.C]

    // Position mode
    if (mode.DE == 1) {
      opCode[addr.A] = B+C
      i[0] = i[0] + 4
    } else if (mode.DE == 2) {
      opCode[addr.A] = B*C
      i[0] = i[0] + 4
    } else if (mode.DE == 3) {
      opCode[addr.C] = input.shift()
      i[0] = i[0] + 2
    } else if (mode.DE == 4) {
      output = C
      i[0] = i[0] + 2
      return [C, 4]
    } else if (mode.DE == 5) {
      if (C != 0) {
        i[0] = B
      } else {
        i[0] = i[0] + 3
      }
    } else if (mode.DE == 6) {
      if (C == 0) {
        i[0] = B
      } else {
        i[0] = i[0] + 3
      }
    } else if (mode.DE == 7) {
      opCode[addr.A] = (C < B) ? 1 : 0
      i[0]=i[0]+4
    } else if (mode.DE == 8) {
      opCode[addr.A] = (C == B) ? 1 : 0
      i[0]=i[0]+4
    } else if (mode.DE == 9) {
      relBase += opCode[addr.C]
      i[0] += 2
    } else if (mode.DE == 99) {
      return [C, 99]
    }
  }
}
