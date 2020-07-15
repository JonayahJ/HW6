$(function(){

    //frontend

    //1. search bar id="userCity" btn id="search"
    //1.1 local storage btn 

    //2. 1 day forcast: 
    //2.1a city 
    //2.1a today's date (moment.js) 
    //2.2 temperature 
    //2.3 humidity 
    //2.4 windspeed 
    //2.5 uv (get lon and lat [colors]), 
    //2.6 icon id="oneDay"

    //3. 5 day forcast 
    //3.1 date
    //3.2 icon 
    //3.3 temp 
    //3.4 humidity

    //4. navbar 

    //backend

    //1. grab usercity

    //2. store/ push array and set to local storage (json.stringify)

    //3. get localstorage  (json.parse)

    //4. dynamically append btn to page (forloop based on array length)

    //5. call the 5day and 1 day passing the city

    // because I don't want to have to keep writing in the API key
    const appid = "acf26acb44236383cfc7ccf03de5f926";

    // grabbing user input data
    $(".btn").on("click", function(event){
        event.preventDefault();
        // make a new div
        var newDiv = $("<div>");
        // get the value of the input field
        var input = $("#user-input").val();
        // does it work????????
        console.log(input);
        // if there is input
        if (input){
            //add it to local storage
            localStorage.setItem(input, "");
            //append the newDiv to the previous search area
            $("#previous-search").text(newDiv)
            //add what is in the input into the newDiv
            newDiv.text(input);
        };
    });

    //1day forecast
    function oneday(city){
        //grab the city name
        var userCity = $("#search").val();
        
        //check for city name
        console.log(city)
    
        //api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key}
        // add url extension to convert kelvin into imperial (F) "&units=imperial"
        var urlOneDay = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+appid+"&units=imperial";

        //preview the JSON data
        console.log(urlOneDay)
    
    
    // getting the data
    $.ajax({
        url: urlOneDay,
        method: "GET"
      }).then(function(response) {
        //city, date, icon
            $("#user-city").text(city + " " + moment().format("(MM/DD/YYYY)"))
            
            //icon
            // let currentIcon = "http://openweathermap.org/img/wn/" + icon + ".png"
            // let icon = response.weather[0].icon;
            // console.log(icon);

        
        // temperature
        const temp = response.main.temp;
        console.log(temp) // in Fahrenheit
        // creating an element to display temp
        $("#currentTemp").append(temp + " " + "&#8457;");

        
        
        //humidity 
        const humidity = response.main.humidity;
        console.log(humidity); // in %
        $("#currentHum").append(humidity + " " + "%");


        
        //wind speed 
        const windspeed = response.wind.speed
        console.log(windspeed); // in MPH
        $("#currentWS").append(windspeed + " " + "mph");

        

        //uv (get lon and lat [colors])
        // call second ajax for UV data
            //use the oneday function response data to call up the UV index data
        var lat = response.coord.lat; 
        var lon = response.coord.lon;

        var urlUV = "http://api.openweathermap.org/data/2.5/uvi?appid="+appid+"&lat="+lat+"&lon="+lon;

        $.ajax({
            url: urlUV,
            method: "GET"
        }).then(function(uvData) {

            //does this work?
            console.log(uvData);
    
            // Create a variable to get the uv data
            var uv = uvData.value;
            
            //show me the numbers
            console.log(uv)

            $("#currentUV").append(uv)
        });  
       
      });
    }
    oneday("Brooklyn");

    //fiveday forecast
    function fiveday(city){
        var urlFiveDay = "https://api.openweathermap.org/data/2.5/forecast?q="+city+"&appid="+appid+"&units=imperial";
        console.log(city);
        console.log(urlFiveDay);

        $.ajax({
            url: urlFiveDay,
            method: "GET"
        }).then(function(response) {
            //3.1 date
            // const date

            //3.2 icon 
            

            //3.3 temp 
            // const temp

            //3.4 humidity
            // const humidity
        });
    }
    fiveday("Brooklyn");
});





