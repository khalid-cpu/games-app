// api.js

export async function getGames(e) {
    const url = `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${e}`;
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
        console.error(error);
        return null;
    }
}
