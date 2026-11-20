const API_URL = "https://6afc8b0e892984c4494bb4ed.mockapi.io/channels/channe";


export async function getData(){
try{
    const response=await fetch(API_URL);
    if(!response.ok){
        throw new Error(`Erreur HTTP ${response.status}`);
    }
    const data=await response.json();
    return data;
}catch(error){
    throw new Error(error.message||"propleme reseau");
}
}
export async function changee(id, changes){
    try{
        const response=await fetch(`${API_URL}/${id}`,{
            method:"PUT",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(changes),
        });
        if(!response.ok){
            throw new Error(`Erreur HTTP ${response.status}`);
        }
        return await response.json();
    }catch(error){
        throw new Error(error.message||"probleme reseau");
    }
}

export async function deletee(id){
    try{
        const response=await fetch(`${API_URL}/${id}`,{ method:"DELETE" });
        if(!response.ok){
            throw new Error(`Erreur HTTP ${response.status}`);
        }
        return await response.json();
    }catch(error){
        throw new Error(error.message||"probleme reseau");
    }
}

export async function poste(chaine){
    try{
        const response=await fetch(API_URL,{
            method:"POST",
            headers:{"Content-type":"application/json"},
            body:JSON.stringify(chaine),
        })
        if(!response.ok){
            throw new Error(`Erreur HTTP ${response.status}`);
        }
        return await response.json();
    }catch(error){
      throw new Error(error.message||"propleme reseau");
    }
}

// const API_URL = "https://6af34ebcd2377d6c3704e210.mockapi.io/channels/channel";
//  const response=await fetch(API_URL);
//  const channels=await response.json();

//  for(const channel of channels){
//     await fetch(`${API_URL}/${channel.id}`,{
//         method:"PUT",
//         headers:{"Content-Type":"application/json"},
//         body:JSON.stringify({isFavorite:false,isBlacklisted:false}),
//     })
//  }
//  console.log("Terminé");