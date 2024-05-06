$(document).ready(function() {

    const timer7url = "https://www.7timer.info/bin/api.pl"
    $("#country").change(function() {
        var selectedValue = $(this).val();
        const coordinates = JSON.parse(selectedValue);
       $.ajax({
          url: timer7url,
          method: "GET",
          data: {
            lon: coordinates.lon,
            lat: coordinates.lat,
            product: "civillight",
            output: "json"
          },
          success: function(response) {
            const weather=  JSON.parse(response) 
            $(".row").empty();
  
            weather.dataseries.forEach(forecast => {

                const currentDay = formatDate(forecast.date)
                const weatherStatus = getWeatherTypeTranslation(forecast.weather)
                const weatherEmoji = getWeatherTypeEmojis(forecast.weather)

                $(".row").append(`<div class="col-sm-5 col-lg  weather-col card overflow-hidden  text-bg-dark d-flex flex-column  align-items-center p-2 pt-3">
                <h5 class="day-title">${currentDay}</h5>
                <ul  class="d-flex flex-column  list-unstyled mt-auto  align-items-center p-2">
                    <li class="fs-1 pb-2" >
                    ${weatherEmoji}
                    </li>
                    <li class="weatherText">${weatherStatus}</li>
                    <li  class="p-1 weatherText">
                    High: ${forecast.temp2m.max} ºC
                    </li>
                    <li  class="p-1 weatherText">Low: ${forecast.temp2m.min} ºC</li>
                </ul>  
                </div>`);
                 
             }); 
 

          }
        });
      });
})


function formatDate(dateNum) {
    const dateStr = dateNum.toString()
    const yearDateStr = dateStr.substr(0,4)
    const monthDateStr = dateStr.substr(4,2)
    const dayDateStr = dateStr.substr(6,2)
    const newDate = yearDateStr+"-"+monthDateStr+"-"+dayDateStr 

    const date = new Date(newDate);
   
    // Get the day, month, and year from the Date object.
    const day = date.getDay();
    const month = date.getMonth(); // Months are zero-indexed in JavaScript
    const curdate = date.getDate();

     // Get the name of the day of the week
     const dayOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][day];

     const monthOfYear = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"][month];
 
    // Format the date as "Day Month Date".
    const formattedDate = `${dayOfWeek} ${monthOfYear} ${curdate}`;

    // Log the formatted date to the console. 
     return formattedDate
}    
 

let weatherTypeTranslation = {
    'pcloudy': "Partly Cloudy",
    'mcloudy': "Cloudy",
    'lightrain': "Light rain",
    'oshower': "Occasional showers",
    'ishower': "Isolated showers",
    'lightsnow': "Light or occasional snow",
    'rainsnow': "Mixed",
    'tstorm': "Thunderstorm possible",
    'tsrain': 'Thunderstorm',
    'clear': 'Clear',
    'humid': 'Humid',
    'mixed': 'Mixed',
    'windy': 'Windy'
}
  , weatherTypeEmojis = {
    'clear': '☀️',
    'pcloudy': '⛅',
    'cloudy': '⛅️',
    'mcloudy': '☁️',
    'foggy': '🌫️',
    'humid': '💧',
    'lightrain': '🌦️',
    'oshower': '🌧️',
    'ishower': '🌧️',
    'lightsnow': '🌨️',
    'rain': '🌧️',
    'snow': '❄️',
    'mixed': '🌧️\x20❄️',
    'rainsnow': '🌧️\x20❄️',
    'tstorm': '🌩️',
    'tsrain': '⛈️',
    'windy': '💨'
};


function getWeatherTypeTranslation(weatherTypeCode) {
     
    if(weatherTypeTranslation[weatherTypeCode]){
        return weatherTypeTranslation[weatherTypeCode].toUpperCase();
    }else 
        return weatherTypeCode.toUpperCase();
 
}

function getWeatherTypeEmojis(weatherTypeCode) {
     
    if(weatherTypeEmojis[weatherTypeCode]){
        return weatherTypeEmojis[weatherTypeCode];
    }else 
        return weatherTypeCode;
 
}


// Add loading spinner  on row element based on Ajax request status
$(document).on({
    ajaxStart: function(){
        $(".row").html(`<div class="d-flex justify-content-center">
        <div class="spinner-border" role="status">
          <span class="sr-only"></span>
        </div>
      </div>`); 
    }   
});