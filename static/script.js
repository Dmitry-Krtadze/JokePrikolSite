const container = document.getElementById('jokes_container');
const xhr = new XMLHttpRequest();
xhr.open('GET', 'http://localhost:3000/jokes');
xhr.onload = function() {
    const jokes = JSON.parse(xhr.responseText);
    jokes.forEach((joke, index) => {
        if (!joke.canShow) return;
        const jokeBlock = document.createElement('div');
        jokeBlock.classList.add('joke-block');
        const contentElement = document.createElement('div');
        contentElement.classList.add('joke-content');
        contentElement.textContent = joke.content;
        jokeBlock.appendChild(contentElement);
        const likeDislikeWrapper = document.createElement('div');
        likeDislikeWrapper.classList.add('like-dislike');

        const likeBtn = document.createElement('button');
        likeBtn.textContent = `👍 ${joke.like}`;
        likeBtn.dataset.id = joke.id;
        likeBtn.addEventListener('click', () => like(likeBtn)); 

        const dislikeBtn = document.createElement('button');
        dislikeBtn.textContent = `👎 ${joke.dislike}`;
        dislikeBtn.dataset.id = joke.id;
        dislikeBtn.addEventListener('click', () => dislike(dislikeBtn)); 

        likeDislikeWrapper.appendChild(likeBtn);
        likeDislikeWrapper.appendChild(dislikeBtn);
        jokeBlock.appendChild(likeDislikeWrapper);
        container.appendChild(jokeBlock);
    });
    
} 
xhr.send();

function like(button) {
    let currentLikes = parseInt(button.textContent.split(' ')[1]); 
    let newLikes = currentLikes + 1; 
    button.textContent = `👍 ${newLikes}`; 
    let jokeId = Math.floor(button.getAttribute("data-id"));

    fetch(`http://localhost:3000/like?id=${jokeId}`, { method: 'POST' })
    .then(response => response.json())
    .then(data => {  button.textContent = `👍 ${data.likes}`;  })
}

function dislike(button) {
    let currenDislike = parseInt(button.textContent.split(' ')[1]); 
    let newDislike = currenDislike + 1; 
    button.textContent = `👎 ${newDislike}`; 
    let jokeId = Math.floor(button.getAttribute("data-id"));

    fetch(`http://localhost:3000/dislike?id=${jokeId}`, { method: 'POST' })
    .then(response => response.json())
    .then(data => {  button.textContent = `👎 ${data.dislike}`;  })
}




