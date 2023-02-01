var longi = '';
var lati = '';
var name ='';
var key = '15455303619284c5f93381ffcc0affd1';
document.getElementById("submit").addEventListener('click', function () {
    let city = document.getElementById("inputs").value;
    var requestOptions = {
    method: 'GET',
    redirect: 'follow'
    };
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city},us&limit=1&appid=${key}`, requestOptions)
    .then(response => response.json())
    .then(function(data){
    var longi = data[0].lon;
    var lati = data[0].lat;
    var city = data[0].name;
    fetch(`https://api.openweathermap.org/data/2.5/forecast/?lat=${lati}&lon=${longi}&cnt=6&units=imperial&appid=${key}`, requestOptions)
        .then(response => response.json())
        // .then(result => console.log(result.list[0].main.temp,result.list[0].main.humidity,result.list[0].wind.speed))
        .then(function(populate){
            var curCity = document.getElementById("City");
            var curTemp = document.getElementById("curTemp");
            var curWind = document.getElementById("curWind");
            var curHum = document.getElementById("curHum");
            curCity.innerText = (`${populate.city.name} ${dayParse(populate.list[0].dt_txt)}`)
            curTemp.innerText = (`Temperature: ${populate.list[0].main.temp}F`)
            curWind.innerText = (`Wind Speed: ${populate.list[0].wind.speed}MPH`)
            curHum.innerText = (`Humidity: ${populate.list[0].main.humidity}%`)
            for(i=1;i<=6;i++){
                var curCity = document.getElementById("City");
            }
        })
        .catch(error => console.log('error', error));
    })
    .catch(error => console.log('error', error));
})

function dayParse(date){
    let newDate = date.slice(0,10)
    return newDate;
}
//populate initally
// var requestOptions = {
// method: 'GET',
// redirect: 'follow'
// };
// fetch(`http://api.openweathermap.org/geo/1.0/direct?q=austin,us&limit=1&appid=${key}`, requestOptions)
// .then(response => response.json())
// .then(function(data){
// var longi = data[0].lon;
// var lati = data[0].lat;
// var city = data[0].name;
// fetch(`https://api.openweathermap.org/data/2.5/forecast/?lat=${lati}&lon=${longi}&cnt=5&units=imperial&appid=${key}`, requestOptions)
//     .then(response => response.json())
//     .then(result => console.log(result.list[0].main.temp,result.list[0].main.humidity,result.list[0].wind.speed))
//     .catch(error => console.log('error', error));
// })
// .catch(error => console.log('error', error));
