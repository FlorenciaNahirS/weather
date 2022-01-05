const key = '071a32c6b1aa20d068d03ddd715aca59';
let lat = '-36.6769415180527';
let lon = '-60.5588319815719';
let lang = 'es';
let units = 'metric'

//---MainTemp
const now = document.querySelector('#now');
const tempNow = document.querySelector('#temp');
const like = document.querySelector('#like');
const humedity = document.querySelector('#humedity');
const uv = document.querySelector('#uv');
const mainIcon = document.querySelector('#main-icon');
const description = document.querySelector('#description');

//---HourlyTemp
const hours = document.querySelector('#hours');

//---WeekTepm
const week = document.querySelector('#week');


const endpoint = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${units}&exclude=minutely,alerts&appid=${key}`

fetch(endpoint)
    .then(response => response.json())
    .then(info => {
        console.log(info);

        //---MainTemp
        const {temp,feels_like,humidity,uvi,weather} =  info.current;

        tempNow.innerText = `${temp.toFixed(1)}° C`;
        like.innerText = `Feels like: ${feels_like.toFixed(1)}° C`;
        humedity.innerText = `Humedity: ${humidity}%`;
        uv.innerText = `UV index: ${uvi}`;
        mainIcon.src = `images/${weather[0].icon}.png`;
        description.innerText = `${weather[0].description}`;

        //---HourlyTemp
        const hourlyTemp = info.hourly;

        for (let i = 1; i < 12; i++) { 
            hours.innerHTML += 
            `<div class="hour">
                <div class="hour-temp">
                    <h3>${hourlyTemp[i].temp.toFixed(0)}°</h3>
                    <img src="images/${hourlyTemp[i].weather[0].icon}.png" alt="" class="icon">
                </div>
                <p>${dayjs(hourlyTemp[i].dt * 1000).format('HH:00')}</p>
            </div>`
        }

        //---WeekTepm
        const weekTemp = info.daily;

        for (let i = 1; i < 8; i++) {
            week.innerHTML += 
            `<div class="day">
                <h3 class="day-name">${dayjs(weekTemp[i].dt * 1000).format('ddd')}</h3>
                <img src="images/${weekTemp[i].weather[0].icon}.png" alt="" class="icon">
                <div class="temp">
                    <p class="maxTep">${weekTemp[i].temp.max.toFixed(0)}°</p>
                    <p class="minTep">${weekTemp[i].temp.min.toFixed(0)}°</p>
                </div>
            </div>`
        }
    })
    .catch(e => console.log(e))