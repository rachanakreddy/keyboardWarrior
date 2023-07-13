export async function createLog(user, song, status) {
    const response = await fetch(`/create?user=${user}&song=${song}&status=${status}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    const data = await response.json();
    return data;
  }
  
  export async function readLog(user) {
    try {
      const response = await fetch(`/read?user=${user}`, {
        method: 'GET',
      });
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  }
  
  export async function updateLog(name, song, status) {
    try{
      const response = await fetch(`/update?user=${name}&song=${song}&status=${status}`, {
        method: 'PUT',
      });
      const data = await response.json();
      return data;
    } catch(err){
      console.log(err);
    }
  }
  
  export async function deleteLog(name, song) {
    try{
      const response = await fetch(`/delete?user=${name}&song=${song}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      return data;
    } catch(err){
      console.log(err);
    }
  }