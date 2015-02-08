birthdayApp.factory('UserFactory', function($http) {
	var session = {};
	var users = [];
	var factory = {};
	factory.getUsers = function (callback) {
		$http.get('/users.json').success(function (data) {
			users = data;
			callback(users);
		})
	}

	factory.login = function (info, callback) {
		$http.post('/users/create', info).success(function (data) {
			session.user = data;
			session.loggedIn = true;
			callback(session);
		})
	}

	factory.logout = function(callback) {
		session = {};
		callback();
	}
	
	return factory;
})