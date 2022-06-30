// Selecto team !!!

// console.log(`Hello Aunomation team !`);

let user = {
  
  isActive: false,
  balance: '$2,474.46',
  age: 30,
  eyeColor: 'blue',
  name: 'Tameka Maxwell',
  gender: 'female',
  company: 'ENOMEN',
  email: 'tamekamaxwell@enomen.com',
  phone: '+1 (902) 557-3898',
  tags: [ 'aliquip', 'anim', 'exercitation', 'non',  'Barber Hicks' ],
  friends: [
    { id: 0, name: 'Barber Hicks' },
    { id: 1, name: 'Santana Cruz' },
    { id: 2, name: 'Leola Cabrera' }
  ]
}

const newUser = {
  guid: user.guid,
  isActive: user.isActive,
  name: user.name,
  friends: [user.friends[0]]
};

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


// let [ firstElem, secondElem ] = tags; /// TODO 
// let lastEl = tags[tags.length - 1];

// tags[1] = "Leo";
// tagsRest[1] = "newLeo";

// const user3 = (obj) =>{ return { guid:id = "sdfnsldvnsdlkvnsdlkn", isActive, gender, friends, tags, fullName = "AllTeam" } = obj };

const { guid:id = "sdfnsldvnsdlkvnsdlkn", isActive, gender, friends: [,,{name: frName, frfullName = "default"}], tags, fullName = "AllTeam" } = user

const user3 = {
  id, isActive, gender, frName, frfullName, fullName
}


let obj = 
{
  name1: "Pavlo",
  name2: "Andrii"
}

obj.name3 = "Vlada"

let arr = ["Pavlo", "Andrii", "Vlada", "Artem"]
 
// console.log(arr[0]); 

// arr.length --- 4 



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

// console.log(str)

function guessTheNumber(num) {
  if( typeof num != "number") return console.error("Please provide a valid number");
  if( num > 10 || num < 0) return console.error("Please provide number in range 0 - 10");
  else {
      const rNum = Math.floor(Math.random() * 10);
      let msg = (num != rNum) ? `You are lose, your number is ${num}, the random number is ${rNum}` : "You win!"
      return console.log(msg)
  }
}

// guessTheNumber("5");
// guessTheNumber(15);
// guessTheNumber(5);

function getArray(num) {
  if( typeof num != "number") return new Error("Please provide a valid number");
  if( num < 1 || num > 1000) return new Error("Please provide number in range 1 - 1000");
  else {
    let array = []  
    for (let index = 0; index < num; index++) {
      array.push(index + 1);    
    }
    return array
  }
}

console.log(getArray(10));
