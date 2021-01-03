const weather = document.querySelector('.js-weather');
const API_KEY = '1cdc05f30e36fcf19d703b84fd9eb94e';
const COORDS = 'coords';

function getweather(lat,lng){
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
        )
        .then(function(response){
        return response.json()
        }).then(function(json){
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText= `${temperature} @ ${place}`
        })
    }

function saveCoords(coordsObj){
    localStorage.setItem(COORDS,JSON.stringify(coordsObj));
}

function handleGeoSuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getweather(latitude,longitude)
}

function handleGeoError(){
    console.log("can't access geo location")
}

function askForCords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess,handleGeoError);
}

function loadCoords(){
    const loadedCords = localStorage. getItem(COORDS);
    if(loadedCords === null){
        askForCords()
    }else{
        const parseCoords = JSON.parse(loadedCords);
        getweather(parseCoords.latitude, parseCoords.longitude)
    }
}


function init(){
    loadCoords();
}

init()