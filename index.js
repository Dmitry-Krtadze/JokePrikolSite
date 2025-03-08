//npm i one-liner-joke
let joke = require('one-liner-joke');
let fs = require('fs');
let path = require('path');
let http = require('http');
let url = require('url');



const server = http.createServer((req, res) =>{
    res.setHeader('Access-Control-Allow-Origin','*');
    if(req.url.startsWith('/like')){
        like(req, res);
    }
    if(req.url == '/jokes' && req.method == 'GET'){
     getAllJokes(req, res);   
    }
    if(req.url == '/jokes' && req.method == 'POST'){
        addJoke(req, res);
    } 
    if (req.url.startsWith('/like') && req.method === 'POST') {
        like(req, res);
    } 
    if (req.url.startsWith('/dislike')  && req.method === 'POST') {
        dislike(req, res);
    } 
});
server.listen(3000);

function dislike(req, res){
    const params = url.parse(req.url, true).query;
    let id = params.id;
    let jokeDislikeCount;
    if(id){
        console.log('ok id')
        let dataPath = path.join(__dirname, 'data');
        let filePath = path.join(dataPath, id+'.json');
        let file = fs.readFileSync(filePath);
        let jokeJSON = Buffer.from(file).toString();
        let joke = JSON.parse(jokeJSON);
        joke.dislike++;
        console.log(joke);
        jokeDislikeCount = joke.dislike;
        fs.writeFileSync(filePath, JSON.stringify(joke));
    }
    res.end(`Joke ${id}, disliked. Now ${jokeDislikeCount} dislikes`);
}


function like(req, res){
    const params = url.parse(req.url, true).query;
    let id = params.id;
    let jokeLikeCount;
    if(id){
        let dataPath = path.join(__dirname, 'data');
        let filePath = path.join(dataPath, id+'.json');
        let file = fs.readFileSync(filePath);
        let jokeJSON = Buffer.from(file).toString();
        let joke = JSON.parse(jokeJSON);
        joke.like++;
        console.log(joke);
        jokeLikeCount = joke.like;
        fs.writeFileSync(filePath, JSON.stringify(joke));
        
    }
    res.end(`Joke ${id}, liked.Now ${jokeLikeCount} likes`);
}

function addJoke(req, res){
    let data = '';
    req.on('data', function(chunk){
        data += chunk;
    });
    req.on('end', function(){
        let joke = JSON.parse(data);
        joke.likes = 0;
        joke.dislike = 0;
        let dataPath = path.join(__dirname, 'data');
        let dir = fs.readdirSync(dataPath);
        let fileName = dir.length+'.json';
        let filePath = path.join(dataPath, fileName);
        fs.writeFileSync(filePath, JSON.stringify(joke));

        res.end();
    });
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