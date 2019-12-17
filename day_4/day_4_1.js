value_range = {lo:165432, hi:707912}

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
console.log(secondSort.length)
