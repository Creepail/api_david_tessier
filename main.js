let backgroundImg = document.querySelector('.background')
let dataContainer = document.querySelector('.dataContainer')
const audioPlayer = document.querySelector('audio')
let startMenu = document.querySelector('.menu')
let time = document.querySelector('.time')
console.log(time)
let audioSource = ''
let timeToUpdate

function checkWeather(){
    fetch('https://ipgeolocation.abstractapi.com/v1/?api_key=4f2f4ee4c522424a92ab42a47ec8dadc')
    .then(response => response.json())
    .then(locationData => { 
        console.log(locationData)

        fetch('http://api.openweathermap.org/data/2.5/weather?lat=' + locationData.latitude + '&lon=' + locationData.longitude +'&appid=1f841ee1973683bd7f799d206838eb20')
        .then(response => response.json())
        .then(WeatherData => {
            console.log(WeatherData)

            if(WeatherData.wind.speed >= 15){
                audioSource = 'music/windy.mp3'
                backgroundImg.style.backgroundImage  = 'url("img/windy.png")'
            }
            else if(WeatherData.weather[0].main == 'Thunderstorm' || WeatherData.weather[0].main == 'Drizzle' || WeatherData.weather[0].main == 'Rain'){
                audioSource = 'music/rain.mp3'
                backgroundImg.style.backgroundImage  = 'url("img/rain.png")'
            }
            else if(WeatherData.weather[0].main == 'Snow'){
                audioSource = 'music/snow.mp3'
                backgroundImg.style.backgroundImage  = 'url("img/snow.png")'
            }
            else if(WeatherData.weather[0].main == 'Fog'){
                audioSource = 'music/fog.mp3'
                backgroundImg.style.backgroundImage  = 'url("img/fog.png")'
            }
            else{
                audioSource = 'music/neutral.mp3'
                backgroundImg.style.backgroundImage  = 'url("img/none.png")'
            }
        })
        timeToUpdate = locationData.timezone.current_time.split(":")

        dataContainer.innerHTML += '<h1>'+ locationData.city +'</h1>' 

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

    if(timeToUpdate[1] == 60){
        timeToUpdate[1] = 0;
        timeToUpdate[0] += 1;
        
    }

    if(timeToUpdate[0] == 24){
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

