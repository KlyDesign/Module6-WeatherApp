let longi = '-97.7436995';
let lati = '30.2711286';
var name ='';
var key = '15455303619284c5f93381ffcc0affd1';

document.getElementById("submit").addEventListener('click', render) 
function render(){
    if(document.getElementById("inputs") !== undefined)
    {
        var city = document.getElementById("inputs").value;
        
            // const newButton = document.createElement("button");
            // const cityText = document.createTextNode(`${city}`);
            // newButton.appendChild(cityText);
            // const searchList = document.getElementById(listOfSearch);
            // console.log(listOfSearch)
            // searchList.removeChild(searchList.lastElementChild)
            // searchList.appendChildren(newButton);       
    }
    var requestOptions = {
    method: 'GET',
    redirect: 'follow'
    };
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city},us&limit=1&appid=${key}`, requestOptions)
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
                var formatDay = UTCDay.toLocaleDateString() 
                var curDayVal = formatDay.split('/')
                var newDate = curDayVal;
                var curCity = document.getElementById("City");
                var curTemp = document.getElementById("curTemp");
                var curWind = document.getElementById("curWind");
                var curHum = document.getElementById("curHum");
                curCity.innerText = (`${cityName} ${formatDay}`)
                curTemp.innerText = (`Temp: ${populate.main.temp} F`)
                curWind.innerText = (`Wind: ${populate.wind.speed} MPH`)
                curHum.innerText = (`Humidity: ${populate.main.humidity}%`)
                fetch(`https://api.openweathermap.org/data/2.5/forecast/?lat=${lati}&lon=${longi}&appid=${key}&units=imperial`, requestOptions)
                    .then(response => response.json())
                    .then((populateForcast) => {
                        for(i =0; i < populateForcast.list.length; i++ ){
                            var UTCEval = new Date(populateForcast.list[i].dt *1000)
                            if(i > 0){
                                let B = i - 1
                                var yesterDate = new Date(populateForcast.list[B].dt *1000)
                                if(splitdate(UTCEval)[1] > splitdate(yesterDate)[1]){
                                    render(i)
                                }
                            }
                            else if(i = 0){
                                render(i)
                            }
                        }
                        function render(i){
                            for(i=1;i<=6;i++){
                                    var day = document.getElementById(`${i}day`);
                                    var temp = document.getElementById(`${i}temp`);
                                    var wind = document.getElementById(`${i}wind`);
                                    var hum = document.getElementById(`${i}hum`);
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
