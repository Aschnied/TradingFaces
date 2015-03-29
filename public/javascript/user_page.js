$(document).ready(function (argument) {
	getUser();	
});

function getUser (event) {

	var userPageInfo = {};

	var ajaxUser = $.ajax({
		url: '/users/show',
	});

	ajaxUser.done(function (userData) {
		var ajaxRounds = $.ajax({
			url: '/users/' + userData.id + '/rounds',
		});

		userPageInfo.user = userData;

		ajaxRounds.done(function (roundsData) {
			userPageInfo.rounds = roundsData;
			console.log(userPageInfo)
		});

	});
}
