//Main function that is called any time a user wishes to search weather by using the search form. It trims the user's input and sends it to citySearch to actually take care of searching the weather.
$("#search").on("click", function(event){
    event.preventDefault();
    var cityInput = $("#city-input").val().trim();
    if (cityInput)
        {
        citySearch(cityInput);
        }
})

//This is the function at the heart of the app. It takes the search term as a parameter and runs three AJAX requests for weather info.
var citySearch = function(city)
{
    //This is checking if an old search button was pressed, and changes the queryURL to search for that old search city instead.
    if ($(this).attr("data-search"))
    {
        city = $(this).attr("data-search");
    }
    //If no saved search button was pressed, the city that was put in the form is instead used.
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&cnt=5&appid=941384f3ad9319cea1d15e58a1f228c4";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        var cityName = response.name;
        $("#city-name").text(cityName + moment().format(" M/D/YY"));
        var iconID = response.weather[0].icon;
        var iconURL =  "http://openweathermap.org/img/wn/" + iconID + "@2x.png";
        $("#weather-icon").attr("src", iconURL);
        var newTemp = $("#temperature");
        var fTemp = Math.floor(((parseInt(response.main.temp) - 273.15) * (9/5)) + 32);
        newTemp.text("Temperature: " + fTemp + " degrees, Fahrenheit");
        var newHumidity = $("#humidity");
        var humidityPercentage = response.main.humidity;
        newHumidity.text("Humidity: " + humidityPercentage + "%");
        var newWindSpeed = $("#wind-speed");
        var windSpeedMPH = response.wind.speed;
        newWindSpeed.text("Wind Speed: " + windSpeedMPH + "MPH");
        //OpenWeatherAPI does not provide the UV index on a normal City Search. Instead, the latitude and longitude of the location is needed to return the UV Index. That is why a second AJAX call is nestled inside this first one, where the UV Index is specifically called for using the city's latitude and longitude.
        var latCoor = response.coord.lat;
        var lonCoor = response.coord.lon;
        var UVUrl = "http://api.openweathermap.org/data/2.5/uvi?appid=941384f3ad9319cea1d15e58a1f228c4&lat=" + latCoor + "&lon=" + lonCoor + "&cnt=5"
        $.ajax({
            url: UVUrl,
            method: "GET"
        }).then(function(uvresponse)
        {
            var newUV = $("#uv-index");
            if (Math.floor(uvresponse.value) === 0 || Math.floor(uvresponse.value) === 1 || Math.floor(uvresponse.value) === 2 || Math.floor(uvresponse.value) === 3)
            {
                newUV.addClass("text-primary");
            }
            if (Math.floor(uvresponse.value) === 4 || Math.floor(uvresponse.value) === 5 || Math.floor(uvresponse.value) === 6)
            {
                newUV.addClass("text-warning");
            }
            else 
            {
                newUV.addClass("text-danger");
            }
            newUV.text("UV Index: " + uvresponse.value);
        })

    //For the five day forecast, all the dates are grouped together because they rely on taking current date from Moment
    $("#day-1-date").text(moment().add(1, 'days').format('l'));
    $("#day-2-date").text(moment().add(2, 'days').format('l'));
    $("#day-3-date").text(moment().add(3, 'days').format('l'));
    $("#day-4-date").text(moment().add(4, 'days').format('l'));
    $("#day-5-date").text(moment().add(5, 'days').format('l'));
    
    //One call forecast AJAX for next five days of info. Three AJAX requests in one function!
    var forecastURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latCoor + "&lon=" + lonCoor + "&appid=941384f3ad9319cea1d15e58a1f228c4";
    $.ajax({
        url: forecastURL, 
        method: "GET"
        }).then(function(forecastResponse){
            var day1Temp = (Math.floor(parseInt(forecastResponse.daily[1].temp.day) - 273.15) * (9/5) + 32);
            $("#day-1-temp").text("Temperature: " + day1Temp + " degrees");
            var day2Temp = (Math.floor((parseInt(forecastResponse.daily[2].temp.day) - 273.15) * (9/5)) + 32);
            $("#day-2-temp").text("Temperature: " + day2Temp + " degrees");
            var day3Temp = (Math.floor(parseInt(forecastResponse.daily[3].temp.day) - 273.15) * (9/5) + 32);
            $("#day-3-temp").text("Temperature: " + day3Temp + " degrees");
            var day4Temp = (Math.floor(parseInt(forecastResponse.daily[4].temp.day) - 273.15) * (9/5) + 32);
            $("#day-4-temp").text("Temperature: " + day4Temp + " degrees");
            var day5Temp = (Math.floor(parseInt(forecastResponse.daily[5].temp.day) - 273.15) * (9/5) + 32);
            $("#day-5-temp").text("Temperature: " + day5Temp + " degrees");
            var day1Humidity = forecastResponse.daily[1].humidity;
            $("#day-1-humidity").text("Humidity: " + day1Humidity + "%")
            var day2Humidity = forecastResponse.daily[2].humidity;
            $("#day-2-humidity").text("Humidity: " + day2Humidity + "%")
            var day3Humidity = forecastResponse.daily[3].humidity;
            $("#day-3-humidity").text("Humidity: " + day3Humidity + "%")
            var day4Humidity = forecastResponse.daily[4].humidity;
            $("#day-4-humidity").text("Humidity: " + day4Humidity + "%")
            var day5Humidity = forecastResponse.daily[5].humidity;
            $("#day-5-humidity").text("Humidity: " + day5Humidity + "%")
            var day1Icon = forecastResponse.daily[1].weather[0].icon;
            var day1IconURL = "http://openweathermap.org/img/wn/" + day1Icon + "@2x.png";
            $("#day-1-icon").attr("src", day1IconURL);
            var day2Icon = forecastResponse.daily[2].weather[0].icon;
            var day2IconURL = "http://openweathermap.org/img/wn/" + day2Icon + "@2x.png";
            $("#day-2-icon").attr("src", day2IconURL);
            var day3Icon = forecastResponse.daily[3].weather[0].icon;
            var day3IconURL = "http://openweathermap.org/img/wn/" + day3Icon + "@2x.png";
            $("#day-3-icon").attr("src", day3IconURL);
            var day4Icon = forecastResponse.daily[4].weather[0].icon;
            var day4IconURL = "http://openweathermap.org/img/wn/" + day4Icon + "@2x.png";
            $("#day-4-icon").attr("src", day4IconURL);
            var day5Icon = forecastResponse.daily[5].weather[0].icon;
            var day5IconURL = "http://openweathermap.org/img/wn/" + day5Icon + "@2x.png";
            $("#day-5-icon").attr("src", day5IconURL);
        })
        //Saving the search as the last search and constantly overwriting it as it changes.
        localStorage.setItem("lastSearch", cityName);
        
        //This set of code is making a button that populates the left side of the screen with the previously done searches.
        var savedSearch = $("<button>");
        savedSearch.text(cityName);
        savedSearch.attr("data-search", cityName);
        savedSearch.addClass("btn btn-primary old-search");
        $(".old-searches").prepend(savedSearch);
    })
}

//Runs the last search the user did before closing the tab when the tab is opened again.
citySearch(localStorage.getItem("lastSearch"));

//Whenever a saved search button is clicked, the citySearch function fires again.
$(document).on("click", ".old-search", citySearch);