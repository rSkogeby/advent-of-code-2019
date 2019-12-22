console.time("concatenation");
const intcode = require('./module.js')

const fs = require('fs');
let filename = process.argv[2] || 'finp.txt'
let f = fs.readFileSync(filename, 'utf8')
const m = f.split('\n').filter(item => item != '')
let opCode = m[0].split(',').map(item => parseInt(item))
let input = []
let i = [0]


let grid = {
   map: new Map(),
   pointer: {x: 0, y: 0, direction: '^', key: '0,0'},
   paintedTiles: 0
  }

grid.map.set(grid.pointer.key, 0)

function paint (grid, color, direction) {
  if (grid.map.has(grid.pointer.key)) {
    grid.map.set(grid.pointer.key, parseInt(color))
  } else {
    grid.map.set(grid.pointer.key, parseInt(color))
  }

  switch (grid.pointer.direction) {
    case '^':
      if (direction == 0) {
        grid.pointer.x = grid.pointer.x - 1
        grid.pointer.direction = '<'
      } else {
        grid.pointer.x = grid.pointer.x + 1
        grid.pointer.direction = '>'
      }
      break
    case 'v':
      if (direction == 0) {
        grid.pointer.x = grid.pointer.x + 1
        grid.pointer.direction = '>'
      } else {
        grid.pointer.x = grid.pointer.x - 1
        grid.pointer.direction = '<'
      }
      break
    case '<':
      if (direction == 0) {
        grid.pointer.y = grid.pointer.y - 1
        grid.pointer.direction = 'v'
      } else {
        grid.pointer.y = grid.pointer.y + 1
        grid.pointer.direction = '^'
      }
      break
    case '>':
      if (direction == 0) {
        grid.pointer.y = grid.pointer.y + 1
        grid.pointer.direction = '^'
      } else {
        grid.pointer.y = grid.pointer.y - 1
        grid.pointer.direction = 'v'
      }
      break
  }
  grid.pointer.key = [grid.pointer.x, grid.pointer.y].join(',')

  return grid
}

let output = [0,0]
let counter = 1
let color = 0
let direction = 0
while (output[1] != 99) {
  input = (grid.map.has(grid.pointer.key)) ? grid.map.get(grid.pointer.key) : 0
  //console.log(input)
  output = intcode.computer(input, opCode, i)
  if (output[1] == 99) {
    break
  }
  if (counter == 2) {
    direction = output[0]
    grid = paint(grid, color, direction)
    counter = 0
  } else {
    color = output[0]
  }
  counter++
}
console.log(''Number of painted tiles is ' + grid.map.size)
console.timeEnd("concatenation");
