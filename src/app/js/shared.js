"use strict"

// Keys for Local Storage
const APP_DATA_KEY = "appLocalData"
const USER_DATA_KEY = "userLocalData"
const TRIP_INDEX_KEY = "indexLocalData"
const COUNTRY_DATE_KEY = "countryDateLocalData"

const AIRPORTS_KEY = "airportList";
const ROUTES_KEY = "routes";
const PREVIOUS_AIRPORT_KEY = "previousAirport"
const TRIP_ROUTES_KEY = "tripRouteData"
const NEW_TRIP_KEY = "newTripData"

// App class
// Stores a list of users (basically their accounts)
class App
{
    constructor()
    {
        this._userlist = []
    }

    //methods (to add a user, get a user by name or email, check if the user exists)
    addUser(name, email, password)
    {
        let user = new User(name, email, password)
        this._userlist.push(user)
    }

    getUser(email)
    {
        let userlist = this._userlist
        for (let i = 0; i < userlist.length; i++)
        {
            if (userlist[i].email == email)
            {
                return userlist[i]
            }
        }
    }

    getUserByName(name)
    {
        let userlist = this._userlist
        for (let i = 0; i < userlist.length; i++)
        {
            if (userlist[i].name == name)
            {
                return userlist[i]
            }
        }
    }

    ifUserExists(email)
    {
        let userlist = this._userlist
        for (let i = 0; i < userlist.length; i++)
        {
            if (userlist[i].email == email)
            {
                return true
            }
        }
        return false
    }

    updateUser(user)
    {
        let userlist = this._userlist
        for (let i = 0; i < userlist.length; i++)
        {
            if (userlist[i].email == user.email)
            {
                userlist[i] = user
            }
        }
    }

    fromData(data) //storing data menthod
    {
        let userlist = data._userlist
        this._userlist = []
        for (let i = 0; i < userlist.length; i++)
        {
            let user = new User()
            user.fromData(userlist[i])
            this._userlist.push(user)
        }
    }

}


// User class
// A class containing information of a single user
class User
{
    constructor(name = "", email = "", password = "")
    {
        this._name = name
        this._email = email
        this._password = password
        this._scheduledTrips = []
        this._pastTrips = []
        this._login = false
    }

    // Getters
    get name()
    {
        return this._name
    }

    get email()
    {
        return this._email
    }

    get password()
    {
        return this._password
    }

    get scheduledTrips()
    {
        return this._scheduledTrips
    }

    get pastTrips()
    {
        return this._pastTrips
    }
    
    get loginStatus()
    {
        return this._login
    }

    //setters
    set loginStatus(newLoginStatus)
    {
        this._login = newLoginStatus
    }

    // methods (To add trips into either list of trips, scheduled or past)
    addToPastTrips(trip)
    {

        this._pastTrips.push(trip)
    }

    addToScheduledTrips(trip)
    {

        this._scheduledTrips.push(trip)
    }

    removeTrip(tripName)
    {
        let triplist = this._scheduledTrips
        for (let i = 0; i < triplist.length; i++)
        {
            if (triplist[i].name == tripName)
            {
                triplist.splice(i, 1)
            }
        }
    }

    fromData(data) //storing data method
    {
        this._name = data._name
        this._email = data._email
        this._password = data._password
        this._scheduledTrips = data._scheduledTrips
        this._pastTrips = data._pastTrips
        this._login = data._login
    }
}


// Trip class
// A class storing information of a single trip
class Trip
{
    constructor(country = "", name = "", date = "")
    {
        this._country = country
        this._name = name
        this._date = date
        this._route = []
        this._stopsList = []
        this._startAirport = ""
        this._endAirport = ""
    }

    // Getters
    get country()
    {
        return this._country
    }

    get name()
    {
        return this._name
    }
    
    get date()
    {
        return this._date
    }

    get route()
    {
        return this._route
    }

    get allStops()
    {
        return this._stopsList
    }

    get startAirport()
    {
        return this._startAirport
    }

    get endAirport()
    {
        return this._endAirport
    }

    // Setters
    set startAirport(name)
    {
        this._startAirport = name
    }

    set endAirport(name)
    {
        this._endAirport = name
    }

    set allStops(stops)
    {
        this._stopsList = stops
    }

    set tripName(name)
    {
        this._name = name
    }

    set country(newCountry) 
    { 
        this._country = newCountry
    }

    set date(newDate) 
    { 
        this._date = newDate
    }

    set route(newRoute)
    {
        this._route = newRoute
    }

    //methods (storing data)
    fromData(data)
    {
        this._country = data._country
        this._name = data._name
        this._date = data._date
        this._route = data._route
        this._stopsList = data._stopsList
        this._startAirport = data._startAirport
        this._endAirport = data._endAirport
    }
}

//markers or routes class
//a class containing information about markers and routes of a country
class MarkersOrRoutes
{
    constructor()
    {
        this._markers = []
        this._routes = []
    }

    //getters
    get markers()
    {
        return this._markers
    }

    get routes()
    {
        return this._markers
    }

    //setters
    set markers(markerList)
    {
        this._markers = markerList
    }

    set routes(routeList)
    {
        this._routes = routeList
    }

    //methods (adding/clearing markers, adding/clearing routes)
    addMarker(marker)
    {
        this._markers.push(marker)
    }

    addRoutes(route)
    {
        this._routes.push(route)
    }

    clearMarkers()
    {
        let markers = this._markers
        for (let i = 0; i < markers.length; i++)
        {
            markers[i].remove()
        }
    }

    clearRoutes()
    {
        let routes = this._routes
        for (let i = 0; i < routes.length; i++)
        {
            let id = "route" + String(i)
            let hasPoly = map.getLayer(id)
            if (hasPoly !== undefined)
            {
                map.removeLayer(id)
                map.removeSource(id)
            }
        }
    }
} 

// Functions to check if data is in Local Storage
function checkIfDataExistsLocalStorage(key)
{
    let retrievedData = localStorage.getItem(key)

    if (typeof retrievedData !== "undefined")
    {
        if (retrievedData !== null || undefined || "")
        {
            return true
        }
        else { return false }
    }
    else { return false }
}

//function to update local storage
function updateLocalStorage(data)
{
    let stringData = JSON.stringify(data)
    localStorage.setItem(APP_DATA_KEY, stringData)
}

//function to update local storage containing user info
function updateUserLocalStorage(data)
{
    let stringData = JSON.stringify(data)
    localStorage.setItem(USER_DATA_KEY, stringData)
}

//function to update local storage containing trip index
function updateIndexLocalStorage(data)
{
    let stringData = JSON.stringify(data)
    localStorage.setItem(TRIP_INDEX_KEY, stringData)
}

//function to update local storage containing country and date
function updateCountryDateLocalStorage(data)
{
    let stringData = JSON.stringify(data)
    localStorage.setItem(COUNTRY_DATE_KEY, stringData)
}

//function to update local storage containing trip info
function updateNewTripLocalStorage(data)
{
    let stringData = JSON.stringify(data)
    localStorage.setItem(NEW_TRIP_KEY, stringData)
}

//function to remove items from local storage using key
function emptyLocalStorage(key)
{
    localStorage.removeItem(key)
}

//function to obtain data from local storage using key
function getDataLocalStorage(key)
{
    let retrievedData = localStorage.getItem(key)
    let objectData = JSON.parse(retrievedData)
    return objectData
}

// Create global App instance
let app = new App()
if (checkIfDataExistsLocalStorage(APP_DATA_KEY))
{
    let objectData = getDataLocalStorage(APP_DATA_KEY)
    app.fromData(objectData)
}
else
{
    updateLocalStorage(app)
}