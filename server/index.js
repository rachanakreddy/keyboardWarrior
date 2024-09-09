import express from 'express';
import logger from 'morgan';
import * as database from './database.js';

const app = express();
const port = process.env.PORT || 3006;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use('/', express.static('client'));


//spotify devleoper stuff
const clientID = '31a69cb16d5248f2870cae5abad2561b';
const clientSecret = '917e79d402504281a7616258567680de';

//google developer stuff
const APIKey = 'AIzaSyB8va5CcCga3V_M_m086rHwSGRIw3rKfvY';

app.get("/spotifyAuthToken", async (req, res) => {
    const auth = "Basic " + new Buffer.from(clientID + ':' + clientSecret).toString('base64');

    var authHeaders = new Headers();
    authHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    authHeaders.append("Authorization", auth);
    authHeaders.append("Cookie", "__Host-device_id=AQBmrqW9UyzeXpYmcrN9V2Cg94fCOzHp609V2QGqsa_o_uG9mjh2lFXYoDWaF-iJRFLI0C-VPZHnbWPTBjdR2JaN9EEqHyAwccg; sp_tr=false");

    var urlencoded = new URLSearchParams();
    urlencoded.append("grant_type", "client_credentials");
    var authOptions = {method: 'POST', headers: authHeaders, body: urlencoded,redirect: 'follow'};

    let response = await fetch("https://accounts.spotify.com/api/token", authOptions);
    let data = await response.json();

    res.send(data);
});

app.post("/spotifyGetTrack", async (req, res) => {
    var trackHeaders = new Headers();

    trackHeaders.append("Authorization", 'Bearer ' + req.body.token);
    var trackOptions = {method: 'GET', headers: trackHeaders,redirect: 'follow'};
    let finalQuery = ""
    if(req.body.query.length > 1){
        for(let i = 0; i < req.body.query.length -1; i++){
            finalQuery = finalQuery + req.body.query[i] + "+";
        }
        finalQuery += req.body.query[req.body.query.length-1];
    }
    else{ finalQuery = req.body.query[0];}

    let url = "https://api.spotify.com/v1/search?q=" + finalQuery +"&type=track&limit=1&offset=" + req.body.offset;
    let response = await fetch(url, trackOptions);
    let data = await response.json();

    res.send(data);
});

app.post("/youtubeGetVideo", async (req, res) => {
    const url = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=" + req.body.query +
                "&type=video&videoEmbeddable=true&key=" + APIKey;
    let response = await fetch(url);
    let data = await response.json();
    res.send(data);
});

//CRUD operations
app.post('/create', async (req, res) => {
    const {user, song, status } = req.query;
    if(user === undefined || song === undefined || status === undefined){
        res.status(400).send(JSON.stringify({status: "failed"})); 
    }
    else{
        let json = await database.createLog(user, song, status);
        res.status(200).send(JSON.stringify(json));
    }
  });
  
app.get('/read', async (req, res) => {
    const {user} = req.query;
    if(user === undefined){
        res.status(400).send(JSON.stringify({status: "failed"})); 
    }
    else{
        let json = await database.readLog(user);
        res.status(200).send(JSON.stringify(json));
    }
  });
  
app.put('/update', async(req, res) => {
    const {user, song, status } = req.query;
    if(user === undefined || song === undefined || status === undefined){
        res.status(400).send(JSON.stringify({status: "failed"})); 
    }
    else{
        let json = await database.updateLog(user, song, status);
        res.status(200).send(JSON.stringify(json));
    }
  });
  
app.delete('/delete', async(req, res)=> {
    const {user, song} = req.query;
    if(user === undefined || song === undefined ){
        res.status(400).send(JSON.stringify({status: "failed"})); 
    }
    else{
        let json = await database.deleteLog(user, song);
        res.status(200).send(JSON.stringify(json));
    }
  });
  
app.listen(port, () => {
    console.log(`Hello we are on port: ${port}`);
});