// -----------------------------------------------------------
// Global Variables
// -----------------------------------------------------------

var movies = {
	movie1: '',
	movie2: ''
}
var score1; //Score variable for movie 1
var score2; //Score varriable for movie 2
var failedResponse = false; //Variable to use if modal is a failed response (so it won't disappear after AJAX is done loading)

// -----------------------------------------------------------
// Functions/Actions/Modal
// -----------------------------------------------------------

function movieSearch() {
	//If two movies have not already been chosen
	if (movies.movie1 == '' || movies.movie2 == '') {

		//If search field isn't empty
		if ($('#movieTitle').val() !== '') {

			var title = $('#movieTitle').val().trim();

			//Clear the search input
			$('#movieTitle').val('');

			//If there's already a movie1, check to make sure it isn't the same as the current search term
			if (movies.movie1.Title && movies.movie1.Title.toLowerCase() == title.toLowerCase()) {
				console.log('Can\'t compare the same movie!');
				$('#modal-bg').fadeIn();
				$('#modal-message').html('You\'ve aleady searched for that movie!');
			}
			//If there's already a movie2, check to make sure it isn't the same as the current search term
			else if (movies.movie2.Title && movies.movie2.Title.toLowerCase() == title.toLowerCase()) {
				console.log('Can\'t compare the same movie!');
				$('#modal-bg').fadeIn();
				$('#modal-message').html('You\'ve aleady searched for that movie!');
			}
			//Otherwise, run the AJAX calls
			else {

			var queryURL = "http://www.omdbapi.com/?t=" + title + "&plot=short&r=json";
			var imdbid;
			var omdbResponse;

				//Make Ajax call to OMDB
				$.ajax({url: queryURL, method: 'GET'}).done(function(response) {
					imdbid = response.imdbID;
					omdbResponse = response;
					console.log('OMDB response added');

					failedResponse = false;

					//If omdb searches and finds something other than a movie
					if (omdbResponse.Type !== 'movie') {
						console.log('Error! Search item is not a movie!');
						failedResponse = true;
						$('#modal-bg').fadeIn();
						$('#modal-message').html('That\'s not a movie! Try searching again.');
					}
					else {

						//Make second Ajax call to IMDB API
						$.ajax({
							url: "http://imdb.wemakesites.net/api/" + imdbid,
							crossDomain: true,
							dataType: "jsonp",
							success: function(response) {
								console.log('IMDB response added');

								if (response.status == 'success') {

									if (movies.movie1 == '') {
										//Add omdbResponse to movies object
										movies.movie1 = omdbResponse;

										//Add review to movies object if there is a review
										if (response.data.review !== null) {
											movies.movie1.review = response.data.review.text;
											movies.movie1.reviewRating = response.data.review.rating;
										}

										//Add removal button
										var btnClose = $('<i>');
										btnClose.attr('class', 'fa fa-times removal-button');
										btnClose.attr('area-hidden', 'true');
										btnClose.attr('id', 'remove-movie1');
										btnClose.attr('title', 'Remove movie');
										$('#movie1').append(btnClose);

										//Add movie poster
										var poster = $('<img>')
										if (omdbResponse.Poster == 'N/A') {
											poster.attr('src','images/no-poster.jpg');
										}
										else {
											poster.attr('src',omdbResponse.Poster);
										}
										poster.attr('class','movie-poster');
										poster.attr('id','movie1-poster');
										$('#movie1').append(poster);

										//Add movie title
										$('#movie1').append('<h2>' + movies.movie1.Title + '</h2>');

										//Add table for the movie info
										var table = $('<table>');
										table.attr('class','u-full-width');
										table.attr('id','movie1-table');
										$('#movie1').append(table);

										//Add movie info to table
										if (movies.movie1.Year !== 'N/A') {
											$('table#movie1-table').append('<tr><td>Year</td><td>' + movies.movie1.Year + '</td></tr>');
										}
										if (movies.movie1.Rated !== 'N/A') {
											$('table#movie1-table').append('<tr><td>Rating</td><td>' + movies.movie1.Rated + '</td></tr>');
										}
										if (movies.movie1.Actors !== 'N/A') {
											$('table#movie1-table').append('<tr><td>Actors</td><td>' + movies.movie1.Actors + '</td></tr>');
										}
										if (movies.movie1.Genre !== 'N/A') {
											$('table#movie1-table').append('<tr><td>Genre</td><td>' + movies.movie1.Genre + '</td></tr>');
										}
										if (movies.movie1.Metascore !== 'N/A') {
											$('table#movie1-table').append('<tr><td>Metascore</td><td>' + movies.movie1.Metascore + '</td></tr>');
										}
										if (movies.movie1.imdbRating !== 'N/A') {
											$('table#movie1-table').append('<tr><td>IMDb Rating</td><td>' + movies.movie1.imdbRating + '</td></tr>');
										}
										if (movies.movie1.Plot !== 'N/A') {
											$('table#movie1-table').append('<tr><td>Plot</td><td>' + movies.movie1.Plot + '</td></tr>');
										}
										if (movies.movie1.review !== undefined) {
											$('table#movie1-table').append('<tr><td>Review</td><td>"' + movies.movie1.review + '" —<em>' + movies.movie1.reviewRating + '</em></td></tr>');
										}

										//Fade in movie1 div
										$('#movie1').fadeIn();
										}
										else if (movies.movie2 == '') {
										//Add omdbResponse to movies object
										movies.movie2 = omdbResponse;

										//Add review to movies object if there is a review
										if (response.data.review !== null) {
											movies.movie2.review = response.data.review.text;
											movies.movie2.reviewRating = response.data.review.rating;
										}

										//Add removal button
										var btnClose = $('<i>');
										btnClose.attr('class', 'fa fa-times removal-button');
										btnClose.attr('area-hidden', 'true');
										btnClose.attr('id', 'remove-movie2');
										btnClose.attr('title', 'Remove movie');
										$('#movie2').append(btnClose);

										//Add movie poster
										var poster = $('<img>')
										if (omdbResponse.Poster == 'N/A') {
											poster.attr('src','images/no-poster.jpg');
										}
										else {
											poster.attr('src',omdbResponse.Poster);
										}
										poster.attr('class','movie-poster');
										poster.attr('id','movie2-poster');
										$('#movie2').append(poster);

										//Add movie title
										$('#movie2').append('<h2>' + movies.movie2.Title + '</h2>');

										//Add table for the movie info
										var table = $('<table>');
										table.attr('class','u-full-width');
										table.attr('id','movie2-table');
										$('#movie2').append(table);

										//Add movie info to table
										if (movies.movie2.Year !== 'N/A') {
											$('table#movie2-table').append('<tr><td>Year</td><td>' + movies.movie2.Year + '</td></tr>');
										}
										if (movies.movie2.Rated !== 'N/A') {
											$('table#movie2-table').append('<tr><td>Rating</td><td>' + movies.movie2.Rated + '</td></tr>');
										}
										if (movies.movie2.Actors !== 'N/A') {
											$('table#movie2-table').append('<tr><td>Actors</td><td>' + movies.movie2.Actors + '</td></tr>');
										}
										if (movies.movie2.Genre !== 'N/A') {
											$('table#movie2-table').append('<tr><td>Genre</td><td>' + movies.movie2.Genre + '</td></tr>');
										}
										if (movies.movie2.Metascore !== 'N/A') {
											$('table#movie2-table').append('<tr><td>Metascore</td><td>' + movies.movie2.Metascore + '</td></tr>');
										}
										if (movies.movie2.imdbRating !== 'N/A') {
											$('table#movie2-table').append('<tr><td>IMDb Rating</td><td>' + movies.movie2.imdbRating + '</td></tr>');
										}
										if (movies.movie2.Plot !== 'N/A') {
											$('table#movie2-table').append('<tr><td>Plot</td><td>' + movies.movie2.Plot + '</td></tr>');
										}
										if (movies.movie2.review !== undefined) {
											$('table#movie2-table').append('<tr><td>Review</td><td>"' + movies.movie2.review + '" —<em>' + movies.movie2.reviewRating + '</em></td></tr>');
										}

										//Fade in movie2 div
										$('#movie2').fadeIn();
									}

									//Scroll to search input after movie info is added to page
									$('body').animate({
										scrollTop: $("#search").offset().top - 20
									}, 400);

									//Check to see if there are two movies selected
									if (movies.movie1 !== '' && movies.movie2 !== '') {

																				//Calculate scores for both movies
										if (movies.movie1.Metascore !== 'N/A' && movies.movie2.Metascore !== 'N/A' ) {
											meta1 = movies.movie1.Metascore * .1;
											meta2 = movies.movie2.Metascore * .1;
										}
										else {
											meta1 = 0;
											meta2 = 0;
										}

										if (movies.movie1.imdbRating !== 'N/A' && movies.movie2.imdbRating !== 'N/A') {
											rating1 = parseInt(movies.movie1.imdbRating);
											rating2 = parseInt(movies.movie2.imdbRating);
										}
										else {
											rating1 = 0;
											rating2 =0;
										}

										if (movies.movie1.imdbVotes !== 'N/A' && movies.movie1.imdbVotes !== 'N/A') {
											votes1 = parseInt(movies.movie1.imdbVotes) * .01;
											votes2 = parseInt(movies.movie2.imdbVotes) * .01;
										}
										else {
											votes1 = 0;
											votes2 = 0;
										}

										if (movies.movie1.Runtime !== 'N/A' && movies.movie2.Runtime !== 'N/A') {
											runtime1 = movies.movie1.Runtime.replace(' min','') * .1;
											runtime2 = movies.movie2.Runtime.replace(' min','') * .1;
										}
										else {
											runtime1 = 0;
											runtime2 = 0;
										}

										score1 = (((meta1 + rating1) * 2) + votes1 + runtime1).toFixed(1);
										console.log('Score 1: ' + score1);
										
										score2 = (((meta2 + rating2) * 2) + votes2 + runtime2).toFixed(1);
										console.log('Score 2: ' + score2);

										//display calculated score and algorithm description

										if (score1 > score2) {
											console.log('Movie 1 wins');
											$('#scoreResult').append('<p>Based on the score ' + score1 + ', we recommend <strong>' + movies.movie1.Title + '</strong>.</p>');
											$('#movie1').attr('class','winner');

										}
										else if (score2 > score1) {
											console.log('Movie 2 wins');
											$('#scoreResult').append('<p>Based on the score ' + score2 + ', we recommend <strong>' + movies.movie2.Title + '</strong>.</p>');
											$('#movie2').attr('class','winner');
										}
										else {
											console.log('Tie!');
											$('#scoreResult').append('<p>Based on the scores, the movies are tied. Watch whichever one you want!</p>');
										}
									}
								}
								else {
									console.log('Response failed!');

									failedResponse = true;
									$('#modal-bg').fadeIn();
									$('#modal-message').html('No movie found! Try again.');
								}
							}
						});
					}
				});
			}
		}
	}
	else {
		$('#modal-bg').fadeIn();
		$('#modal-message').html('Please remove one of the movies before making another search.');
	}
}

