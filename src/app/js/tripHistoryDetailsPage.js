"use strict"

//function to generate past trip of each user
function displayPastTripsDetails()
{
    let tripDetailsDisplay = '';
    let user = getDataLocalStorage(USER_DATA_KEY);
    let userToDisplay = new User();
    userToDisplay.fromData(user);
    let tripData = user.pastTrips;

    // for (let i=0; tripData.length > 0; i++)
    // {
    //     let trip = tripData[i];    
        
        
    // }
    tripDetailsDisplay += `<div class="text-center">
    <h1 id="header">trip name goes here</h1>
</div>
<div class="mdl-grid">
    <div class="mdl-cell mdl-cell--4-col text-center">	
        <div>
            <br>
            <table class="stretch">
                <tbody>
                    <tr>
                        <td class="trip-detail">Trip Date: set trip date</td>
                    </tr>
                    <tr>
                        <td class="trip-detail"></td>
                    </tr>
                    <tr>
                        <td class="trip-detail">Country: set country</td>
                    </tr>
                    <tr>
                        <td class="trip-detail"></td>
                    </tr>
                    <tr>
                        <td class="trip-detail">Selected Route:</td>
                    </tr>
                    <tr>
                        <td class="trip-detail">set route chosen by user</td>
                    </tr>
                    <tr>
                        <td class="trip-detail"></td>
                    </tr>
                    <tr>
                        <td class="trip-detail">Number of stops (in sequence): set number of stops</td>
                    </tr>
                    <tr>
                        <td class="trip-detail"></td>
                    </tr>
                </tbody>
            </table>
        </div>	
    </div>
    <div class="mdl-cell mdl-cell--8-col">
        <div id="map"></div>
    </div>
</div>`

    document.getElementById("displayPastTripsDetail").innerHTML = tripDetailsDisplay;
}
