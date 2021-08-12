const request = require('request')

const forecast = (long, lat, result) => {
    const url = 'http://api.weatherstack.com/current?access_key=11e12eac104145f534356c2a8e4fd67e&query=' + lat + ',' + long + '&units=f'

    request({url, json: true}, (error, {body}) => {
        if(error){
            result('Unable to connect to weather services!', undefined)
        }
        else if(body.error === false){
            result('Invalid input', undefined)
        }
        else{
            result(undefined, `${body.current.weather_descriptions[0]}. It's ${body.current.temperature}, but it feels like ${body.current.feelslike}`)
        }
    })

}

module.exports = forecast