//On window load, when the search form is submitted
window.onload = function() {
	$('#search').on('submit', function(event) {
		event.preventDefault();

		movieSearch();
	});
}

//Show 'loading' message when Ajax call is being run
$( document ).ajaxStart(function() {
	//Set the modal-overlay div to `display: flex` to show the modal
	$('#modal-bg').fadeIn();
	$('#modal-message').html('<i class="fa fa-spinner fa-spin" aria-hidden="true"></i> Loading...');

	//Hide the close modal button on 'Loading' messages
	$('#modal-close').hide();

	//Variable to use if modal is loading screen and shouldn't be closed when background is clicked
	loadingScreen = true;
});

//Hide 'loading' message when Ajax call is finished running
$( document ).ajaxStop(function() {
	//If message is not a failed response ('movie not found'), immediately close the modal message
	if (failedResponse == false) {
		$('#modal-bg').fadeOut();
	}

	//Display the close modal button once 'Loading' messages are finished
	$('#modal-close').show();

	//Variable to use if modal is loading screen and shouldn't be closed when background is clicked
	loadingScreen = false;
});

//On-click function to remove movie 1
$(document).on('click', '#remove-movie1', function() {
	$('#movie1').fadeOut();
	setTimeout(function () {
		$('#movie1').empty();
	},450);
	movies.movie1 = '';
	$('#scoreResult').empty();

	$('#movie1').removeClass('winner');
	$('#movie2').removeClass('winner');
});

//On-click function to remove movie 2
$(document).on('click', '#remove-movie2', function() {
	$('#movie2').fadeOut();
	setTimeout(function() {
		$('#movie2').empty();
	},450);
	movies.movie2 = '';
	$('#scoreResult').empty();
	
	$('#movie1').removeClass('winner');
	$('#movie2').removeClass('winner');
});

//Close modal when the 'close' button is clicked
$(document).on('click', '#remove-modal', function() {
	$('#modal-bg').fadeOut();
})

//Close modal when the background (area outside the modal) is clicked
$(document).on('click', '#modal-overlay', function() {
	//If modal isn't a loading screen
	if (loadingScreen == false) {
		$('#modal-bg').fadeOut();
	}
})