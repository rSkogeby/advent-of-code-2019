value_range = {lo:165432, hi:707912}
//value_range = {lo:153517, hi:630395}
//value_range = {lo:123454, hi:123457}

function increasingDigits(limits) {
  console.log(limits)
  let possibleCombinations = []
  for (let i=limits.lo;i<=limits.hi;i++){
    let myStr = i.toString().split('')
    let lastNum = 0
    let OK = false
    for (const letter of myStr) {
      if (parseInt(letter)<lastNum) {
        OK = false
        break
      } else {
        OK = true
      }
      lastNum = parseInt(letter)
    }
    if (OK == true) {
      possibleCombinations.push(i)
    }
  }
  return possibleCombinations
}

firstSort = increasingDigits(value_range)

function adjacentDigits(list){
  let possibleCombinations = []
  for (const item of list) {
    let OK = false
    let lastNum = ''
    let strItem = item.toString()
    for (let i=0; i<strItem.length; i++) {
      if (strItem[i] == lastNum){
        OK = true
      }
      lastNum = strItem[i]
    }
    if (OK == true) {
      possibleCombinations.push(item)
    }
  }
  return possibleCombinations
}

secondSort = adjacentDigits(firstSort)

function hasOnlyTwo(list) {
  let possibleCombinations = []

  for (const number of list) {
    let tal = number.toString().split('')
    let counter = 0
    let lastNum = ''
    let OK = false

    for (const siffra of tal) {

      if (lastNum == siffra) {
        counter++
      } else {
        if (counter == 1) {
          OK = true
          break
        }
        counter = 0
      }
      lastNum = siffra
    }
    lastNum = ''
    if (OK == true || counter == 1) {
      possibleCombinations.push(number)
    }
  }
  return possibleCombinations
}

thirdSort = hasOnlyTwo(secondSort)

for (const item of thirdSort) {
  console.log(item)
}

console.log('Number of ok numbers is ' + thirdSort.length)
// 1172
