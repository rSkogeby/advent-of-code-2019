console.time("concatenation");
const intcode = require('./module.js')

const fs = require('fs');
let filename = process.argv[2] || 'finp.txt'
let f = fs.readFileSync(filename, 'utf8')
const m = f.split('\n').filter(item => item != '')
let opCode = m[0].split(',').map(item => parseInt(item))
let input = 0
let i = [0]
let relBase = [0]

let grid = {
  map: new Map(),
  pointer: {x: 0, y: 0, direction: '^', key: '0,0'},
  paintedTiles: 0
}

grid.map.set(grid.pointer.key, 1)

function paint (grid, color, direction) {
  if (grid.map.has(grid.pointer.key)) {
    grid.map.set(grid.pointer.key, color)
  } else {
    grid.map.set(grid.pointer.key, color)
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
  output = intcode.computer(input, opCode, i, relBase)
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
console.log('Number of painted tiles is ' + grid.map.size)
console.timeEnd("concatenation")


function paintRegCode(grid) {

  let xRange = {xMin: 0, xMax:0}
  let yRange = {yMin: 0, yMax:0}
  for (let key of grid.map.keys()) {
    let tmpValues = key.split(',')
    let x = parseInt(tmpValues[0])
    let y = parseInt(tmpValues[1])
    if (x > xRange.xMax) {
      xRange.xMax = x
    }
    if (x < xRange.xMin) {
      xRange.xMin = x
    }
    if (y > yRange.yMax) {
      yRange.yMax = y
    }
    if (y < yRange.yMin) {
      yRange.yMin = y
    }
  }

  let canvas = new Array()
  for (let y = 0; y < yRange.yMax - yRange.yMin + 1; y++) {
    canvas.push(new Array(xRange.xMax - xRange.xMin).fill('.'))
  }

  for (row of canvas) {
    console.log(row.join(""))
  }
  for (let [k,v] of grid.map) {
    let coords = k.split(',')
    let x = parseInt(coords[0])
    let y = Math.abs(parseInt(coords[1]))
    console.log(x + ' ' + y)
    canvas[y][x] = (v == 1) ? 'o' : ' '
  }
  for (row of canvas) {
    console.log(row.join(""))
  }
}

paintRegCode(grid)
