let longi = '-97.7436995';
let lati = '30.2711286';
var name ='';
var key = '15455303619284c5f93381ffcc0affd1';
let CitytoClick = ['Atlanta', 'Denver', 'Seattle', 'Orlando' , 'Chicago', 'Austin', 'Houston'] 

document.getElementById("submit").addEventListener('click', searchInput) 
function searchInput(){   
    var city = document.getElementById("inputs").value
    if(city != ''){
    render(city);
    console.log(city)
    document.getElementById("inputs").value = ""; 
    clearButtons(CitytoClick, city)
    }
    else{
        console.log('ERROR: no city given')
    }
}
function buttonInput(buttonName){
    render(buttonName.id)
}
function render(city){
    var requestOptions = {
    method: 'GET',
    redirect: 'follow'
    };
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city},us&limit=1&appid=${key}`, requestOptions)
    .then(response => response.json())
    .then(function(data){
        var cityName = data[0].name;
        var longi = data[0].lon;
        var lati = data[0].lat;
        console.log(cityName, data[0].lon, data[0].lat);
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${longi}&cnt=6&units=imperial&appid=${key}`, requestOptions)
            .then(response => response.json())
            .then((populate)=> {
                //take epoch time and convert to lcoal date string using date constructor and dt value
                let UTCDay = new Date(populate.dt * 1000)
                var formatDay = UTCDay.toLocaleDateString();
                var curCity = document.getElementById("City");
                var curIcon = document.getElementById("curIcon") 
                var curTemp = document.getElementById("curTemp");
                var curWind = document.getElementById("curWind");
                var curHum = document.getElementById("curHum");
                curCity.innerText = (`${cityName} ${formatDay}`)
                curIcon.src = "http://openweathermap.org/img/w/"+populate.weather[0].icon+".png";
                curTemp.innerText = (`Temp: ${populate.main.temp} F`)
                curWind.innerText = (`Wind: ${populate.wind.speed} MPH`)
                curHum.innerText = (`Humidity: ${populate.main.humidity}%`)
                fetch(`https://api.openweathermap.org/data/2.5/forecast/?lat=${lati}&lon=${longi}&appid=${key}&units=imperial`, requestOptions)
                    .then(response => response.json())
                    .then((populateForcast) => {
                        var count = 0;
                        for(i = 0; i < populateForcast.list.length; i++ ){
                            var UTCEval = new Date(populateForcast.list[i].dt *1000)
                            if(i > 0){
                                let B = i - 1
                                var yesterDate = new Date(populateForcast.list[B].dt *1000)
                                if(splitdate(UTCEval)[1] > splitdate(yesterDate)[1]){
                                    count = count+1;
                                    console.log(`${splitdate(UTCEval)[1]}`)
                                    var icon = document.getElementById(`${count}icon`);
                                    var day = document.getElementById(`${count}day`);
                                    var temp = document.getElementById(`${count}temp`);
                                    var wind = document.getElementById(`${count}wind`);
                                    var hum = document.getElementById(`${count}hum`);

                                    let iconVal = populateForcast.list[i].weather[0].icon;
                                    icon.src = `https://openweathermap.org/img/w/${iconVal}.png`;
                                    day.innerText = (`${UTCEval.toLocaleDateString()}`)
                                    temp.innerText = (`Temp: ${populateForcast.list[i].main.temp} F`)
                                    wind.innerText = (`Wind: ${populateForcast.list[i].wind.speed} MPH`)
                                    hum.innerText = (`Humidity: ${populateForcast.list[i].main.humidity}%`)
                                }
                            }
                            else if(i == 0){
                                console.log('zero')
                                var icon = document.getElementById(`0icon`);
                                var day = document.getElementById(`0day`);
                                var temp = document.getElementById(`0temp`);
                                var wind = document.getElementById('0wind');
                                var hum = document.getElementById(`0hum`);
                                let iconVal = populateForcast.list[i].weather[0].icon;
                                
                                icon.src = `https://openweathermap.org/img/w/${iconVal}.png`;
                                day.innerText = (`${UTCEval.toLocaleDateString()}`)
                                temp.innerText = (`Temp: ${populateForcast.list[i].main.temp} F`)
                                wind.innerText = (`Wind: ${populateForcast.list[i].wind.speed} MPH`)
                                hum.innerText = (`Humidity: ${populateForcast.list[i].main.humidity}%`)
                        }
                        }
            
                                          
                // 
                    })
                    .catch(error => console.log('error', error));
  
            })
            .catch(error => console.log('error', error));
    })
    .catch(error => console.log('error', error));
}   
function splitdate(dates) 
{
    return dates.toLocaleDateString().split('/')
}
function createButtons(data){
    console.log("BUTTIN,")
    data.forEach(element => {
    document.getElementById("listOfSearch").innerHTML += `<button onclick="buttonInput(${element})" id="${element}" class="m-2 mx-auto btn btn-success border border-light"  style="width:100%">${element}</button>`
    })
}
function clearButtons(data, City){
    console.log("BUTTIN Cleared")
    document.getElementById("listOfSearch").innerHTML = '';
    // let data = ['Atlanta', 'Denver', 'Seattle', 'San Francisco', 'Orlando', 'New York City' , 'Chicago', 'Austin', 'Houston'] 
    data.pop();
    data.unshift(City.charAt(0).toUpperCase() + City.slice(1))
    createButtons(data);
    return CitytoClick = data;
}
createButtons(CitytoClick)
