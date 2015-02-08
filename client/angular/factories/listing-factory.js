birthdayApp.factory('ListingFactory', function($http) {
	var listings = {};
	var factory = {};

	factory.allListings = function (callback) {
		$http.get('listings.json').success(function (data) {
			listings = data;
			callback(listings);
		})
	}

	factory.addListing = function (info, callback) {
		$http.post('/listings/create', info).success(function (data) {
			listings.push(data);
			var message = { success: 'Listing has ben added!' };
			callback(message);
		})
	}

	factory.likeListing = function(status, listing, user, callback) {
		var info = { _craigslist_id: listing._craigslist_id, _fb_id: user._fb_id, like_status: status };
		$http.post('/listings/like', info).success(function (data) {
			listing.like_status = status;
			callback(listing);
		})
	}
	
	return factory;
})