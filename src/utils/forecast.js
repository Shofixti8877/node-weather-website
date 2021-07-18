const request = require('request')

const forecast = (lat, long, cb) => {
    const url = `http://api.weatherstack.com/current?access_key=fce94826ecbb85c2ebcc6fb35f688f69&query=${long},${lat}`
    request({ url, json: true}, (error, { body }) => {
        const {error: bodyError, current} = body
        if(error) {
            cb('unable to connect to geocode', undefined)
        } else if(bodyError) {
            cb('unable to find location', undefined)
        } else {
            const currentData = current;
            const {weather_descriptions, temperature, feelslike} = currentData
            cb(undefined, `${weather_descriptions[0]}. It is currently ${temperature} degrees out, but it feels like ${feelslike} degrees`)
        }
    })
}

module.exports = forecast