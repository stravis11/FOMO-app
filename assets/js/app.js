//--------------------------------TV/Movie Page -----------------------------

//Create global variables
var queryURL = '';
var startDate = "";
var endDate = "";

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0');
var yyyy = today.getFullYear();

today = yyyy + '-' + mm + '-' + dd;



//When a user clicks submit
$('#submit-button').on('click', function () {
    //Prevent default
    event.preventDefault();
    $("#movie-row").empty();
    //Capture date in the input box
    // var startDate = $("#startDate").val();
    // var endDate = $("#endDate").val();
    //If there is something in the search bar, 
    //insert the date as a parameter in the query URL and call the ajax request
    //if (startDate !== "" && endDate !== "") {
        queryURL = "https://api.themoviedb.org/3/discover/movie?api_key=c472f72e061f4083caae81e6e937276a&primary_release_date.lte=" + today + "&language=en&sort_by=popularity.desc";
        getMovies();
    //}
});
//Ajax request
function getMovies() {
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        //TEST
        console.log(response);
        for (var j = 2; j >= 0; j--) {

            var avgVote = response.results[j].vote_average;
            var movieName = response.results[j].original_title;
            var posterURL = response.results[j].poster_path;
            var movieOverview = response.results[j].overview;
            var movieNameID = response.results[j].original_title.replace(/\s/g, '-').replace(/[^\w\s]/gi, '');

            var cardMovieTitle = $('<h3 class = "card-title">').text(movieName);
            var cardMovieAvgVote = $('<h5 class = "card-title">').text("Average Viewer Rating: " + avgVote);
            var cardMovieOverview = $('<p class = "card-text">').text(movieOverview);


            var card = $('<div class = "card col-lg-3 col-md-4 col-sm-6 col-xs-12" id="' + movieNameID + '">')
                .append($('<img class = "poster card-img-top" src = "https://image.tmdb.org/t/p/w200/' + posterURL + '">'))
                .insertAfter($('<div class = "card-body">'))
                .append(cardMovieTitle)
                .append(cardMovieAvgVote)
                .append(cardMovieOverview);

            card.insertAfter($("#movie-row"));


        }
    });
};


