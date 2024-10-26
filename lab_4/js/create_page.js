import { Hotel, getHotelList, isInHotels } from "./globals.js";

const nameInput = document.getElementById("hotel_name_input");
const roomsInput = document.getElementById("hotel_rooms_input");
const visitorsInput = document.getElementById("hotel_visitors_input");

const submitButton = document.getElementById("submit_button");
const clearAllButton = document.getElementById("clear_all_button");

const alert = document.getElementById("alert");
const alertText = document.getElementById("alert_text");
const alertButton = document.getElementById("close_alert");

let hotels = getHotelList();

const displayAlert = (alertType, alertInfo) => {
    if (alert.classList.contains('success')) {
        alert.classList.remove('success');
    }
    else if (alert.classList.contains('fail')) {
        alert.classList.remove('fail')
    }

    alertText.innerHTML = `${alertInfo}`;
    alert.classList.toggle(alertType);
}

alertButton.addEventListener('click', () => {
    if (alert.classList.contains('success')) {
        alert.classList.remove('success');
    }
    else if (alert.classList.contains('fail')) {
        alert.classList.remove('fail')
    }
});

submitButton.addEventListener('click', () => {
    let hotels = getHotelList();
    const name = nameInput.value.trim();
    const rooms = parseInt(roomsInput.value);
    const visitors = parseInt(visitorsInput.value);

    if (nameInput.value.trim() === '' || roomsInput.value == '' || visitorsInput.value == '')
        displayAlert('fail', '<b>Oops!</b> Looks like you don\'t filled all the inputs');

    else if (parseInt(roomsInput.value) < 0 || parseInt(visitorsInput.value) < 0 )
        displayAlert('fail', '<b>Oops!</b> Number of rooms and amount of visitors cannot be negative numbers');

    else if (isInHotels(hotels, nameInput.value.trim()))
        displayAlert('fail', '<b>Oops!</b> There should be no hotels with the same name')

    else {
        const hotel = new Hotel(name, rooms, visitors);
        hotels.push(hotel);

        localStorage.setItem("hotels", JSON.stringify(hotels));
        displayAlert('success', '<b>Congratulations</b> Your object was added <3')}
});

clearAllButton.addEventListener('click' ,() => {
    nameInput.value = roomsInput.value = visitorsInput.value = '';
});

