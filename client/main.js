import * as spotifyUtil from './spotify.js'
//user interaction
const searchElement = document.getElementById("search");
const searchButton = document.getElementById("searchButton");
const randomButton = document.getElementById("randomize");

//display content
const artElement = document.getElementById("songArt");
const titleElement = document.getElementById("songTitle");
const artistElement = document.getElementById("songArtist");
//const youtubeElement = document.getElementById("youtubeLink");

console.log("start");
searchButton.addEventListener("click", async () => {
    if(searchElement.value === null || searchElement.value.length === 0){ alert("Invalid search");}
    else{
        try {
            let search = searchElement.value.split(" ");
            let trackObj = await spotifyUtil.getSearchTrackinfo(search);
            artElement.src = trackObj.art;
            titleElement.textContent = trackObj.name;
            artistElement.textContent = trackObj.artists[0]; //only using primary artist
        } catch(err){
            console.log(err)
        }
    }   
});

randomButton.addEventListener("click", async () => {
    try {
        let trackObj = await spotifyUtil.getRandomTrackinfo();
        artElement.src = trackObj.art;
        titleElement.textContent = trackObj.name;
        artistElement.textContent = trackObj.artists[0]; //only using primary artist
    } catch(err){
        console.log(err)
    } 
});

