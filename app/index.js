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

const newUser2 = {
  id: user.id
}

// friends[0] = { id: 555, name: "Hello World!"}

// let [ firstElem, secondElem ] = tags; /// TODO 
// let lastEl = tags[tags.length - 1];

// tags[1] = "Leo";
// tagsRest[1] = "newLeo";

// const user3 = (obj) =>{ return { guid:id = "sdfnsldvnsdlkvnsdlkn", isActive, gender, friends, tags, fullName = "AllTeam" } = obj };

const { guid:id = "sdfnsldvnsdlkvnsdlkn", isActive, gender, friends: [,,{name: frName, frfullName = "default"}], tags, fullName = "AllTeam" } = user

const user3 = {
  id, isActive, gender, frName, frfullName, fullName
}

console.log("user3 :>> ", user3);

