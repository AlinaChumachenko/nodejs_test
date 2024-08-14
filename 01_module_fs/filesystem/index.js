const fs = require('fs').promises;//дефолтній fs не працює з await, тому використовуємо fs.promises
const path = require('path');

// const main = async () => {
// };

//IIFE функція яка сама себе викликає, вона відпрацьовує один раз.
(async () => {
    try {
        //READ text file from file system =============
        // \user\project\file.txt
        // /user/project/file.txt
        const pathToFile = path.join('files', 'texts', 'example.txt');
        const readResult = await fs.readFile(pathToFile);
        // console.log(pathToFile, readResult);//readResult повертає Buffer

        // console.log(readResult.toString());

        const filesDir = 'files';

        const listDirectoryContent = await fs.readdir(filesDir);
        // console.log(listDirectoryContent);

        // const stat = await fs.lstat('files/data.json');//{ stat: false }
        // console.log(stat);
        const stat = await fs.lstat(filesDir);//{ stat: true }

        // console.log({stat: stat.isDirectory()});

        // await fs.appendFile(pathToFile, '\nNEW LINE!!');//дописує кожен раз текст до файлу
        // console.log(readResult.toString());

        //READ json text =============
        const pathToJson = path.join('files', 'data.json');
        const readJsonResult = await fs.readFile(pathToJson);
        // console.log(readJsonResult, readJsonResult.toString());//отримуємо строку
        // console.log({readJsonResult:JSON.parse(readJsonResult)});//отримуємо обєкт

        const dataArr = JSON.parse(readJsonResult);

        dataArr.push({name: "Anya", phone: "102030", email: "sxdcfv@example.com", year: 2002});
        await fs.writeFile(pathToJson, JSON.stringify(dataArr));
        
    } catch (error) {
        console.log(error);
    }
})();
