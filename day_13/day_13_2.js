console.time("concatenation");
const intcode = require('./module.js')

const fs = require('fs');
let filename = process.argv[2] || 'finp.txt'
let f = fs.readFileSync(filename, 'utf8')
const m = f.split('\n').filter(item => item != '')
let opCode = m[0].split(',').map(item => parseInt(item))
let input = [0]
let i = [0]
let relBase = [0]
opCode[0] = 2 //play for free

let grid = {
  map: new Map(),
  pointer: {x: 0, y: 0, key: '0,0'},
  paintedTiles: 0
}

let output = [0,0]
let counter = 1
let x = 0
let y = 0
let tileID = 0
let score = 0
let joystick = [-1,0,1]
let ball, paddle
/*
const readline = require('readline')
readline.emitKeypressEvents(process.stdin)
process.stdin.setRawMode(true)
process.stdin.on('keypress', (str, key) => {
  if (key.ctrl && key.name === 'c') {
    process.exit()
  } else {
    console.log(`You pressed the "${str}" key`)
    input = str
    switch (str) {
      case 'a':
        input = -1
        break
      case 's':
        input = 0
        break
      case 'd':
        input = 1
        break
    }
  }
});
*/

while (output[1] != 99) {
  output = intcode.computer(input, opCode, i, relBase)
  if (output[1] == 99) {
    break
  }
  if (counter == 3) {
    if (x == -1 && y == 0) {
      paintGame(grid)
      score = output[0]
      displayScore(x,y,score)
      counter = 0
    } else {
      tileID = output[0]
      grid = paint(grid, x, y, tileID)
      if (tileID == 3) {
        paddle = {x,y}
      } else if (tileID == 4) {
        ball = {x,y}
      }
      input = paddle && ball ? [Math.max(-1, Math.min(ball.x - paddle.x, 1))] : [0]
      counter = 0
    }
  } else if (counter == 2) {
    y = output[0]
  } else {
    x = output[0]
  }
  counter++
}
displayScore(x,y,score)



counter = 0
for (let [k,v] of grid.map) {
  if (v == 2) {
    counter++
  }
}

console.log(counter)

paintGame(grid)

console.timeEnd("concatenation")

function paint (grid, x, y, tileID) {
  grid.pointer.key = [x, y].join(',')
  grid.pointer.x = x
  grid.pointer.y = y
  if (grid.map.has(grid.pointer.key)) {
    grid.map.set(grid.pointer.key, tileID)
  } else {
    grid.map.set(grid.pointer.key, tileID)
  }

  return grid
}

function paintGame(grid) {

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

  let ballCoord = []
  let paddleCoord = []
  for (let [k,v] of grid.map) {
    let coords = k.split(',')
    let x = parseInt(coords[0])
    let y = Math.abs(parseInt(coords[1]))
    switch (v) {
      case 0:
        canvas[y][x] = ' '
        break
      case 1:
        canvas[y][x] = '|'
        break
      case 2:
        canvas[y][x] = '-'
        paddleCoord = [x,y]
        break
      case 3:
        canvas[y][x] = '_'
        break
      case 4:
        canvas[y][x] = 'o'
        ballCoord = [x,y]
        break
    }
  }
  for (row of canvas) {
    console.log(row.join(""))
  }
  return [ballCoord, paddleCoord]
}

function displayScore(x, y, score) {
  console.log(score)
}
function getKeyPress () {
  const readline = require('readline');
  readline.emitKeypressEvents(process.stdin);
  process.stdin.setRawMode(true);
  process.stdin.on('keypress', (str, key) => {
    if (key.ctrl && key.name === 'c') {
      process.exit();
    } else {

      let input = str
      switch (str) {
        case 'a':
          input = -1
          break
        case 's':
          input = 0
          break
        case 'd':
          input = 1
          break
      }
      return input
    }
  });
  console.log('Press any key...');
}
