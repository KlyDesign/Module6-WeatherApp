var longi = '';
var lati = '';
var name ='';
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
    fetch(`https://api.openweathermap.org/data/2.5/forecast/?lat=${lati}&lon=${longi}&cnt=5&appid=${key}`, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    })
    .catch(error => console.log('error', error));
})

