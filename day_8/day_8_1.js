const fs = require('fs');
let filename = process.argv[2] || 'inp.txt'
let f = fs.readFileSync(filename, 'utf8')


let layerSize = {x: 25, y: 6}
//let layerSize = {x: 3, y: 2}

function parseImageData(image, layerSize) {
  let layers = new Map()
  let layerArray = new Array()
  let layerData = {}
  let layer = []
  let row = []
  layerIter = 1
  class countObj {
    constructor () {
      this.count = {
        '0': 0,
        '1': 0,
        '2': 0,
        '3': 0,
        '4': 0,
        '5': 0,
        '6': 0,
        '7': 0,
        '8': 0,
        '9': 0
      }
    }
  }
  let number = new countObj()
  for (pixel of image) {
    number.count[pixel]++
    row.push(pixel)
    if (row.length == layerSize.x) {
      layer.push(row)
      row = []
    }
    if (layer.length == layerSize.y) {
      layerData = {
        rows: layer,
        numberCount: number.count
      }
      layers.set('Layer '+layerIter, layerData)
      layerArray.push(layerData)
      layer = []
      layerData = {}
      number = new countObj()
      layerIter++
    }
  }
  return [layers,layerArray]
}

const [layers,layerArray] = parseImageData(f,layerSize)

let numberCount = layerArray.map(layer => layer.numberCount)
let leastZeros = numberCount.reduce((mem,count) => mem = (mem['0']>count['0'])?count:mem, {'0': 999})
console.log(leastZeros['1']*leastZeros['2'])
