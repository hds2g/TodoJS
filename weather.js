const weather = document.querySelector(".js-weather");
const wea = document.getElementById("weather");

const COORDS = 'coords';
const API_KEY = "4991858d63d58ef1017e0a314f0d760a";

function getWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    ).then(function(response) {
        return response.json();
    }).then(function(json) {
        //console.log(json);
        const temp = json.main.temp;
        const place = json.name;
        weather.style.fontSize = "40%";
        weather.innerText = `${temp} @ ${place}`
    });
}

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude,
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError() {
    console.log("can't get geo location");
}


function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);

}
function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords==null) {
        askForCoords();
    } else {
        const parseCoords = JSON.parse(loadedCoords);
        console.log(parseCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);

    }
}

function init() {
    loadCoords();
    console.log(wea);
}

init();