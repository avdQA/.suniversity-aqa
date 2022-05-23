// Selecto team !!!

// console.log(`Hello Aunomation team !`);

let userName = "Artem";
let userSureName = "Vepryk";

const getFullName = (name, surename) => {
  return `${name} ${surename}`
}


function somethingPrint(name = "Andrii", sureName = "Vorochuk", age) {
  let str = "Hello Aunomation team "
  console.log(`${str} and ${getFullName(name, sureName)} !`)
}
// somethingPrint();

// const funcEmpty = somethingPrint()
// somethingPrint(userName, userSureName);
// somethingPrint("Olersandr", "Chekusov")

// ((name, surename) => {
//   let str = "Hello Aunomation team "
//   console.log(`${str} and ${getFullName(name, surename)} !`)
// })("Artem", "Vepryk---------");

(() => { })();

function printFirst(a, b) {

  return () => { }
}


let vvv = {
  name: "asdasd",
  arr1: {
    asdas: {
      a: 123,
      b: 456
    }
  }
}

const a = 4;
let str;

switch (true) {
  case a < 0:  // if (x === 'value1')
    str = "lower 0"
    break

  case a > 0 && a < 10:  // if (x === 'value2')
    str = "from 0 to 10"
    break

  case a > 10:  // if (;x === 'value2')
    str = "Upper 10";
    break;

  default:
    str = "Default";
    break;


}

console.log(str)

