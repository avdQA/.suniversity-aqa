// lesson 14

const TIMEOUT = 3000;
// let promise = new Promise(function(resolve, reject) {
//   setTimeout(() => resolve("log 1 !"), TIMEOUT);
//   // setTimeout(() => reject(new Error("Ооооой!")), 1000);
// });

// метод resolve запустить першу функцію передану в .then
// promise.then(
//   null, // виведе "завершено!" через 1 секунду
//   error => alert(error) // не запуститься
// )

// promise.then(alert)
// promise.catch(error => console.log(error))

// new Promise((resolve, reject) => {
//   // setTimeout(() => resolve("log 1 !"), TIMEOUT);
//   setTimeout(() => reject(new Error("Ооооой!")), TIMEOUT);
// })  
//   .finally(() => alert("Проміс завершений"))
//   // .catch( err => console.log(err))
//   // .then(r => console.log(r));
//   .then(r => console.log(r), err => alert(err));




function loadScript(src) {
  return new Promise(function(resolve, reject) {
    let script = document.createElement('script');
    script.src = src;
    
    script.onload = () => resolve(script);
    script.onerror = () => reject(new Error(`Помилка завантаження скрипта ${src}`));
    
    document.head.append(script);
  });
}

let promise = loadScript("https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.js");

promise.then(
  script => alert(`${script.src} завантажений!`),
  error => alert(`Помилка: ${error.message}`)
);

promise.then(script => alert('Ще один обробник...2'));
promise.then(script => alert('Ще один обробник...3'));
promise.then(script => alert('Ще один обробник...4'));



console.log('log 2');