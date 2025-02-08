//npm i one-liner-joke
let joke = require('one-liner-joke');
let fs = require('fs');
let path = require('path');
let http = require('http');

const server = http.createServer((req, res) =>{
    if(req.url == '/jokes' && req.method == 'GET'){
     getAllJokes(req, res);   
    }
});
server.listen(3000);

function getAllJokes(req, res){
    let jokeArray = [];
    for(let i = 0;i <= 100; i++){
        let jokeDir = path.join(__dirname, 'data', `${i}.json`);
        let text = fs.readFileSync(jokeDir);
        let text2Res = Buffer.from(text).toString();

        jokeArray.push(JSON.parse(text2Res));
        //console.log(JSON.stringify(jokeArray))
        
    }
    res.end(JSON.stringify(jokeArray));
}













//joke.getRandomJoke().body

// for(let i = 0; i <= 100; i++){
//     let joke2File = joke.getRandomJoke().body;

//     let jokeDir = path.join(__dirname, 'data', `${i}.json`);
//     fs.writeFileSync(jokeDir, `{
//         "id": ${i},
//         "content":"${joke2File}",
//         "like":0,
//         "dislike":0,
//         "canShow": true
//     }`);
// }