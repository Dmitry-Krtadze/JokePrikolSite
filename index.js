//npm i one-liner-joke
let joke = require('one-liner-joke');
let fs = require('fs');
let path = require('path');
let http = require('http');

const server = http.createServer((req, res) =>{
    if(req.url == '/jokes' && req.method == 'GET'){
     getAllJokes(req, res);   
    }else if(req.url == '/jokes' && req.method == 'POST'){
        addJoke(req, res);
    }
    else{
        res.writeHead(404,"404");
        res.end("404");
    }
});
server.listen(3000);

function addJoke(req, res){
    let data = '';
}

function getAllJokes(req, res){
    let dataPath = path.join(__dirname, 'data');
    let dir = fs.readdirSync(dataPath);
    let jokeArray = [];

    
    for(let i = 0;i < dir.length; i++){
        let text = fs.readFileSync(path.join(dataPath, i+'.json'));
        let jokeJson = Buffer.from(text).toString();
        let joke = JSON.parse(jokeJson)
        joke.id = i;
        
        jokeArray.push(joke);
        
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