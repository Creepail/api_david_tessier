let backgroundImg = document.querySelector('.background')
let dataContainer = document.querySelector('.dataContainer')
const audioPlayer = document.querySelector('audio')
let startMenu = document.querySelector('.menu')
let time = document.querySelector('.time')
console.log(time)
let audioSource = ''
let timeToUpdate
let locationInfo 

async function checkWeather(){
    fetch('https://ipgeolocation.abstractapi.com/v1/?api_key=4f2f4ee4c522424a92ab42a47ec8dadc')
    .then(response => response.json())
    .then(locationData => { 
        locationInfo = locationData

        fetch('http://api.openweathermap.org/data/2.5/weather?lat=' + locationData.latitude + '&lon=' + locationData.longitude +'&appid=1f841ee1973683bd7f799d206838eb20&units=metric')
        .then(response => response.json())
        .then(WeatherData => {
            console.log(WeatherData)

            if(WeatherData.wind.speed >= 15){
                audioSource = 'music/windy.mp3'
                backgroundImg.style.backgroundImage  = 'url("img/windy.png")'
                reloadAudio()
            }
            else if(WeatherData.weather[0].main == 'Thunderstorm' || WeatherData.weather[0].main == 'Drizzle' || WeatherData.weather[0].main == 'Rain'){
                audioSource = 'music/rain.mp3'
                backgroundImg.style.backgroundImage  = 'url("img/rain.png")'
                reloadAudio()
            }
            else if(WeatherData.weather[0].main == 'Snow'){
                audioSource = 'music/snow.mp3'
                backgroundImg.style.backgroundImage  = 'url("img/snow.png")'
                reloadAudio()
            }
            else if(WeatherData.weather[0].main == 'Fog'){
                audioSource = 'music/fog.mp3'
                backgroundImg.style.backgroundImage  = 'url("img/fog.png")'
                reloadAudio()
            }
            else{
                audioSource = 'music/neutral.mp3'
                backgroundImg.style.backgroundImage  = 'url("img/none.png")'
                reloadAudio()
            }

            dataContainer.innerHTML = '<p class="time"></p>' + '<p>'+ 'Current Weather : ' + WeatherData.weather[0].description  +'</p>' + '<p>'+ WeatherData.main.feels_like +' *C</p>'   + '<h1>'+ locationData.city +'</h1>'

        })
        timeToUpdate = locationData.timezone.current_time.split(":")

        console.log(audioSource)

    })
}

checkWeather()



function updateTime(){
    timeToUpdate[0] = parseInt(timeToUpdate[0])
    timeToUpdate[1] = parseInt(timeToUpdate[1])
    timeToUpdate[2] = parseInt(timeToUpdate[2])

    if( timeToUpdate[2] < 59){
       timeToUpdate[2] += 1
       
       
    }else {
        timeToUpdate[2] = 0;
        timeToUpdate[1] += 1;
        
    }

    if(timeToUpdate[1] > 59){
        timeToUpdate[1] = 0;
        timeToUpdate[0] += 1;
        
    }

    if(timeToUpdate[0] > 24){
        timeToUpdate[0] = 0;
        
    }



    setTimeout(function (){
  
        document.querySelector('.time').innerHTML = timeToUpdate[0] + ' : ' + timeToUpdate[1] + ' : ' + timeToUpdate[2]
        updateTime()              
      }, 1000);
}

setTimeout(function (){
    updateTime()
  }, 1000);

audioPlayer.volume = 0.5;

audioPlayer.addEventListener('ended', function(){
    this.currentTime = 0;
}, false);



function startAudio(){
    audioPlayer.src= audioSource
    audioPlayer.play()
    startMenu.style.display= 'none';
}


function reloadAudio(){
    audioPlayer.src= audioSource
    audioPlayer.play()
}

let screenType = 0;

function seeWorldEvil(){

    if(screenType == 0 ){

        
    fetch('http://api.openweathermap.org/data/2.5/air_pollution?lat=' + locationInfo.latitude + '&lon=' + locationInfo.longitude +'&appid=1f841ee1973683bd7f799d206838eb20')
    .then(response => response.json())
    .then(polutionInfo => {
        audioSource = 'music/corruption.mp3'
        reloadAudio()
        backgroundImg.style.backgroundImage  = 'url("img/corruption.png")'
        document.querySelector('.worldEvil').innerHTML = '<p>World weather</p>'


        if(polutionInfo.list[0].main.aqi == 1 ){
            dataContainer.innerHTML = '<p class="time"></p>' + '<p>Your world is 20% corrupted (air quality is good)</p>'

        }
        else if(polutionInfo.list[0].main.aqi == 2 ){
            dataContainer.innerHTML = '<p class="time"></p>' + '<p>Your world is 40% corrupted (air quality is fair)</p>' 

        }

        else if(polutionInfo.list[0].main.aqi == 3 ){
            dataContainer.innerHTML = '<p class="time"></p>' + '<p>Your world is 60% corrupted (air quality is moderate)</p>' 

        }
        else if(polutionInfo.list[0].main.aqi == 4 ){
            dataContainer.innerHTML = '<p class="time"></p>' + '<p>Your world is 80% corrupted (air quality is poor)</p>' 

        }
        else if(polutionInfo.list[0].main.aqi == 5 ){
            dataContainer.innerHTML = '<p class="time"></p>' + '<p>Your world is 100% corrupted (air quality is very poor)</p>' 

        }

        dataContainer.innerHTML += '<p> Air components : <br> co: ' 
        + polutionInfo.list[0].components.co + '<br> nh3: '
        + polutionInfo.list[0].components.nh3 + '<br> no: '  
        + polutionInfo.list[0].components.no + '<br> no2: '  
        + polutionInfo.list[0].components.no2 + '<br> o3: '  
        + polutionInfo.list[0].components.o3 + '<br> pm2_5: '  
        + polutionInfo.list[0].components.pm2_5 + '<br> pm10: '  
        + polutionInfo.list[0].components.pm10 + '<br> so2: '  
        + polutionInfo.list[0].components.so2 + 
        '</p>' + '<h1>'+ locationInfo.city +'</h1>' 




        console.log(polutionInfo)
        screenType = 1
    })


    }

    else{
        checkWeather()
        document.querySelector('.worldEvil').innerHTML = '<p>World evil</p>'
        screenType = 0
    }

}