"use strict"
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

function displayCountries()
{
    let countryData = ["Afghanistan","Albania","Algeria","American Samoa","Angola","Anguilla","Antarctica","Antigua and Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia and Herzegovina","Botswana","Brazil","British Indian Ocean Territory","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burma","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Central African Republic","Chad","Chile","China","Christmas Island","Cocos (Keeling) Islands","Colombia","Comoros","Congo (Brazzaville)","Congo (Kinshasa)","Cook Islands","Costa Rica","Cote d'Ivoire","Croatia","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","East Timor","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Guiana","French Polynesia","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guadeloupe","Guam","Guatemala","Guernsey","Guinea","Guinea-Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Johnston Atoll","Jordan","Kazakhstan","Kenya","Kiribati","Korea","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Martinique","Mauritania","Mauritius","Mayotte","Mexico","Micronesia","Midway Islands","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauru","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Niue","Norfolk Island","North Korea","Northern Mariana Islands","Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Helena","Saint Kitts and Nevis","Saint Lucia","Saint Pierre and Miquelon","Saint Vincent and the Grenadines","Samoa","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Georgia and the Islands","South Korea","South Sudan","Spain","Sri Lanka","Sudan","Suriname","Svalbard","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Togo","Tonga","Trinidad and Tobago","Tunisia","Turkey","Turkmenistan","Turks and Caicos Islands","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","Uruguay","Uzbekistan","Vanuatu","Venezuela","Vietnam","Virgin Islands","Wake Island","Wallis and Futuna","West Bank","Western Sahara","Yemen","Zambia","Zimbabwe"];
    let countryRef = document.getElementById("countriesList");
    // printing into dropdown list 
    let output = `<option selected disabled> Select a country </option>`
    for (let i = 0; i < countryData.length; i++)
    {
        output += `<option value="${countryData[i]}">${countryData[i]}</option>`
    }

    countryRef.innerHTML = output;
}

function getAirportData()
{
    let countryRef = document.getElementById("countriesList")
    selectedCountry = countryRef.value
    let url = "https://eng1003.monash/OpenFlights/airports/"
    let airportData = {
        country: selectedCountry,
        callback: "displayAirports"
    }
    webServiceRequest(url, airportData)
}

function getRouteData()
{
    let countryRef = document.getElementById("countriesList")
    selectedCountry = countryRef.value
    let url = "https://eng1003.monash/OpenFlights/allroutes/"
    let routeData = {
        country: selectedCountry,
        callback: "displayRoutes"
    }
    webServiceRequest(url, routeData)
}

function displayAirports(returnedData)
{
    countryAirports = returnedData
    markersOrRoutes.clearMarkers()

    let airportsArray = []; // Clear out previous data
    for (let i = 0; i < countryAirports.length; i++)
    {
        let airportObject = {};

        airportObject = {
            airportId: countryAirports[i].airportId,
            name: countryAirports[i].name,
            city: countryAirports[i].city,
            coordinates: [countryAirports[i].longitude, countryAirports[i].latitude]
        };

        airportsArray.push(airportObject);
        let location = airportsArray[i].coordinates;
        map.panTo(location, {zoom: 5});

        let marker = new mapboxgl.Marker({"color": "#DD4B3E"}); 
        marker.setLngLat(location);
        marker.addTo(map);

        let popup = new mapboxgl.Popup({ offset: 40});  
        let description = ""; // initialising output for the popup
        description += `Airport: ${airportObject.name}</br>City: ${airportObject.city}</br>`
        popup.setHTML(description);
        marker.setPopup(popup);
        markersOrRoutes.addMarker(marker)
        popup.addTo(map);
	
    }
}

function displayRoutes(returnedData)
{
    allRoutes = returnedData
    markersOrRoutes.clearRoutes()
    let domesticRoutes = []

    for (let i = 0; i < allRoutes.length; i++)
    {
        for (let j = 0; j < countryAirports.length; j++)
        {
            if (allRoutes[i].destinationAirportId == countryAirports[j].airportId)
            {
                domesticRoutes.push(allRoutes[i])
                break
            }
        }
    }

    for (let i = 0; i < domesticRoutes.length; i++)
    {        
        let source = []
        let dest = []

        let sourceAirportId = domesticRoutes[i].sourceAirportId
        let destAirportId = domesticRoutes[i].destinationAirportId
        
        for (let j = 0; j < countryAirports.length; j++)
        {
            if (sourceAirportId == countryAirports[j].airportId)
            {
                source.push(countryAirports[j].longitude)
                source.push(countryAirports[j].latitude)
                continue
            }

            else if (destAirportId == countryAirports[j].airportId)
            {
                dest.push(countryAirports[j].longitude)
                dest.push(countryAirports[j].latitude)
                continue
            }
        }

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

        routeObject.data.geometry.coordinates.push(source)
        routeObject.data.geometry.coordinates.push(dest)
        markersOrRoutes.addRoutes(routeObject)

        let routeId = "route" + String(i)
        map.addLayer({
            id: routeId,
            type: "line",
            source: routeObject,
            layout: { "line-join": "round", "line-cap": "round" },
            paint: { "line-color": "#888", "line-width": 4 }
            });
    }
}

function mainView()
{
    getAirportData()
    getRouteData()
    displayAirports()
    displayRoutes()
}

// Global instances & on load
let markersOrRoutes = new MarkersOrRoutes()
let selectedCountry = ""
let countryAirports = []
let allRoutes = []
displayCountries()

// Map to be displayed
mapboxgl.accessToken = "pk.eyJ1IjoiendlaWlpaTEyMTEiLCJhIjoiY2tmeTJ6ODVnMDA4NDJ2bXJtY3o2aTJ0ZSJ9.RrEppWcrOhUyJeOV-pHS0w";
let map = new mapboxgl.Map({
    container: 'map',
    zoom: 1,
    style: 'mapbox://styles/mapbox/streets-v9'
});