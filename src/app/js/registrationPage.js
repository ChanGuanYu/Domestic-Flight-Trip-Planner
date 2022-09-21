"use strict"

//function for user to register account
function registerUser()
{
    //get name, email and passwords
    let fullName = document.getElementById("fullName").value
    let email = document.getElementById("email").value
    let password = document.getElementById("password").value
    let passwordAgain = document.getElementById("passwordAgain").value

    if ((fullName == "") || (email == "") || (password == "") || (passwordAgain == ""))
    {
        alert("Please fill in the blanks!")
    }
    else
    {
        if (password != passwordAgain)
        {
            alert("Passwords do not match! Please try again.")
        }
        else
        {
            app.addUser(fullName, email, password)
            updateLocalStorage(app)
            window.location = "loginPage.html"
        }
    }
}

//function to register user at trip summary
function registerUserTripSummary()
{
    //get name, email and passwords
    let fullName = document.getElementById("fullName").value
    let email = document.getElementById("email").value
    let password = document.getElementById("password").value
    let passwordAgain = document.getElementById("passwordAgain").value

    if ((fullName == "") || (email == "") || (password == "") || (passwordAgain == ""))
    {
        alert("Please fill in the blanks!")
    }
    else
    {
        if (password != passwordAgain)
        {
            alert("Passwords do not match! Please try again.")
        }
        else
        {
            app.addUser(fullName, email, password)
            updateLocalStorage(app)
            window.location = "tripSummaryLogin.html"
        }
    }
}

//function to redirect user to homepage
function homePage()
{
    window.location = "indexR.html"
}
