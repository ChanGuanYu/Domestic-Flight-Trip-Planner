"use strict"

//global list of countries and empty array for country and date
let countryData = ["Afghanistan","Albania","Algeria","American Samoa","Angola","Anguilla","Antarctica","Antigua and Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia and Herzegovina","Botswana","Brazil","British Indian Ocean Territory","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burma","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Central African Republic","Chad","Chile","China","Christmas Island","Cocos (Keeling) Islands","Colombia","Comoros","Congo (Brazzaville)","Congo (Kinshasa)","Cook Islands","Costa Rica","Cote d'Ivoire","Croatia","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","East Timor","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Guiana","French Polynesia","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guadeloupe","Guam","Guatemala","Guernsey","Guinea","Guinea-Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Johnston Atoll","Jordan","Kazakhstan","Kenya","Kiribati","Korea","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Martinique","Mauritania","Mauritius","Mayotte","Mexico","Micronesia","Midway Islands","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauru","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Niue","Norfolk Island","North Korea","Northern Mariana Islands","Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Helena","Saint Kitts and Nevis","Saint Lucia","Saint Pierre and Miquelon","Saint Vincent and the Grenadines","Samoa","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Georgia and the Islands","South Korea","South Sudan","Spain","Sri Lanka","Sudan","Suriname","Svalbard","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Togo","Tonga","Trinidad and Tobago","Tunisia","Turkey","Turkmenistan","Turks and Caicos Islands","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","Uruguay","Uzbekistan","Vanuatu","Venezuela","Vietnam","Virgin Islands","Wake Island","Wallis and Futuna","West Bank","Western Sahara","Yemen","Zambia","Zimbabwe"];
let countryAndDate = []

//function for dropdown list of countries
function displayCountries()
{
    let countryRef = document.getElementById("countriesList");
    
    // printing into dropdown list 
    let output = `<option selected disabled> Select a country </option>`
    for (let i = 0; i < countryData.length; i++)
    {
        output += `<option value="${countryData[i]}">${countryData[i]}</option>`
    }

    countryRef.innerHTML = output;
}

//function to start scheduling trip
function scheduleTrip()
{
    //getting country and date info
    let country = document.getElementById("countriesList").value
    let date = document.getElementById ("travelDate").value
    let year = date.substring(0, 4)
    let month = date.substring(5, 7)
    let day = date.substring(8, 10)
    let inputDate = new Date(year, month - 1, day)
    let dateString = year + "-" + month + "-" + day
    let today = new Date()

    if (country !== "Select a country" && date !== "")
    {
        if (inputDate > today)
        {
            // let trip = new Trip(country,date)
            // updateLocalStorage(trip); //The country selected and date selected are used to start a new trip

            // More to be added
            countryAndDate.push(country, dateString)
            updateCountryDateLocalStorage(countryAndDate)
            window.location = "routeSelectU.html"
        }
        else
        {
            alert("Please select a valid date!")
        }
    }
    else 
    {
        alert("Please select a country and a valid date to start!")
    }
}

//calling function to display list
displayCountries();

//function to redirect user to route selection page
function routePage() 
{
    window.location = "routeSelectR.html"
}

