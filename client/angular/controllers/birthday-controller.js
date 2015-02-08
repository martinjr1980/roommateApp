birthdayApp.controller('BirthdayController', function ($scope, $location, UserFactory) {
	UserFactory.getUsers(function (output) {
		$scope.users = output;
	})

	if (JSON.parse(localStorage.session).loggedIn === true) {
		$scope.current_user = JSON.parse(localStorage.session).user;
	}
		
	$scope.login = function() {
		UserFactory.login($scope.current_user, function (output) {
			if (output.user) {
				localStorage.session = JSON.stringify(output);
				$location.path('/home');
			}
			else {
				$scope.error = output.error;
			}
		});
	}

	$scope.logout = function() {
		UserFactory.logout(function() {
			localStorage.session = JSON.stringify({});
			$location.path('/');
		})
	}

	$scope.addUser = function() {
		UserFactory.addUser($scope.new_user);
	}
})