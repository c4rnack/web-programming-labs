const nameInput = document.getElementById("hotel_name_input");
const roomsInput = document.getElementById("hotel_rooms_input");
const visitorsInput = document.getElementById("hotel_visitors_input");

const submitButton = document.getElementById("submit_button");
const clearAllButton = document.getElementById("clear_all_button");

const alert = document.getElementById("alert");
const alertText = document.getElementById("alert_text");
const alertButton = document.getElementById("close_alert");

const editHotelId = localStorage.getItem('editHotelId');

const getHotel = async (id) => {
    const response = await fetch(`/api/hotels/${id}`);
    return await response.json();
}

const hotelToEdit = await getHotel(editHotelId);
console.log(hotelToEdit);

nameInput.value = hotelToEdit.name;
roomsInput.value = hotelToEdit.rooms;
visitorsInput.value = hotelToEdit.visitors;

const editHotel = async (id, name, rooms, visitors) => {
    const response = await fetch(`/api/hotels/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({name, rooms, visitors})
    })
    return response
}

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

submitButton.addEventListener('click', async () => {
    if (nameInput.value.trim() === '' || roomsInput.value == '' || visitorsInput.value == '')
        displayAlert('fail', '<b>Oops!</b> Looks like you don\'t filled all the inputs');

    else if (parseInt(roomsInput.value) < 0 || parseInt(visitorsInput.value) < 0 )
        displayAlert('fail', '<b>Oops!</b> Number of rooms and amount of visitors cannot be negative numbers');

    else {
        const hotelName = nameInput.value.trim();
        const hotelRooms = parseInt(roomsInput.value);
        const hotelVisitors = parseInt(visitorsInput.value);

        const response = await editHotel(editHotelId, hotelName, hotelRooms, hotelVisitors);
        if (response.ok) {
                localStorage.clear();
                window.location.href = 'index.html';
            }
        else displayAlert('fail', `<b>Oops!</b> ${await response.json().message}`);
    }
});

clearAllButton.addEventListener('click' ,() => {
    nameInput.value = roomsInput.value = visitorsInput.value = '';
});