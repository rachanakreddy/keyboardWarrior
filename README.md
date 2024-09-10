# Keyboard Warrior
A web application that helps users find piano compositions of their favorite songs.

Using: HTML, CSS, Javascript, Bootstrap, MongoDB, Spotify API, Youtube API

Instructions
1. To run the project, first run “npm install” for “express”, “morgan”, and “mongodb”
2. Check that “type”:“module” is in the package.json folder.
3. Run “node server/index.js” in the terminal of the root folder(“keyboardWarrior”).
4. There should be a “Hello we are on port 3000” message. Then, navigate to the
application by heading to “localhost:3000” in a web browserJ

Explanation of the how different components of the application works:

<b> Client-Side Architecture </b>

Within the client folder, there are four main JS files for functionality. 

The main.js contains all the UI functionality which is mainly composed of event listeners for the multiple buttons on the page and makes use of the exported functions from other JS files.

The spotify.js file contains all the necessary Spotify utilities, mainly fetch requests, and some customized functions like getting a random track. 

The youtube.js file contains a function with a fetch request that returns a video with the provided query. There's a customized function called isPianoComp() to check if the video is a piano composition (simply by checking if any of the words in the title of the video are equal to piano).

The index.html file and styles.css file handle the design of the interface. I used BootStrap to handle certain design elements to make the overall website look cleaner.

<b>Server-Side Architecture</b>

There are two files within the server folder: database.js and index.js. 

The database.js file handles connecitng to MongoDB, which makes use of the CRUD operations. I also made a local.json file within my project folder so that I could easily display database collections through main.js.

The index.js file handles all routes which are the two routes from the spotify.js file, the route from the youtube.js file, and the four routes necessary for CRUD operations.

<b>User Interface</b>

In this application, the user would enter the search query of a song they would like to learn to play, for example, "see you again tyler". Once the search button is clicked, the display will change accordingly to the current song along with an embedded Youtube video for a tutorial of the piano composition. 

The rest of the application is simple CRUD operations, specifically for a user to keep track of what songs they're currently learning or may want to learn in the future. The user needs to enter their username, and optionally their song and/or status of the song depending on which CRUD operation is being used. Then, the display will render a list of all their songs and the status of their songs. 

<b>The Mechanics<b>

First, I used Spotify API's search request and passed through the text from the user's search query along with an offset of 0, so that the first, a.k.a most relevant, result was returned. 

If a user chooses to pick a random song, then I called my randomTrack function which works by picking a random letter from 'a' to 'z' and then calling a random offset from 0 to 1000, which are then both passed through Spotify API's search request. Since I'm using my own Spotify token, the results are heavily biased towards my listening history, which is why a random offset is necessary. 

From the request, a track object is returned with information like album artwork, song name, and artist(s) which are used to display on "The Song" side of the interface. 

Then, I used the user's query from the search text box, the artist's name from the track object, and the string "piano tutorial" to create my Youtube API search query. I used the user's query instead of the song name from the track object because some Spotify song titles included all featured artists which ended up being a long query. However, in the case of a randomized song, I had to use the song title from the track object.

Lastly, I made sure the video was embeddable, a feature that's part of the Youtube API's search request. The response is an object with a specific video ID which just needs to be concatenated to the of the string "https://www.youtube.com/embed". This was used to then redner "The Composotion" side of the interface.






Preview:
<img width="1470" alt="Screenshot 2023-07-20 at 1 03 12 AM" src="https://github.com/rachanakreddy/keyboardWarrior/assets/32342008/7b398e77-33fb-49c5-b092-4a5665078245">
