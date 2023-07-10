
const getAuthToken = async () => {
    const res = await fetch(`/spotify/authtoken`, {
        method: "GET"
    })
    let token = await res.json();
    return token.access_token;
};


