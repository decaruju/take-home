import md5 from 'md5';
import keys from './keys.js'

let BASE_URL = 'https://gateway.marvel.com/v1/public/'

export function api_get(url, params={}) {
    let obj_to_querystring = (obj) => Object.keys(obj).reduce(
        (accumulator, key) => accumulator + `${key}=${obj[key]}&`, 
        "?"
    )
    let timestamp = Math.floor(new Date() / 1000)
    let query = {
        'ts': timestamp,
        'apikey': keys.public_key,
        'hash': md5(timestamp + keys.private_key + keys.public_key),
        ...params
    }
    return fetch(url + obj_to_querystring(query)).then(results => results.json())
}

export function get_characters(offset=0, params={}) {
    return api_get(
        BASE_URL + 'characters', 
        {...params, offset: offset}
    ).then(data => data.data.results)
}

export function get_character(id, params={}) {
    return api_get(
        BASE_URL + 'characters/' + id, 
        {...params}
    ).then(data => data.data.results[0])
}
