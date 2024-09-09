
import * as spotifyUtil from './spotify.js';
import * as youtubeUtil from './youtube.js';
import * as crud from './crud.js';

//user interaction
const searchElement = document.getElementById("search");
const searchButton = document.getElementById("searchButton");
const randomButton = document.getElementById("randomize");

//display content
const artElement = document.getElementById("songArt");
const titleElement = document.getElementById("songTitle");
const artistElement = document.getElementById("songArtist");
const youtubeElement = document.getElementById("youtubeLink");

const createButton = document.getElementById("create");
const readButton = document.getElementById("read");
const updateButton = document.getElementById("update");
const deleteButton = document.getElementById("delete");

const userNameElem = document.getElementById("username");
const songNameElem = document.getElementById("songname");
const statusElem = document.getElementById("status");

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

//CRUD BUTTONS
createButton.addEventListener("click", async () => {
    const username = userNameElem.value;
    const songname = songNameElem.value;
    const status = statusElem.value;
    const json = await crud.createLog(username, songname, status);
    await logRender(json, document.getElementById("logTable"), username);
});

readButton.addEventListener("click", async () => {
    const username = userNameElem.value;
    const json = await crud.readLog(username);
    await logRender(json, document.getElementById("logTable"), username);
});

updateButton.addEventListener("click", async () => {
    const username = userNameElem.value;
    const songname = songNameElem.value;
    const status = statusElem.value;
    const json = await crud.updateLog(username, songname, status);
    await logRender(json, document.getElementById("logTable"), username);
});

deleteButton.addEventListener("click", async () => {
    const username = userNameElem.value;
    const songname = songNameElem.value;
    const json = await crud.deleteLog(username, songname);
    await logRender(json, document.getElementById("logTable"), username);
});


async function logRender(json, element, user){
    let userData = json[user];

    element.innerHTML = "";
    const table = document.createElement("table");
    const hRow = document.createElement("tr");
    const songH = document.createElement("th");
    songH.innerText = "Song";
    const statusH = document.createElement("th");
    statusH.innerText = "Status";

    hRow.appendChild(songH);
    hRow.appendChild(statusH);
    table.appendChild(hRow);
    if(!(userData === undefined)){
        for(let i = 0; i < userData.length; i++){
            if(userData[i] === null) {continue;}
            let currRow = document.createElement("tr");
            let songElem = document.createElement("td");
            songElem.innerText = userData[i].song;
            let statusElem =document.createElement("td");
            statusElem.textContent = userData[i].status;

            currRow.appendChild(songElem);
            currRow.appendChild(statusElem);
            table.appendChild(currRow);
        }
    }
    element.appendChild(table);
}
//display composition
async function displayComp(title, artist){
    let query = window.encodeURIComponent("piano tutorial " + title + " " + artist);
    let vidData = await youtubeUtil.getVideoInfo(query);
    console.log(vidData);
    youtubeElement.innerHTML = "";
    if(!vidData.isComp){
        document.getElementById("vidLink").innerText = "No available compositions. Try changing your search or a different song!"
    }
    else{
        let temp = document.createElement("iframe");
        temp.height = "315";
        temp.width = "420";
        temp.src = "https://www.youtube.com/embed/" + vidData.ytID;
        document.getElementById("vidLink").innerText = "https://www.youtube.com/watch?v=" + vidData.ytID;
        youtubeElement.appendChild(temp);
    }
}