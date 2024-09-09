
async function login(){
    const res = await fetch('/login', {method: "GET"});
    let token = await res.json();
    return token.access_token;
}
async function getAuthToken(){
    const res = await fetch('/spotifyAuthToken', {method: "GET"});
    let token = await res.json();
    return token.access_token;
}

async function getTrack(token, query, offset){
    let authToken = await getAuthToken();
    const res = await fetch('/spotifyGetTrack', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'token': token,
            'query': query,
            'offset': offset
        })
    });
    let track = await res.json();
    return track.tracks.items[0];
}

const searchTrack = async(query) => {
    let authToken = await getAuthToken();
    let track = await getTrack(authToken, query, 0);
    return track;
};

const randomTrack = async() => {
    let authToken = await getAuthToken();
    const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    let randomAlph = Math.floor(Math.random()* 26);
    let query = alphabet[randomAlph]; //get a random letter to search
    let queryArr = [query];
    let random_offset = Math.floor(Math.random() * 1000); //offset for spotify search can go up to 1000
    let track = await getTrack(authToken, queryArr, random_offset);
    return track;
};

const getTitle = async (track) => {
    const title = await track.name;
    return title;//return string
};

const getArtist = async(track) => {
    const arr = [];
    const artists = await track.artists;

    for (let i = 0; i < artists.length; i++) {
        arr.push(artists[i].name)
    }

    return arr;
};

const getArt = async(track) => {
    const art = await track.album.images[1].url; //300 x 400 do images[1]
    return art;
};

const getSearchTrackinfo = async (search) => {
    const track = await searchTrack(search);
    const title = await getTitle(track);
    const artists = await getArtist(track);
    const art = await getArt(track);
    return {
        "name": title,
        "artists": artists,
        "art": art
    };
};

const getRandomTrackinfo = async () => {
    const track = await randomTrack();
    const title = await getTitle(track);
    const artists = await getArtist(track);
    const art = await getArt(track);
    return {
        "name": title,
        "artists": artists,
        "art": art
    };
};


export{
    getSearchTrackinfo,
    getRandomTrackinfo
};

