"use strict"

//checks if the array is empty
function checkIfArrayEmpty(tripArray)
{
    if (tripArray.length > 0)
    {
        window.location = "tripHistoryList.html";
        
        let tripDisplay = '';
        let user = getDataLocalStorage(USER_DATA_KEY);
        let tripData = user.pastTrips;

        for (let i=0; tripData.length> i; i++) //generate brief information about past trip
        {
            let trip = tripData[i];

            tripDisplay += `<tr> <td class="mdl-data-table__cell--non-numeric"> <h4>${trip.name}</h4>`
            + `<p>${trip.country}<br>${trip.date}</p> </td> <td>`
            + `<button class="width-button-view button-trip-details" type="submit" onclick="view(${i})">View trip details</button> </td> </tr>`
        }
        document.getElementsById("displaypastTrips").innerhtml = tripDisplay;
    }
    else
    {
        window.location="tripHistoryList-empty.html";
    }
}

//function to view trip details
function view(index)
{
    updateIndexLocalStorage(index);
    window.location = "TripHistoryDetailsPage.html";
}