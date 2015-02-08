// Load the SDK asynchronously
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "http://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

window.fbAsyncInit = function() {
    FB.init({
        appId      : '733498350075613',
        status     : true,  // check login status
        cookie     : true,  // enable cookies to allow the server to access the session
        xfbml      : true,  // parse social plugins on this page
        version    : 'v2.1' // use version 2.1
    });

    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });
};

// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback (response) {
    console.log('statusChangeCallback');
    if (response.status === 'connected') {
        // Logged into your app and Facebook.
        testAPI();
    } else if (response.status === 'not_authorized') {
        // The person is logged into Facebook, but not your app.
        window.location = '#/';
        document.getElementById('status').innerHTML = 'Please log into this app.';
    } else {
        // The person is not logged into Facebook, so we're not sure if
        // they are logged into this app or not.
        window.location = '#/';
        document.getElementById('status').innerHTML = 'Please log into Facebook.';
  }
}

// Here we run a very simple test of the Graph API after login is
// successful.  See statusChangeCallback() for when this call is made.
function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function (response) {
        // console.log(response);
        console.log('Successful login for: ' + response.name);
        document.getElementById('status').innerHTML =
          '<h1>Thanks for logging in, ' + response.name + '!</h1>';
    });
}

function userData() {
    FB.api('/me', function (response) {
        return response;
    });
}

function userPhoto() {
    FB.api('/me/picture?height=200&type=normal&width=200', function (response) {
        return response;
    });
}

function userFeed() {
    FB.api('/me?fields=id,name,feed,inbox', function (response) {
        return response;
    });
}