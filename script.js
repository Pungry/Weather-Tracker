console.log("hello");

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
    var queryURL = "api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=941384f3ad9319cea1d15e58a1f228c4id";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
    })
}

//function to render buttons
//var renderSearches = function() {
    //for (var i = 0; i < searches.length; i++)
    //{
        //var printPast = localStorage.getItem(pastSearches, searches[i])
        //var newButton = $("<button>")
        //newButton.text(printPast);
        //newButton.addClass(oldSearch)
        //leftSideSearchButtons.prepend(newButton)
    //}
//};
//click event on past searches; written this way so the dynamically generated buttons can be clicked
//$(document).on("click", ".oldSearch", function(event){
    //var searchTerm = $(this).attr("data-name");
    //citySearch(searchTerm);
//})
//function that runs on refresh to show the past searches
//renderSearches();