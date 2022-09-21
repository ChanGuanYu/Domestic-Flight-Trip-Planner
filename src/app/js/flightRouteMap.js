"use strict"

let numberOfStops = 0
let tripMarkersOrRoutes = new MarkersOrRoutes()
let routesList = []

function webServiceRequest(url,data) // Code provided in project information for the retrieval of data
{
    // Build URL parameters from data object.
    let params = "";
    // For-in loop (For each key in data object...)
    for (let key in data)
    {
        if (data.hasOwnProperty(key))
        {
            if (params.length == 0)
            {
                // First parameter starts with '?'
                params += "?";
            }
            else
            {
                // Subsequent parameter separated by '&'
                params += "&";
            }

            let encodedKey = encodeURIComponent(key);
            let encodedValue = encodeURIComponent(data[key]);

            params += encodedKey + "=" + encodedValue;
         }
    }
    let script = document.createElement("script");
    script.src = url + params;
    document.body.appendChild(script);
}

// Written codes start here
let country = getDataLocalStorage(COUNTRY_DATE_KEY)[0];// retrieval of country selected in the home page
function countryDisp()
{
    let chosenCountry = country
    let disp = document.getElementById("countrySelected");
    disp.innerHTML = `<h1>Routes in: ${chosenCountry}</h1>`;//display of country selected
}

function getData()
{
    // the value of the selected country
    let chosenCountry = country
    let url1 = "https://eng1003.monash/OpenFlights/airports/";

    let airportList = {
        country: chosenCountry,
        callback: "airportsList"
    }
    webServiceRequest(url1,airportList);//calling the API to retrieve list of airports in the selected country
}

mapboxgl.accessToken = "pk.eyJ1IjoiY3lhcDAwMTciLCJhIjoiY2tmeTNwbnhjMHM5MDJ4bm9xcXZqbnBwcyJ9.bwnL2tmAHevYP0ZDzTP52g";//map display
let map = new  mapboxgl.Map({
    container: 'map',
    zoom: 3.6,
    style: 'mapbox://styles/mapbox/streets-v9'
});

function setLocalStorage(key,data) //setting local storage function
{
    let data1 = JSON.stringify(data);
    localStorage.setItem(key, data1);
}

function getDataLocalStorage(key) //getting local storage function
{
    let oldData = localStorage.getItem(key);
    return JSON.parse(oldData);
}

function airportsList(airportList)
{
    var airportsArray = []; // Clear out previous data
    for (let i = 0; i < airportList.length; i++)
    {
        let airportObject = {};
        airportObject = {
            airportId: airportList[i].airportId,
            name: airportList[i].name,
            city: airportList[i].city,
            coordinates: [airportList[i].longitude, airportList[i].latitude]
        };        

        airportsArray.push(airportObject);
    }
    setLocalStorage(AIRPORTS_KEY,airportsArray); // storing list of airports

    let listOfAirports = getDataLocalStorage(AIRPORTS_KEY); //getting the previously stored list of airport objects
    let location = listOfAirports[0].coordinates; //pans to the country
    map.panTo(location);//pans to the country selected

    let output =`<option selected disabled> Select a starting airport </option>`;
    for (let i = 0; i < listOfAirports.length; i++)
    {
        output += `<option value="${listOfAirports[i].airportId}">${listOfAirports[i].name}</option>` //printing list of airports into dropdown list
    }
    output += `<button onClick="start()" class="mdl-button mdl-js-button mdl-button--raised ">Start route selection</button>`;
    let airRef = document.getElementById("startingAirport");
    airRef.innerHTML += output; //pushing dropdownlist into html
}

// function startAirport()
// {
//     let airportsArray = getDataLocalStorage(AIRPORTS_KEY);
//     let location = airportsArray[0].coordinates;
//     map.panTo(location);//pans to the country selected

//     let output =`<option selected disabled> Select a starting airport </option>`;
//     for (let i = 0; i < airportsArray.length; i++)
//     {
//         output += `<option value="${airportsArray[i].airportId}">${airportsArray[i].name}</option>`
//     }
//     output += `<button onClick="start()" class="mdl-button mdl-js-button mdl-button--raised ">Start route selection</button>`;
//     let airRef = document.getElementById("startingAirport");
//     airRef.innerHTML += output;
// }


 //Empty array to store the array of stops in the trip
function start()
{
    routesList = []
    numberOfStops = 0
    tripMarkersOrRoutes.clearMarkers() //removing all markers on map
    tripMarkersOrRoutes.clearRoutes() //removing all routes on map
    // let tripRoute = [];
    let airportsArray = getDataLocalStorage(AIRPORTS_KEY); //retrieving airport list
    let startRef = document.getElementById("startingAirport").value; // retrieving user's selected starting point
    let startRefText = "";
    for (let i = 0; i < airportsArray.length; i++)
    {
        if (airportsArray[i].airportId == startRef) 
        {
            startRefText += airportsArray[i].name;
            let location1 = airportsArray[i].coordinates;
            map.panTo(location1);
            let marker = new mapboxgl.Marker({ "color": "#DD4B3E" }); //creating new marker
            marker.setLngLat(location1);
            marker.addTo(map);

            let popup = new mapboxgl.Popup({ offset: 40});  
            let description = ""; // initialising output for the popup
            description += `Airport: ${airportsArray[i].name}</br>City: ${airportsArray[i].city}</br>` 
            popup.setHTML(description);
            marker.setPopup(popup)
            popup.addTo(map);
            routesList.push(airportsArray[i])
            tripMarkersOrRoutes.addMarker(marker)
            setLocalStorage(PREVIOUS_AIRPORT_KEY, airportsArray[i])
        }
    }
    let routeDisp = document.getElementById("selectedRoute"); 
    routeDisp.innerHTML = `<th>Trip Route </th>` + `<tr><td>${startRefText}</td></tr>`;
    let destinationPoints = getData2(); //calling the function to retrieve the destination airports available using API
    return destinationPoints;
}

