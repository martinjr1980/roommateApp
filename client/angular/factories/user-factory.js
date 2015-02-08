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
		$http.post('/users/show', info).success(function (data) {
			session = data;
			if (session.user) {
				session.loggedIn = true;
			}
			callback(session);
		})
	}

	factory.logout = function(callback) {
		session = {};
		callback();
	}
 
	factory.addUser = function (info) {
		$http.post('/users/create', info).success(function (data) {
			users.push(data);
		})
	}
	
	return factory;
})