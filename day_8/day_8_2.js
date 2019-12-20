const fs = require('fs');
let filename = process.argv[2] || 'inp.txt'
let f = fs.readFileSync(filename, 'utf8')


let layerSize = {rows: 6, cols: 25}
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
    if (row.length == layerSize.cols) {
      layer.push(row)
      row = []
    }
    if (layer.length == layerSize.rows) {
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

function decodeImageData(layers, layerSize) {
  let image = []
  for (let x = 0; x<layerSize.rows; x++) {
    let row = []
    for (let y = 0; y<layerSize.cols; y++) {
      row.push(2)
    }
    image.push(row)
    // console.log(row)
  }
  //console.log(image[1][2])
  let iterator = 0
  for (layer of layers) {
    //console.log(layer.rows)
    // layer 1
    for (let x = 0; x<layerSize.rows; x++) {
      for (let y = 0; y<layerSize.cols; y++) {
        if (image[x][y] == 2 && layer.rows[x][y] != 2)
          image[x][y] = (parseInt(layer.rows[x][y])==0) ? '-':'o'
      }
    }
  }
  return image
}

let image = decodeImageData(layerArray, layerSize)

for (row of image) {
  console.log(row.join(""))
}
