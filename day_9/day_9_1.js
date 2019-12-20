const intcode = require('./module.js')

const fs = require('fs');
let filename = process.argv[2] || 'finp.txt'
let f = fs.readFileSync(filename, 'utf8')
const m = f.split('\n').filter(item => item != '')
let opCode = m[0].split(',').map(item => parseInt(item))
let input = [1]
let i = [0]

output = intcode.computer(input, opCode, i)
console.log(output)
