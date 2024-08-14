// console.log(process.env); // environment variables - змінні оточення

// process.env.NODE_MODE = 'development';//записуємо змінну до оточення
// console.log(process.env);

// console.log(process.argv);//arguments arry, шлях до ноди, шлях до файлу

// console.log(process.cwd())//абсолютний шлях до директорії де знаходиться цей індекс файл

// process.exit();//функція яка в ручну зупиняє скрипт, все що нижче неї у консоль не виведеться

// console.log(__dirname);//поточна директорія
// console.log(__filename);//поточний файл

// console.log(global);
// setTimeout(() => {
//     console.log('Hello from setTimeout!');
// }, 2000);

//---------------створюємо консольній додаток------------------------------------
const { program } = require('commander');

// const commander = require('commander');
// commander.program

const fs = require('fs').promises;
const path = require('path');
const readline = require('readline');//інтерактивна взаємодія з кодом , по типу алерт або промпт
require('colors');

program.option('-f, --file [type]', 'file for saving game logs', 'default.log')//налаштування прапорці, значення за замовчуванням
program.parse(process.argv);//розбарсить

const rl = readline.createInterface({ //будуємо інтерфейс
    input: process.stdin,    //звідки ми інформацію очікуємщ
    output: process.stdout   //куДИ ми інформацію виводимо
})

//simple example of using readline
// rl.on('line', (txt) => {
    
//     console.log({txt});
    

//     process.exit();
// })
let counter = 0;
const mind = Math.ceil((Math.random() * 10));//генеруємо рандомно число від 1 до 10
// const logFile = 'default.log';
const logFile = program.opts().file;//повертаємо значення прапорця(витягаємо опцію)

/**
 * Logger to write game results into log file
 * @param {string} msg - message to log
 * @param {string} logFile - file to log 
 * @returns {Promise<void>}
 */
const logger = async (msg, logFile) => {
    try {
        await fs.appendFile(logFile, `${new Date().toLocaleString('uk-UA')}: ${msg}\n`);

        console.log(msg.yellow);
        console.log(`Save game results to the log file: ${logFile}`.yellow.bgBlue);
    } catch (error) {
        console.log(`Something went very wrong: ${error.message}`.red);
    }
}

/**
 * Simple input validation
 * @author Alina
 * @category Validation
 * @param {number} num - input value
 * @returns {boolean}
 */
const isValid = (num) => {
    if (!Number.isNaN(num) && num > 0 && num <= 10 && num % 1 === 0) return true;

    if (Number.isNaN(num)) console.log('Please, enter a number only..'.red);
    if (!num % 1 === 0) console.log('Please, enter a integer number..'.red);
    if (num < 1||num>10) console.log('Number shuld be from 1 to 10..'.red);

    return false;
}
/**
 * Simple game
 */
const game = () => {
    rl.question('Please, enter any whole number from 1 to 10..\n' .green, (val) => {
        // const num = Number(val);//перетворення в число
        const num = +val;//перетворення в число

        //validate the number
        if (!isValid(num)) return game();

        // counter = counter + 1;
        // counter += 1;
        // ++counter;
        counter++;

        if (num !== mind) {
            console.log('oh, no! Try again...'.red);

            return game();
        }        

        logger(`Congratulations! You guessed the number in ${counter} tries!`, logFile);

        // process.exit();
        rl.close();
    });    
};

game();