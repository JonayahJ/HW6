// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city
// WHEN I open the weather dashboard
// THEN I am presented with the last searched city forecast

//frontend

//1. submit area id="userCity" btn id="submit"
//1.1 localstorage btn 

//2. 1 forcast temp cityname humidity windspped uv (get lon and lat [colors]), pic id="oneDay"

//3. 5 day forcast date, pic, temp humidity

//4. navbar 

//backend

//1. grab usercity
//2. store/ push array and set to local storage (json.stringafy)
//3. get localstorage  (json.parse)
//4. dynamically append btn to page (forloop based on array length)
//5. call the 5day and 1 day passing the city

//fiveday forcast
function fiveday(city){

}

//1day forcast
function oneday(city){
    console.log(city)
    //api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key}
    //var url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid={your api key}";
    var url="http://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=439d4b804bc8187953eb36d2a8c26a02";
console.log(url)
    $.ajax({
        url: url,
        method: "GET"
      }).then(function(response) {
        // temp 
        var temp=response.main.temp;
        console.log(temp)
    //cityname 
    //humidity 
    //windspped 
    //pic
    //uv (get lon and lat [colors]), and call sec ajax
    //dynamically append #oneDay
      
  
        // Create and save a reference to new empty table row
        //var tr = $("<tr>");
  
       
      });
    

}
oneday("Boston");


