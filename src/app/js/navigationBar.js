"use strict"

//function to logout the user
function logout()
{
    let userData = getDataLocalStorage(USER_DATA_KEY)
    let user = new User()
    user.fromData(userData)
    user.loginStatus = false
    app.updateUser(user)
    updateLocalStorage(app)
    emptyLocalStorage(USER_DATA_KEY)
    alert("Logout has been done successfully")
    window.location = "index.html"; //redirects user to the homepage for guest users
}

//prompt for user to login before accessing scheduled trips
function checkFutureTripsLogin()
{
    alert("Unable to access scheduled trips. Please login to gain access");
}

//prompt for user to login before accessing trip history
function checkPastTripsLogin()
{
    alert("Unable to access trip history. Please login to gain access");
}

//function to display the username of the user in the navigation bar
function displayUsername()
{
    //generate username from html to js
    let usernameDisplay = '';
    let user = getDataLocalStorage(USER_DATA_KEY);
    let userToDisplay = new User();
    userToDisplay.fromData(user);
    let username = userToDisplay.name;
    usernameDisplay += '<a class="mdl-navigation__link" href="" style="cursor: default">' + username + '</a>';
    document.getElementById("username").innerHTML = usernameDisplay;
}
