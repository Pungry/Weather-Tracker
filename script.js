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
        console.log(iconID);
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
        })

        //Five day forecast time
        //Date
        //Weather Icon (response.weather[0].icon)
        //Temp
        //Humidity

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