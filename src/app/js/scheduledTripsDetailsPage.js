"use strict"

//function to generate information for each user's scheduled trip
function displayScheduledTripsDetails() 
{
    let tripDetailsDisplay = document.getElementById("displayFutureTripsDetail")
    let user = getDataLocalStorage(USER_DATA_KEY);
    let userToDisplay = new User();
    userToDisplay.fromData(user);
    let tripData = getDataLocalStorage(NEW_TRIP_KEY)
    let trip = new Trip();
    trip.fromData(tripData)

    let stopsName = ""
    for (let i = 0; i < trip.route.length; i++)
    {
        if (i != trip.route.length - 1)
        {
            stopsName += trip.route[i].name + " -> "
        }
        else
        {
            stopsName += trip.route[i].name
        }
    }

    tripDetailsDisplay.innerHTML += `<div class="text-center">
    <h1 id="header">${trip.name}</h1>
</div>
<div class="mdl-grid">
    <div class="mdl-cell mdl-cell--12-col text-center">	
        <div>
            <br>
            <table class="stretch">
                <tbody>
                    <tr>
                        <td class="trip-detail">Trip Date: ${trip.date}</td>
                    </tr>
                    <tr>
                        <td class="trip-detail"></td>
                    </tr>
                    <tr>
                        <td class="trip-detail">Country: ${trip.country}</td>
                    </tr>
                    <tr>
                        <td class="trip-detail"></td>
                    </tr>
                    <tr>
                        <td class="trip-detail">Selected Route: ${stopsName}</td>
                    </tr>
                    <tr>
                        <td class="trip-detail"></td>
                    </tr>
                    <tr>
                        <td class="trip-detail">Number of stops: ${trip.allStops.length}</td>
                    </tr>
                    <tr>
                        <td class="trip-detail"></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>`

    map.panTo(trip.route[0].coordinates, {zoom: 5})
}

//function to display trip route on map
function displayTripRoute()
{
    let user = getDataLocalStorage(USER_DATA_KEY);
    let userToDisplay = new User();
    userToDisplay.fromData(user);
    let tripData = getDataLocalStorage(NEW_TRIP_KEY)
    let trip = new Trip();
    trip.fromData(tripData)

    map.panTo(trip.route[0].coordinates, {zoom: 5})
    for (let i = 0; i < trip.route.length; i++)
    {
        if (i != trip.route.length - 1)
        {
            let marker = new mapboxgl.Marker({ "color": "#DD4B3E" }); 
            marker.setLngLat(trip.route[i].coordinates);
            marker.addTo(map);

            let popup = new mapboxgl.Popup({ offset: 40});  
            let description = ""; // initialising output for the popup
            description += `Airport: ${trip.route[i].name}</br>City: ${trip.route[i].city}</br>`

            let routeObject = {                  
                type: "geojson",
                data: {
                    type: "Feature",
                    properties: {},
                    geometry: {
                        type: "LineString",
                        coordinates: []
                        }
                    }
                };
                
            let source = trip.route[i].coordinates
            let dest = trip.route[i + 1].coordinates   

            routeObject.data.geometry.coordinates.push(source)
            routeObject.data.geometry.coordinates.push(dest)

            let routeId = "route" + String(i)
            map.addLayer({
                id: routeId,
                type: "line",
                source: routeObject,
                layout: { "line-join": "round", "line-cap": "round" },
                paint: { "line-color": "#00BFFF", "line-width": 4 }
                });

            popup.setHTML(description);
            marker.setPopup(popup)
            popup.addTo(map);
        }
        else
        {
            let marker = new mapboxgl.Marker({ "color": "#DD4B3E" }); 
            marker.setLngLat(trip.route[i].coordinates);
            marker.addTo(map);

            let popup = new mapboxgl.Popup({ offset: 40});  
            let description = ""; // initialising output for the popup
            description += `Airport: ${trip.route[i].name}</br>City: ${trip.route[i].city}</br>`

            popup.setHTML(description);
            marker.setPopup(popup)
            popup.addTo(map);
        }
    }
}

//deleting scheduled trip function
function deleteScheduledTrip()
{
    if(confirm("Are you sure you want to delete this scheduled trip?"))
    {
        //runs if user clicks ok
        let userData = getDataLocalStorage(USER_DATA_KEY);
        let user = new User();
        user.fromData(userData);

        let tripData = getDataLocalStorage(NEW_TRIP_KEY);
        user.removeTrip(tripData.name);
        updateUserLocalStorage(user);
        
        app.updateUser(user)
        updateLocalStorage(app)

        alert("The scheduled trip has been deleted!");
        window.location = "indexR.html";
    }
}

// onload
let tripIndex = getDataLocalStorage(TRIP_INDEX_KEY);
// displayScheduledTripsDetails();