
import * as spotifyUtil from './spotify.js';
import * as youtubeUtil from './youtube.js';
//user interaction
const searchElement = document.getElementById("search");
const searchButton = document.getElementById("searchButton");
const randomButton = document.getElementById("randomize");

//display content
const artElement = document.getElementById("songArt");
const titleElement = document.getElementById("songTitle");
const artistElement = document.getElementById("songArtist");
const youtubeElement = document.getElementById("youtubeLink");


searchButton.addEventListener("click", async () => {
    if(searchElement.value === null || searchElement.value.length === 0){ alert("Invalid search");}
    else{
        let search = searchElement.value.split(" ");
        let trackObj = await spotifyUtil.getSearchTrackinfo(search);
        artElement.src = trackObj.art;
        titleElement.textContent = trackObj.name;
        artistElement.textContent = trackObj.artists[0]; //only using primary artist
        let q = "";
        await displayComp(searchElement.value, trackObj.artists[0]);
    }   
    
});

randomButton.addEventListener("click", async () => {
    let trackObj = await spotifyUtil.getRandomTrackinfo();
    artElement.src = trackObj.art;
    titleElement.textContent = trackObj.name;
    artistElement.textContent = trackObj.artists[0]; //only using primary artist
    await displayComp(trackObj.name, trackObj.artists[0]);

});


async function displayComp(title, artist){
    let query = window.encodeURIComponent("piano tutorial " + title + " " + artist);
    let vidData = await youtubeUtil.getVideoInfo(query);
    console.log(vidData);
    youtubeLink.innerHTML = "";
    if(!vidData.isComp){
        document.getElementById("vidLink").innerText = "No available compositions. Try changing your search or a different song!"
    }
    else{
        let temp = document.createElement("iframe");
        temp.height = "315";
        temp.width = "420";
        temp.src = "https://www.youtube.com/embed/" + vidData.ytID;
        document.getElementById("vidLink").innerText = "https://www.youtube.com/watch?v=" + vidData.ytID;
        youtubeLink.appendChild(temp);
    }
}