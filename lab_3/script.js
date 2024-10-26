const searchInput = document.getElementById("search_input");
const searchButton = document.getElementById("search_button");
const cancelButton = document.getElementById("cancel_button");

const sortCheckbox = document.getElementById("sort_checkbox");
const countButton = document.getElementById("count_button");
const countOutput = document.getElementById("count_output");

const hotelSection = document.getElementById("hotel_section");

const hotelTemplate = (hotel) => `<div class="hotel__section-card">
    <img class="card-image" src="hotel_image.jpg">
    <h3>${hotel.name}</h3>
    <div class="card-text">
        <span>Amount of rooms:</span>
        <span class="number-text">${hotel.rooms}</span>
    </div>
    <div class="card-text">
        <span>Amount of visitors:</span>
        <span class="number-text">${hotel.visitors}</span>
    </div>
</div>`;

class Hotel{
    constructor(name, visitors, rooms){
        this.name = name;
        this.visitors = visitors;
        this.rooms = rooms;
    }
}

const hotels = [
    new Hotel("Carnack", 45, 39),
    new Hotel("Pipipupu", 4_123, 123), 
    new Hotel("Lviv Polytechnic University", 200_000, 30),
    new Hotel("Dim sobak", 0, 12),
    new Hotel("Luxury Hotel", 12_000_000, 100000),
    new Hotel("Absolutely horrible hotel", 1, 2),
];

let displayedHotels = hotels.slice();

const displayHotels = (hotels) => {
    hotelSection.innerHTML = '';
    const hotelArray = hotels.slice().reverse();
    hotelArray.forEach(hotel => {
        hotelSection.insertAdjacentHTML('afterbegin', hotelTemplate(hotel));
    });
}
displayHotels(hotels);

searchButton.addEventListener("click", () => {
    const foundHotels = hotels.filter((hotel) => {
        return hotel.name.toLowerCase().replace(/\s/g, '').search(searchInput.value.toLowerCase().replace(/\s/g, '')) !== -1
    });

    displayedHotels = foundHotels.slice();
    if (sortCheckbox.checked) {
        sortHotels();
    }
    else {
        displayHotels(foundHotels)
    }
    searchInput.value = '';
});

cancelButton.addEventListener("click", () =>{
    displayedHotels = hotels.slice();
    
    if (sortCheckbox.checked) {
        sortHotels();
    }
    else {
        displayHotels(hotels)
    }
    searchInput.value = '';
});

const sortHotels = () => {
    const sortedHotels = displayedHotels.slice().sort((a,b)=> b.visitors-a.visitors);
    displayHotels(sortedHotels);
}

sortCheckbox.addEventListener('change', () => {
    if (sortCheckbox.checked) {
        sortHotels();
    }
    else {
        displayHotels(displayedHotels);
    }
});

const displayVisitorsCount = (hotels) => {
    countOutput.innerHTML = '';
    let visitors = 0;
    hotels.forEach(hotel => {
        visitors += hotel.visitors;
    });
    countOutput.innerHTML = `${visitors}`;
}
displayVisitorsCount(hotels);

countButton.addEventListener('click', () => {
    displayVisitorsCount(displayedHotels);
});






