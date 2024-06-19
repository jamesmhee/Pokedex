export const getData = async (limit:number, offset:number) =>{    
    let endpoint = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    let config = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const get = await fetch(endpoint, config)
    if(get.ok){
        let json = await get.json()
        return json        
    }
}

export const getPokeData = async (endpoint: string) => {
    let config = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const get = await fetch(endpoint, config)
    if(get.ok){
        let json = await get.json()
        return json
    }
}

export const getFavPokeData = async (id:object[]) => {
    let config = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }    
    let endpoint = `https://pokeapi.co/api/v2/pokemon/${id}`
    const get = await fetch(endpoint, config)
    if(get.ok){
        let json = await get.json()
        return json
    }    
}

export const searchData = async (name: string) =>{
    let endpoint = `https://pokeapi.co/api/v2/pokemon/${name}`
    let config = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }    
    const get = await fetch(endpoint, config)
    if(get.ok){
        let json = await get.json()
        return json
    }    
}