const { EventEmitter } = require('events');
const { readFile } = require("fs");
const express = require('express');

const app = express();

app.get('/api', (request, response) => {

    response.json({"test": ["a", "b", "c"]})
    /*
    readFile('./test.html', 'utf8', (err, html) => {
        if (err){
            response.status(500).send("ERROR");
        }
        
        response.send(html);
    });
    */
});

app.listen(5000, () => {
    console.log("App available on http://localhost:5000/api");
});


/*
async function hello(){
    const file = await readFile('./test2.txt', 'utf8');
    console.log(file);
}

console.log("t1");
hello();
console.log("t2");

const eventEmitter = new EventEmitter;

eventEmitter.on("launch", () => {
    console.log("completed");
})

eventEmitter.emit("launch");
eventEmitter.emit("launch");
*/