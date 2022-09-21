"use strict"

//function for user to login
function login()
{
    //get email and password 
    let email = document.getElementById("email").value
    let password = document.getElementById("password").value

    if (app.ifUserExists(email) == true)
    {
        let user = app.getUser(email)
        if (user.password == password) //check if password matches
        {
            user.loginStatus = true
            updateUserLocalStorage(user)
            window.location = "indexR.html"
        }
        else
        {
            alert("Invalid password! Please try again.")
        }
    }
    else
    {
        alert("User does not exist! Please try again.")
    }
}

function loginTripSummary()
{
    //get email and password 
    let email = document.getElementById("email").value
    let password = document.getElementById("password").value

    if (app.ifUserExists(email) == true)
    {
        let user = app.getUser(email)
        if (user.password == password) //check if password matches
        {
            user.loginStatus = true
            updateUserLocalStorage(user)
            app.updateUser(user)
            updateLocalStorage(app)
            window.location = "tripSummaryPopUpR.html"
        }
        else
        {
            alert("Invalid password! Please try again.")
        }
    }
    else
    {
        alert("User does not exist! Please try again.")
    }
}

//function to redirect user to homepage
function homePage()
{
    window.location = "indexR.html"
}
