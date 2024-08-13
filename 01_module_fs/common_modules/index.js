// console.log('Hello from index!!')// вивела в консоль терміналу "Hello from index!!" командою node index.js

const {english, french, japanese} = require('./languages');//імпортуємо
//-----------------------------file english-----------------------------------
// const english = require('./languages/english');//імпортуємо

english(); //викликаємо функцію
 
// константі не обов'язково давати такуж назву, як назва функції, напрклад
// const eng = require('./languages/english');
// eng();

//-----------------------------file others-----------------------------------
// const oth = require('./languages/other');//імпортуємо

// oth.japanese();
// oth.french();

// const {french, japanese} = require('./languages/other');

french();
japanese();