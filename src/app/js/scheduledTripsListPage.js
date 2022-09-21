"use strict"

//checks if the array is empty
function checkIfArrayEmpty()
{
    let userData = getDataLocalStorage(USER_DATA_KEY);
    let user = new User();
    user.fromData(userData);

    let tripArray = user.scheduledTrips
    let tripDisplay = '';

    for (let i = 0; i < tripArray.length; i++) //generate brief information about each scheduled trip
    {
        let trip = new Trip()
        trip.fromData(tripArray[i])
        tripDisplay += `<tr> <td class="mdl-data-table__cell--non-numeric"> <h4>${trip.name}</h4>`
        + `<p>${trip.country}<br>${trip.date}</p> </td> <td>`
        + `<button class="mdl-button mdl-js-button mdl-button--raised mdl-card--border" onclick="view(${trip})">View trip details</button>`
    }
    let display = document.getElementById("displayFutureTrips")
    display.innerHTML = tripDisplay

    if (tripArray.length == 0)
    {
        window.location = "ScheduledTripsList-empty.html";
    }
    else
    {
        window.location = "ScheduledTripsList.html";
    }
}

//funtion to view details
function view(trip)
{
    updateNewTripLocalStorage(trip)
    window.location = "ScheduledTripsDetails.html";
}