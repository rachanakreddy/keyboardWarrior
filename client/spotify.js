
async function getAuthToken(){
    const res = await fetch('/spotify/authtoken', {method: "GET"});
    let token = await res.json();
    return token.access_token;
}



async function searchTrack(search){
    let authToken = await getAuthToken();
    const res = await fetch(`/spotify/gettrack`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'token': authToken,
            'quer': quer,
            'offset': offset
        })
    });

    let track = await res.json();
}


