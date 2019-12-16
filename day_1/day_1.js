// Read the file and print its contents.
let fs = require('fs'), filename = process.argv[2];

let data = fs.readFileSync(filename, 'utf8')
let datas = data.split('\n').filter(item => item!='').map(item => parseInt(item, 10))

//data=[1,2,3];
let f = datas.map( function(m) {
    return Math.floor(m/3)-2
  });// fuel required for a module

let s = f.reduce((mem, modu) => mem+modu, 0) // sum of all modules' fule consumptiom
console.log(s)
