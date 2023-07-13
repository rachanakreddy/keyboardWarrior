import { MongoClient } from 'mongodb';
import { readFile, writeFile } from 'fs/promises';

const filePath = "logs.json";
const url = 'mongodb+srv://rachanakreddy:Rlvu29CuqbZnXtze@cluster0.kppa2.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
await client.connect();

let db = client.db('logs');

async function createLog(username, songname, statusname){
    let userColl = db.collection(username.replace('$', ''));
    await userColl.insertOne({song: songname, status: statusname});

    //local
    try{
        const dataObj = await _read();
        let dataEntry = {song: songname, status: statusname};
        if(dataObj[username]  === undefined){
            dataObj[username] = [dataEntry];
        }
        else{ dataObj[username].push(dataEntry); }
        await _write(dataObj);
    } catch(err){
        console.log('Wrong operation or invalid Input');
    }

    const data = await readFile(filePath, 'utf8');
    return JSON.parse(data);
}

async function readLog(user){
    const data = await readFile(filePath, 'utf8');
    return JSON.parse(data);
}

async function updateLog(username, songname, statusname){
    let userColl = db.collection(username.replace('$', ''));
    await userColl.updateOne({song: songname}, {$set: {status: statusname}});
    
    try{
        const dataObj = await _read();
        for(let i = 0; i < dataObj[username].length; i++){
            if(dataObj[username][i] == null){
                continue;
            }
            if(dataObj[username][i].song == songname){
                dataObj[username][i].status = statusname;
                break;
            }
        }
        await _write(dataObj);
    } catch(err){
        console.log('Wrong operation or invalid Input');
    }
    const data = await readFile(filePath, 'utf8');
    return JSON.parse(data);
}

async function deleteLog(username, songname){
    let userColl = db.collection(username.replace('$', ''));
    await userColl.deleteOne({song: songname});

    try{
        const dataObj = await _read();
        for(let i = 0; i < dataObj[username].length; i++){
            if(dataObj[username][i] == null){
                continue;
            }
            if(dataObj[username][i].song == songname){
                delete dataObj[username][i];
                break;
            }
        }
        await _write(dataObj);
    } catch(err){
        console.log(err)
    }
    const data = await readFile(filePath, 'utf8');
    return JSON.parse(data);
}

async function _read() {
    try {
      const data = await readFile(filePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      return {user: []};
    }
  }

async function _write(data) {
    await writeFile(filePath, JSON.stringify(data), 'utf8');
}


export{
    createLog, updateLog, readLog, deleteLog
};

