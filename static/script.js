const container = document.getElementById('jokes_container');
const xhr = new XMLHttpRequest();
xhr.open('GET', 'http://localhost:3000/jokes');
xhr.onload = function() {
    const jokes = JSON.parse(xhr.responseText);
    jokes.forEach(joke => {
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
        const dislikeBtn = document.createElement('button');
        dislikeBtn.textContent = `👎 ${joke.dislike}`;
        likeDislikeWrapper.appendChild(likeBtn);
        likeDislikeWrapper.appendChild(dislikeBtn);
        jokeBlock.appendChild(likeDislikeWrapper);
        container.appendChild(jokeBlock);
    });
} 
xhr.send();


