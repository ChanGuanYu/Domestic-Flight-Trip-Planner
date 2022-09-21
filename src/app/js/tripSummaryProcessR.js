"use strict"

let dialog = document.querySelector('#confirmation-modal');
let showDialogButton = document.querySelector('#show-dialog');

// for browser compatibility
if (! dialog.showModal) {
	dialogPolyfill.registerDialog(dialog);
}
// waiting for user to click button to open modal
showDialogButton.addEventListener('click', function() {
	dialog.showModal();
});

// closing the modal
dialog.querySelector('.close').addEventListener('click', function() {
	dialog.close();
});

function homePage()
{
	emptyLocalStorage(AIRPORTS_KEY)
	emptyLocalStorage(PREVIOUS_AIRPORT_KEY)
	emptyLocalStorage(ROUTES_KEY)
	emptyLocalStorage(TRIP_ROUTES_KEY)
	window.location = "index.html"
}

//generating trip summary for each planned trip
function tripSummary()
{
	let tripDisplay = '';
	// let tripData = user.route //ok for sure i know this is wrong soz
	let countryAndDate = getDataLocalStorage(COUNTRY_DATE_KEY)
	let country = countryAndDate[0]
	let date = countryAndDate[1]
	let tripRoutes = getDataLocalStorage(TRIP_ROUTES_KEY)
	let startAirport = tripRoutes[0].name
	let endAirport = tripRoutes[tripRoutes.length - 1].name
	let numberOfStops = tripRoutes.length - 2

	tripDisplay += `<table class="mdl-cell mdl-cell--6-col text-center table-border"> <tbody>`
	+ `<tr> <th class="summary-table">Country</th> <td class="summary-table">${country}</td> </tr>`
	+ `<tr> <th class="summary-table">Date of trip</th> <td class="summary-table">${date}</td> </tr>`
	+ `<tr> <th class="summary-table">Flight route(s)</th> <td class="summary-table">${startAirport}<br/>to<br/>${endAirport}</td> </tr>`
	+ `<tr> <th class="summary-table">Number of stops</th> <td class="summary-table">${numberOfStops}</td> </tr>`
	+ `</tbody> </table>`

	document.getElementById("tripSummary").innerHTML = tripDisplay;
}

//confirming trip
function confirmTrip()
{	
	let countryAndDate = getDataLocalStorage(COUNTRY_DATE_KEY)
	let country = countryAndDate[0]
	let date = countryAndDate[1]
	let name = "Trip (" + date + ")"
	let trip = new Trip(country, name, date)
	let tripRoutes = getDataLocalStorage(TRIP_ROUTES_KEY)
	trip.route = tripRoutes
	trip.startAirport = tripRoutes[0].name
	trip.endAirport = tripRoutes[tripRoutes.length - 1].name
	trip.allStops = tripRoutes.slice(1, tripRoutes.length-1)
    let userData = getDataLocalStorage(USER_DATA_KEY)
    let user = new User()
	user.fromData(userData)
	user.addToScheduledTrips(trip)
	updateUserLocalStorage(user)
	updateNewTripLocalStorage(trip)
	app.updateUser(user)
	updateLocalStorage(app)
	window.location = "ScheduledTripsDetails.html"
}