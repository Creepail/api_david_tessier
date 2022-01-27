fetch('https://ipgeolocation.abstractapi.com/v1/?api_key=4f2f4ee4c522424a92ab42a47ec8dadc')
.then(response => response.json())
.then(locationData => { 
    console.log(locationData)

    fetch('http://api.openweathermap.org/data/2.5/weather?lat=' + locationData.latitude + '&lon=' + locationData.longitude +'&appid=1f841ee1973683bd7f799d206838eb20')
    .then(response => response.json())
    .then(WeatherData => {
        console.log(WeatherData)
    })

})

const audioPlayer = document.querySelector('audio')
const btnAudio = document.querySelector('button')

audioPlayer.volume = 0.5;

audioPlayer.addEventListener('ended', function(){
    this.currentTime = 0;
}, false);



function startAudio(){
    audioPlayer.play()
}