export class Hotel{

    constructor(name, visitors, rooms){
        this.id = uuid.v4();
        this.name = name;
        this.visitors = visitors;
        this.rooms = rooms;
    }
}

export const getHotelList = () => {
    if (localStorage.getItem("hotels") == undefined) {
        const hotels = [
            new Hotel("Carnack", 45, 39),
            new Hotel("Pipipupu", 4_123, 123), 
            new Hotel("Lviv Polytechnic University", 200_000, 30),
            new Hotel("Dim sobak", 0, 12),
            new Hotel("Luxury Hotel", 12_000_000, 100000),
            new Hotel("Absolutely horrible hotel", 1, 2),
        ];
        localStorage.setItem("hotels", JSON.stringify(hotels));
        return hotels
    }
    else {
        const hotels = JSON.parse(localStorage.getItem("hotels"));
        return hotels
    }
}

export const isInHotels = (hotels, name) => {
    let result = false;
    hotels.forEach((hotel => {
        if (hotel.name.trim() == name.trim())
            result = true;
        }))
    return result;
}