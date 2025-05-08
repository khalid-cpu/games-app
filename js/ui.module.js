import * as game from './games.js';
import * as details from './details.js'

const rowContainer = document.querySelector('.row');
const categoryLinks = document.querySelectorAll('.nav-link');


function showLoading() {
    rowContainer.innerHTML = `
        <div class="text-center text-light w-100 py-5">
            <div class="spinner-border text-info" role="status"></div>
            <p class="mt-3">Loading games...</p>
        </div>
    `;
}


function renderGames(gamesData) {
    rowContainer.innerHTML = ''; 

    console.log(gamesData)
    gamesData.forEach(game => {
        const card = document.createElement('div');
        card.classList.add('col');
        card.innerHTML = `
            <div class="card bg-transparent h-100" data-id="${game.id}">
                <img src="${game.thumbnail}" class="card-img-top" alt="${game.title}">
                <div class="card-body d-flex justify-content-between align-items-center">
                    <h5 class="card-title text-light">${game.title}</h5>
                    <span class="h6 bg-info text-light bold p-2 rounded-3">Free</span>
                </div>
                <div class="card-body text-secondary">
                    <p class="card-text text-center">${game.short_description}</p>
                </div>
                <div class="card-body d-flex justify-content-between align-items-center">
                    <span class="card-link text-light bold bg-secondary rounded-2 p-1 h6">${game.genre}</span>
                    <span class="card-link text-light bold bg-secondary rounded-2 p-1 h6">${game.platform}</span>
                </div>
            </div>
        `;
        card.querySelector('.card').addEventListener('click', () => {
            document.querySelector('nav').classList.add('d-none');
            document.querySelector('header').classList.add('d-none');
            document.querySelector('.games').classList.add('d-none');
            document.querySelector('.game-details').classList.remove('d-none');
            

            details.showGameDetails(game)
        });
        rowContainer.appendChild(card);
    });
}


async function loadGames(categoryKey) {
    try {
        showLoading();
        const gamesData = await game.getGames(categoryKey);
        renderGames(gamesData);
    } catch (error) {
        rowContainer.innerHTML = `
            <div class="text-danger text-center w-100 py-5">
                <p>Failed to load games. Please try again later.</p>
            </div>
        `;
        console.error('Error loading games:', error);
    }
}

categoryLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const selectedCategory = e.target.dataset.value;
        if (selectedCategory) {
            loadGames(selectedCategory);
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    loadGames('mmorpg');
});
