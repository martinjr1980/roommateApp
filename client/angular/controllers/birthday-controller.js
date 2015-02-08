birthdayApp.controller('BirthdayController', function ($scope, $location, UserFactory, ListingFactory) {
	// UserFactory.getUsers(function (output) {
	// 	$scope.users = output;
	// })

	if (JSON.parse(localStorage.session).loggedIn === true) {
		$scope.current_user = JSON.parse(localStorage.session).user;
	}
		
	$scope.login = function() {
		var data ={};
		FB.login(function (response){
			statusChangeCallback(response);
			FB.api('/me', function (response) {
			    data._fb_id = response.id;
			    data.first_name = response.first_name;
			    data.last_name = response.last_name;
			    data.birthday = response.birthday;
			    FB.api('/me/picture?height=200&type=normal&width=200', function (response) {
			        data.url = response.data.url;
			        UserFactory.login(data, function (output) {
			        	if (output.user) {
			        		localStorage.session = JSON.stringify(output);
			        		$location.path('/welcome');
			        	}
			        	else {
			        		$scope.error = output.error;
			        	}
			        });
			    });
			});

		}, { scope: 'user_photos, user_birthday, read_stream, read_mailbox', return_scopes: true });
	}

	$scope.logout = function() {
		FB.logout(function (response){
			statusChangeCallback(response);
			UserFactory.logout(function() {
				localStorage.session = JSON.stringify({});
				$location.path('/');
			})
		});

	}

	$scope.getFeed = function() {
		FB.api('/me?fields=inbox', function (response) {
			console.log(response);
		    var inbox = response.inbox.data;
		    for (var i=0; i<inbox.length; i++) {
		    	var comments = inbox[i].comments.data;
		    	for (var j=0; j<7; j++) {
		    		if (comments[j].from.id === $scope.current_user._fb_id) {
		    			console.log(comments[j].message);
		    		}
		    	}
		    }
		});
	}

	$scope.allListings = function() {
		ListingFactory.allListings(function (output) {
			$scope.listings = output;
		})
	}

	$scope.addListing = function() {
		ListingFactory.addListing($scope.new_listing, function (output) {
			$scope.new_listing = {};
			$scope.message = output;
		})
	}

	$scope.like = function (status) {
		ListingFactory.likeListing(status, $scope.current_listing, $scope.current_user, function (output) {
			localStorage.current_listing = JSON.stringify(output);
			var session = {};
			session.user = $scope.current_user;
			session.loggedIn = true;
			if (status === true) {
				session.user.like_listings.push($scope.current_listing._craigstlist_id);
			}
			else {
				for (var i=0; i<session.user.like_listings.length; i++) {
					if (session.user.like_listings[i] === $scope.current_listing._craigslist_id) {
						session.user.like_listings[i] = session.user.like_listings[session.user.like_listings.length-1];
						session.user.like_listings.pop();
						i--;
					}
				}
			}
			localStorage.session = JSON.stringify(session);
		})
	}


})