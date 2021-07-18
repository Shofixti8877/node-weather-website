const request = require('request')

const geoCode = (address, cb) => {
    const url = `http://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYW1pdHJlaWYiLCJhIjoiY2tyNmJycjdlMDdkcjJwcXJ0ZDBzNTlqYyJ9.4lxCXseCuacDWbOZ-7PHrw&limit=1`

    request({ url, json: true}, (error, { body }) => {
        if(error) {
            cb('unable to connect to geocode', undefined)
        } else if(body.features.length === 0) {
            cb('unable to find data for given location', undefined)
        } else {
            const latitude = body.features[0].center[1]
            const longitude = body.features[0].center[0]
            const location = body.features[0].place_name
            cb(undefined, {
                latitude,
                longitude,
                location
            })
        }
    })
}

module.exports = geoCode