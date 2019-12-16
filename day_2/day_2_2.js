//determine what pair of inputs produces the output 19690720

for (let q = 0; q < 99; q++){
  for  (let j = 0; j < 99; j++){
    let opcode = [1,0,0,3,1,1,2,3,1,3,4,3,1,5,0,3,2,13,1,19,1,5,19,23,2,10,23,27,1,27,5,31,2,9,31,35,1,35,5,39,2,6,39,43,1,43,5,47,2,47,10,51,2,51,6,55,1,5,55,59,2,10,59,63,1,63,6,67,2,67,6,71,1,71,5,75,1,13,75,79,1,6,79,83,2,83,13,87,1,87,6,91,1,10,91,95,1,95,9,99,2,99,13,103,1,103,6,107,2,107,6,111,1,111,2,115,1,115,13,0,99,2,0,14,0]
    opcode[1] = q
    opcode[2] = j
    let i = 0
    while (1) {
      if (opcode[i] == 1) {
        opcode[opcode[i+3]] = opcode[opcode[i+1]]+opcode[opcode[i+2]]
        i = i + 4
      } else if (opcode[i] == 2) {
        opcode[opcode[i+3]] = opcode[opcode[i+1]]*opcode[opcode[i+2]]
        i = i + 4
      } else if (opcode[i] == 99) {
        i = i +1
        break
      }
    }
    if(opcode[0] == 19690720) {
      let noun = opcode[1]
      let verb = opcode[2]

      console.log(opcode[0])
      console.log('100*Noun*Verb equals '+100 + '*' + noun + '+' + verb + ' equals ' + (100 * noun + verb))
      break
    }
  }
}
