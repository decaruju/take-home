import md5 from 'md5';
import keys from './keys.js'

var obj_to_querystring = (obj) => Object.keys(obj).reduce(
        (accumulator, key) => accumulator + `${key}=${obj[key]}&`, 
        "?"
    )
 

export function api_get(url, params={}) {
    var timestamp = Math.floor(new Date() / 1000)
    let query = {
        'ts': timestamp,
        'apikey': keys.public_key,
        'hash': md5(timestamp + keys.private_key + keys.public_key),
        ...params
    }
    return fetch( url + obj_to_querystring(query)).then( results => results.json())
}

export function get_characters(offset=0, params={}) {
    var url = 'https://gateway.marvel.com/v1/public/characters'
    return api_get(url, {...params, offset: offset}).then(data => data.data.results)
}

export function get_character(id, params={}) {
    var url = 'https://gateway.marvel.com/v1/public/characters/'
    return api_get(url + id, {...params}).then(data => data.data.results[0])
}
