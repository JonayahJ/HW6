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
    let cityArray = [];


    // Function for displaying movie data
    function renderButtons() {
        console.log("render btn")

    // Deletes the movies prior to adding new movies
    // (this is necessary otherwise you will have repeat buttons)
    $("#previous-search").empty();
    // Loops through the array of movies
    for (var i = 0; i < cityArray.length; i++) {

    // Then dynamicaly generates buttons for each item in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var a = $("<button>");
    // Adds a class of movie to our button
    a.addClass("searchCity");
    // Added a data-attribute
    a.attr("data-name", cityArray[i]);
    // Provided the initial button text
    a.text(cityArray[i]);
    // Added the button to the buttons-view div
    $("#previous-search").append(a);
    // console.log(a);
  }
//   console.log("end render fx")
}

    // This function handles events where the add item button is clicked
    $("#search-btn").on("click", function(event) {
    event.preventDefault();
    // This line of code will grab the input from the textbox
    var userCity = $("#user-input").val().trim();

    // The item from the textbox is then added to our array
    cityArray.push(userCity);
    console.log(cityArray)

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
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
            
            //icon
            // http://openweathermap.org/img/wn/10d@2x.png
            var icon = $("<img>");
            icon.attr("src","http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png");

            console.log(icon)

            $("#user-city").text(city + " " + date);


        
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

       for(var i = 0;i < 5; i++){


        var d1 = $("<div>");
        d1.attr("class","card text-white bg-primary mb-3")
            // d1 styling 
            d1.attr("style", "padding: 10px")
            d1.attr("style", "text-align: center")
        var d2=$("<div>"); 
        d2.attr("class", "card-body");
        var h5=$("<h5>");
        h5.attr("class", "card-title");
        h5.attr("id", "d-one");
        h5.text(moment(forecastData.list[i*8].dt_txt).format("MM/DD/YY"));

        // http://openweathermap.org/img/wn/10d@2x.png
        var icon=$("<img>");
        icon.attr("src","http://openweathermap.org/img/wn/"+forecastData.list[i*8].weather[0].icon+"@2x.png");
        console.log(icon)
    
        var p1=$("<p>");
        p1.attr("class", "card-text");
        p1.attr("id", "t-one");
        p1.text("Temp: " + forecastData.list[i*8].main.temp + " " + "°F") 
        var p2=$("<p>");
        p2.attr("class", "card-text");
        p2.attr("id", "h-one");
        p2.text("Hum: " + forecastData.list[i*8].main.humidity + " " + "%");

        d1.append(d2);
        d1.append(h5);
        d1.append(icon);
        d1.append(p1);
        d1.append(p2);


     $("#fivedayarea").append(d1);
       }
    });
    
    }
    fiveday("Brooklyn");
});





