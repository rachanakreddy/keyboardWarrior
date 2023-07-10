
//user interaction
const searchElement = document.getElementById("search");
const searchButton = document.getElementById("searchButton");
const randomButton = document.getElementById("randomize");

//display content
const titleElement = document.getElementById("songTitle");
const artistElement = document.getElementById("songArtist");
const youtubeElement = document.getElementById("youtubeLink");

searchButton.addEventListener("click", () => {
    if(searchElement.value === null || searchElement.value.length === 0){ alert("Invalid search");}
    else{
        
    }
});