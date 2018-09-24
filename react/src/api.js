import md5 from 'md5';
import keys from './keys.js'

var obj_to_querystring = (obj) => Object.keys(obj).reduce(
        (accumulator, key) => accumulator + `${key}=${obj[key]}&`, 
        "?"
    )
 

function api_get(url, params={}) {
    var timestamp = Math.floor(new Date() / 1000)
    let query = {
        'ts': timestamp,
        'apikey': keys.public_key,
        'hash': md5(timestamp + keys.private_key + keys.public_key),
        ...params
    }
    return fetch( url + obj_to_querystring(query)).then(
        results => {console.log(results); return results.json()}
    )
}

export default api_get