function getData2() //function specifically to call the destinations available from the first airport
{
    // the value of the selected airport
    let sourceAirportId = document.getElementById("startingAirport").value; //first airport value
    let url2 = "https://eng1003.monash/OpenFlights/routes/";

    let destinationPoints = {
        sourceAirport: sourceAirportId,
        callback: "destinationList",
    }
    webServiceRequest(url2, destinationPoints);
}

function destinationList(destinationPoints) //function to organise and store the data retrieved 
{
    var routesArray = []; // Clear out previous data
    for (let i = 0; i < destinationPoints.length; i++)//taking the needed data from the API
    {
        let airportsArray = getDataLocalStorage(AIRPORTS_KEY); 
        let sourceAirportId = destinationPoints[i].sourceAirportId;
        let destinationAirportId = destinationPoints[i].destinationAirportId;
        let codeshare = destinationPoints[i].codeshare;
        let airline = destinationPoints[i].airline;

        for (let j = 0; j < airportsArray.length; j++) // loop to match details of destinationAirports
        {
            for (let k = 0; k < airportsArray.length; k++) //loop to match details of sourceAirport
            {
                if (sourceAirportId == airportsArray[k].airportId && destinationAirportId == airportsArray[j].airportId && codeshare !== "Y")
                {
                    let routeObject = {};
                    
                    routeObject = {
                        sourceAirportId: sourceAirportId,
                        sourceName: airportsArray[k].name, 
                        sourceCity: airportsArray[k].city,
                        sourceCoords: airportsArray[k].coordinates,
                        destinationAirportId: destinationAirportId,
                        destinationName: airportsArray[j].name,
                        destinationCity: airportsArray[j].city,
                        destinationCoords: airportsArray[j].coordinates,
                        airline: airline                       
                    }

                    routesArray.push(routeObject);
                }
            }
        }
    }

    let listRef = document.getElementById("nextAirport");

    let out = `<option selected disabled> Please select your next stop </option>`;
    for (let l = 0; l < routesArray.length; l++)
    {
        out += `<option value="${routesArray[l].destinationAirportId}">${routesArray[l].destinationName} (Airline:${routesArray[l].airline}) </option>`
    }//prints out all the available destination airports
    listRef.innerHTML = out;
    setLocalStorage(ROUTES_KEY,routesArray);
}

function getData3()
{
    // the value of the selected airport
    let sourceAirportId = document.getElementById("nextAirport").value; //value of the stop airport selected
    let url2 = "https://eng1003.monash/OpenFlights/routes/";

    let destinationPoints = {
        sourceAirport: sourceAirportId,
        callback: "destinationList",
    }
    webServiceRequest(url2, destinationPoints);
}

function addStops() //adds stops to the trip route
{
    let airportsArray = getDataLocalStorage(AIRPORTS_KEY);
    let stopsRef = document.getElementById("nextAirport").value;    
    let stopsRefText = "";
    if (stopsRef != "Please select your next stop") 
    {
        for (let i = 0; i < airportsArray.length; i++)
        {
            if (airportsArray[i].airportId == stopsRef) 
            {
                stopsRefText += airportsArray[i].name; 
                let location1 = airportsArray[i].coordinates;
                map.panTo(location1); //pans slightly to the popup when it appears
                let marker = new mapboxgl.Marker({ "color": "#DD4B3E" }); //popup colour
                marker.setLngLat(location1);
                marker.addTo(map); //adding popup to map

                let popup = new mapboxgl.Popup({ offset: 40});  
                let description = ""; // initialising output for the popup
                description += `Airport: ${airportsArray[i].name}</br>City: ${airportsArray[i].city}</br>`

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
                    
                let source = getDataLocalStorage(PREVIOUS_AIRPORT_KEY).coordinates
                let dest = airportsArray[i].coordinates    

                routeObject.data.geometry.coordinates.push(source) //source coordinates added for polyline start
                routeObject.data.geometry.coordinates.push(dest) // destination coordinates added for polyline end
        
                let routeId = "route" + String(numberOfStops)
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

                routesList.push(airportsArray[i])
                tripMarkersOrRoutes.addRoutes(routeObject) //polyline added
                tripMarkersOrRoutes.addMarker(marker) //marker added
                setLocalStorage(PREVIOUS_AIRPORT_KEY, airportsArray[i]) 
                numberOfStops++; 
            }
        }
        let routeDisp = document.getElementById("selectedRoute"); 
        routeDisp.innerHTML += `<tr><td>${stopsRefText}</td></tr>`;
        let destinationPoints = getData3();
        return destinationPoints
    }
}

function finishR() //registered user page redirection
{
    setLocalStorage(TRIP_ROUTES_KEY, routesList)
    window.location = "tripSummaryPopUpR.html"
}

function finishU() //unregistered user page redirection
{
    setLocalStorage(TRIP_ROUTES_KEY, routesList) 
    window.location = "tripSummaryPopUpU.html"
}

function initialize()
{
    countryDisp();
    getData();
    airportsList();
}
// Works till here
