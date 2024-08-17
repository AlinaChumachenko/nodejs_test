import express from "express";
import cors from "cors";
import {v4} from "uuid"; // Для генерації унікального ідентифікатора
import {promises as fs} from "fs"; //для роботи з файлами , наприклад збереження у файл

import {userRouter} from "./routers";

const app = express();//створюємо екземпляр express

app.use(express.json());//MIDDLEWARE
app.use(cors());//додаємо cors для коректного відображення відповіді на браузері, налащтування за замовчуванням дозвіл до будь якого домкну

// Або можна налаштувати більш детально:
// app.use(cors({
//     origin: 'https://example.com', // Дозволити доступ лише з цього домену
//     methods: 'GET,POST', // Дозволити тільки ці методи
//     allowedHeaders: 'Content-Type,Authorization', // Дозволити тільки ці заголовки
//     credentials: true // Дозволити надсилання облікових даних
//   }));

//global custom MIDDLEWARE відпрацьовує на всьому 

app.use ((req, res, next) => {
    console.log('Custom middleware');   

    req.time = new Date().toLocaleString('uk-UA');

    next();//викликати наступний middleware якщо вони є
})

//MIDDLEWARE відпрацьовує на конкретному.зазначеному ендпоінті
app.use("/users/:id", async(req, res, next) => {
    try{
const {id} = req.params;

if(id.length < 10) {
    return res.status(400).json({
        msg: "Id is too short id!"});
        
}

const usersDB = await fs.readFile('data.json'); //поверне buffer
const users = JSON.parse(usersDB); //поверне обєкт 
const user = users.find((user) => user.id === req.params.id);

if(!user) {
    return res.status(404).json({
        msg: "User not found!",
    });
}

req.user = user;
    next();
    } catch (error) {
        console.log(error);
    }
})
//CONTROLLERS-------------------------------------------------------------------

// app.get("/ping", async (req, res) => {//на один реквеат один респонс
// console.log(req),
//     // res.send("<p>Hello from server!!!</p>");
//     // res.sendStatus(201);
//     res.status(200).json({
//         msg: "Hello from json!!!",})
// });



app.post("/users", async (req, res) => {
    try {
    //   console.log({ user: req.body })  
        const { name, year } = req.body;

        //TODO req.body validation- обов'язково треба перевіряти те що нам приходить від користувача
    const newUser = {
        id: v4(),
        name,
        year
    };
    // Save user to the 'db'
    const usersDB = await fs.readFile('data.json'); //поверне buffer
    const users = JSON.parse(usersDB); //поверне обєкт

    console.log({users});

    users.push(newUser);//додавання нового обєкту в масив
    await fs.writeFile('data.json', JSON.stringify((users)));//перезаписуємо файл та перетворюємо обєкт в json
    
    res.status(201).json({
        msg: "Success!",
        user: newUser,
    });
    } catch (error) {
        console.log(error);
    }
    
});

app.get("/users", async (req, res) => {
    try {
        const usersDB = await fs.readFile('data.json'); //поверне buffer
        const users = JSON.parse(usersDB); //поверне обєкт
        res.status(201).json({
            msg: "Success!",
            users,
        });
    } catch (error) {
        console.log(error);
    }
})

app.get("/users/:id", async (req, res) => {
    // console.log(req.params);
    try {
        
        res.status(201).json({
            msg: "Success!",
            // user: users.find(user => user.id === req.params.id),
            user: req.user,
            
            time: req.time
        });
    } catch (error) {
        console.log(error);
    }
})

// app.patch("/users/:id", async (req, res) => {});

// app.delete("/users/:id", async (req, res) => {});

//SERVER INITIALIZATION----------------------------------------------------------
const port = 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})