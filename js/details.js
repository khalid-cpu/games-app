const gameDetails = document.querySelector('.game-details');
let gameId;

export async function getDetails(gameId) {
    const url = `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${gameId}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '63e2b06429msh879918ad14c6a7dp1d051bjsn7291b1aa2b9d',
            'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error fetching game details:', error);
    }
}

export async function showGameDetails(game) {
    gameId = game.id;
    const data = await getDetails(gameId);
    
    gameDetails.innerHTML = `
        <div class="d-flex flex-column p-5 w-100">
            <div class="d-flex justify-content-between align-items-center my-3">
                <h1 class="text-light">Game Details</h1>
                <img src="imgs/download (1).svg" class="close-img" id="backBtn" alt="close">
            </div>
            <div class="d-flex row justify-content-between gap-2">
                <div class="col-lg-3 col-md-5 col-12">
                    <img src="${data.thumbnail}" class="img-fluid mb-4 w-100" alt="${data.title}">
                </div>
                <div class="flex-column d-flex justify-content-center text-light col-lg-8 col-md-6 col-12">
                    <h2>${data.title}</h2>
                    <p>Category: <span class="text-dark bg-info px-2 rounded-2">${data.genre}</span></p>
                    <p>Platform: <span class="text-dark bg-info px-2 rounded-2">${data.platform}</span></p>
                    <p>Status: <span class="text-dark bg-info px-2 rounded-2">${data.status}</span></p>
                    <p>${data.description || data.short_description}</p>
                    <a href="${data.game_url}" class="show text-light object-fit text-capitalize border border-warning px-3 py-1 rounded-3" target="_blank">Show Game</a>
                </div>
            </div>
        </div>
    `;

    // Back button logic
    document.getElementById('backBtn').addEventListener('click', () => {
        document.querySelector('nav').classList.remove('d-none');
        document.querySelector('header').classList.remove('d-none');
        document.querySelector('.games').classList.remove('d-none');
        document.querySelector('.game-details').classList.add('d-none');

        loadGames(game.genre.toLowerCase());
    });
}
