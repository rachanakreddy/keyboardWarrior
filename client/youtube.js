async function getVideo(query){
    const res = await fetch('/youtubeGetVideo', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'query': query
        })
    });
    let data = await res.json();
    return data;
}

const isPianoComp = async(video) =>{
    if(video.items === undefined || video.items[0].length === 0){
        return false;
    }
    let title = await video.items[0].snippet.title;
    title = title.replace(/[^ a-z0-9]/gi, '');
    let titleArr =title.split(' ');
    for(let i = 0; i < titleArr.length; i++){
        if(titleArr[i].toLowerCase() == "piano" ){
            return true;
        }
    }
    return false;

};

const getVideoID = async(video) => {
    if(video.items === undefined || video.items[0].length === 0){
        return 0;
    }
    const retVideoID = await video.items[0].id.videoId;
    return retVideoID;
};

const getVideoInfo = async(query) => {
    let video = await getVideo(query);
    let bool = await isPianoComp(video);
    let ytID = await getVideoID(video);
    return {
        isComp : bool,
        ytID: ytID
    }
};

export {
    getVideoInfo
};