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
        //4. CSS 

    //backend
        //1. grab usercity
        //2. store/ push array and set to local storage (json.stringify)
        //3. get localstorage  (json.parse)
        //4. dynamically append btn to page (forLoop based on array length)
        //5. call the 5day and 1 day passing the city

    
    // CODE ====================================================
    
    
    
    // global variables
    const appid = "acf26acb44236383cfc7ccf03de5f926";
    const date = moment().format("(MM/DD/YYYY)")


    // grabbing user input data
    $("#search-btn").on("click", function(event){
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
            $("#previous-search").append(newDiv)
            //add what is in the input into the newDiv
            newDiv.append(input);
                // why isn't this working????
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
            $("#user-city").text(city + " " + date);
            
            //icon
            // http://openweathermap.org/img/wn/10d@2x.png
            // let currentIcon = "http://openweathermap.org/img/wn/" + icon + ".png"
            // let icon = response.weather[0].icon;
            // console.log(currentIcon);

        
        // temperature
        const temp = response.main.temp;
        // console.log(temp) // in Fahrenheit
        // creating an element to display temp
        $("#currentTemp").append(temp + " " + "&#8457;");

        
        
        //humidity 
        const humidity = response.main.humidity;
        // console.log(humidity); // in %
        $("#currentHum").append(humidity + " " + "%");


        
        //wind speed 
        const windspeed = response.wind.speed
        // console.log(windspeed); // in MPH
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
            // console.log(uvData);
    
            // Create a variable to get the uv data
            var uv = uvData.value;
            
            //show me the numbers
            // console.log(uv)

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
        }).then(function(forecastData) {
            // 3.1 date
            // console.log(forecastData)
            // set variable for the date and display it in moment.js format
            // var dOne = moment(forecastData.list[0].dt_text).format("MM/DD/YY");
            // // overwrite the Day 1 placeholder
            // $("#d-one").text(dOne)
            // var dTwo = moment(forecastData.list[0].dt_text).format("MM/DD/YY");
            // // console.log(dTwo)
            // $("#d-two").text(dTwo)
            // var dThree = moment(forecastData.list[0].dt_text).format("MM/DD/YY");
            // $("#d-three").text(dThree)
            // var dFour = moment(forecastData.list[0].dt_text).format("MM/DD/YY");
            // $("#d-four").text(dFour)
            // var dFive = moment(forecastData.list[0].dt_text).format("MM/DD/YY");
            // $("#d-five").text(dFive)
                // how to find the different dates when they are all in the same array with the same name???

                for (var i = 0; i < forecastData.length; i += 8){
                    // var dOne = moment(forecastData.list[i].dt_text).format("MM/DD/YY");
                    // // overwrite the Day 1 placeholder
                    // $("#d-one").text(dOne)
                }

            // 3.2 icon 
            

            // 3.3 temp 
            // const temp

            // 3.4 humidity
            // const humidity
        });
    }
    fiveday("Brooklyn");
});





