console.log("hello");
var searches = [];

//Connect to openWeather API. Write a function that pulls data in the city that the user searches for, passing the string typed by the user as the variable getting searched. IE: $("#searchButton").on.("click", function(event){
//     var userSearch = $(event).text
//     cityWeather(userSearch);
// })

//Store whatever that last search result in localStorage and have it show up when the user reopens the page

//Store multiple recent search results on the left column and on click have it repopulate the right column with the saved search city

//Main function that is called any time a user wishes to search weather
$("#search").on("click", function(event){
    event.preventDefault();
    var cityInput = $("#city-input").val().trim();
    if (cityInput)
        {
        citySearch(cityInput);
        }
})

var citySearch = function(city)
{
    console.log(city);
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&cnt=5&appid=941384f3ad9319cea1d15e58a1f228c4";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        var cityName = response.name;
        $("#city-name").text(cityName + moment().format(" M/D/YY"));
        var iconID = response.weather[0].icon;
        console.log(response);
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
            console.log(uvresponse.value);
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
            console.log(uvresponse);
        })

        //Five day forecast time; first, all the dates are together because they rely on taking current date from Moment
    $("#day-1-date").text(moment().add(1, 'days').format('l'));
    $("#day-2-date").text(moment().add(2, 'days').format('l'));
    $("#day-3-date").text(moment().add(3, 'days').format('l'));
    $("#day-4-date").text(moment().add(4, 'days').format('l'));
    $("#day-5-date").text(moment().add(5, 'days').format('l'));
    
    //One call forecast AJAX for next five days of info.
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

        // //var savedSearch = $("<button>");
        // var savedSearch = response.name;
        // //send to localStorage here
        // localStorage.setItem(pastSearches, savedSearch);
        // renderSearches();
    })
}

//function to render buttons
// var renderSearches = function() {
//     for (var i = 0; i < searches.length; i++)
//     {
//         var printPast = localStorage.getItem(pastSearches, searches[i])
//         var newButton = $("<button>")
//         newButton.text(printPast);
//         newButton.addClass(oldSearch)
//         $(".old-searches").prepend(newButton)
//     }
// };
//click event on past searches; written this way so the dynamically generated buttons can be clicked
//$(document).on("click", ".oldSearch", function(event){
    //var searchTerm = $(this).attr("data-name");
    //citySearch(searchTerm);
//})
//function that runs on refresh to show the past searches
//renderSearches();