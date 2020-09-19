console.log("hello");

//Connect to openWeather API. Write a function that pulls data in the city that the user searches for, passing the string typed by the user as the variable getting searched. IE: $("#searchButton").on.("click", function(event){
//     var userSearch = $(event).text
//     cityWeather(userSearch);
// })

//Store whatever that last search result in localStorage and have it show up when the user reopens the page

//Store multiple recent search results on the left column and on click have it repopulate the right column with the saved search city

//Main function that is called any time a user wishes to search weather
// var citySearch = function(city)
// {
//     city.weather
// }

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
    //var searchTerm = $(this).val();
    //citySearch(searchTerm);
//})
//function that runs on refresh to show the past searches
//renderSearches();