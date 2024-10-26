const searchInput = document.getElementById("search_input");
const searchButton = document.getElementById("search_button");
const cancelButton = document.getElementById("cancel_button");

const sortCheckbox = document.getElementById("sort_checkbox");
const countButton = document.getElementById("count_button");
const countOutput = document.getElementById("count_output");

const hotelSection = document.getElementById("hotel_section");

const hotelTemplate = (hotel) => `<div class="hotel__section-card">
                    <img class="card-image" src="images/hotel_image.jpg">
                    <h3>${hotel.name}</h3>
                    <div class="card-text">
                        <span>Amount of rooms:</span>
                        <span class="number-text">${hotel.rooms}</span>
                    </div>
                    <div class="card-text">
                        <span>Amount of visitors:</span>
                        <span class="number-text">${hotel.visitors}</span>
                    </div>
                    <div class="card-buttons">
                        <button id="edit_button_${hotel.id}">Edit</button>
                        <button id="remove_button_${hotel.id}">Remove</button>
                    </div>
                </div>`;

let displayedHotels = [];

const fetchHotels = async (needToSort = false) => {
    const response = await fetch(`http://localhost:3000/api/hotels?s=${needToSort}`);
    displayedHotels = await response.json();
    displayHotels(displayedHotels);
}

const fetchFoundHotels = async () => {
    if (searchInput.value.trim() !== '') {
        const response = await fetch(`http://localhost:3000/api/hotels?s=${sortCheckbox.checked}&q=${searchInput.value.trim()}`);
        displayedHotels = await response.json();
        displayHotels(displayedHotels);
    }
}

const deteteHotel = async (id) => {
    await fetch(`http://localhost:3000/api/hotels/${id}`, {
        method: 'DELETE'
    });
    fetchHotels();
}

const displayHotels = (hotels) => {
    hotelSection.innerHTML = '';
    const hotelArray = hotels.slice().reverse();
    hotelArray.forEach(hotel => {
        hotelSection.insertAdjacentHTML('afterbegin', hotelTemplate(hotel));

        document.getElementById(`edit_button_${hotel.id}`).addEventListener('click', () => {
            localStorage.setItem('editHotelId', hotel.id);
            window.location.href = 'edit_page.html'
        });
        document.getElementById(`remove_button_${hotel.id}`).addEventListener('click', async () => {
            await deteteHotel(hotel.id);
            await fetchHotels()
        });
    displayVisitorsCount(hotels);
    });
}

searchButton.addEventListener("click", fetchFoundHotels);

cancelButton.addEventListener("click", async () => {
    await fetchHotels(sortCheckbox.checked);
    searchInput.value = '';
});

sortCheckbox.addEventListener('change', async () => {
    const response = await fetch(`/api/hotels?s=${sortCheckbox.checked}&q=${searchInput.value.trim()}`);
    displayedHotels = await response.json();
    displayHotels(displayedHotels);
});

const displayVisitorsCount = (hotels) => {
    countOutput.innerHTML = '';
    let visitors = 0;
    hotels.forEach(hotel => {
        visitors += hotel.visitors;
    });
    countOutput.innerHTML = `${visitors}`;
}

countButton.addEventListener('click', () => {
    displayVisitorsCount(displayedHotels);
});

fetchHotels();
