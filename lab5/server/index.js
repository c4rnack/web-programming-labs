const express = require('express');
const fs = require('fs');
const path = require('path');
const uuid = require('uuid');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'site')));
app.get('/favicon.ico', (req, res) => res.status(200));

const dataFilePath = path.join(__dirname, 'site', 'hotels.json');
console.log(dataFilePath);

const readHotelsFromFile = () => {
    const data = fs.readFileSync(dataFilePath);
    return JSON.parse(data);
};

const writeHotelsToFile = (hotels) => {
    fs.writeFileSync(dataFilePath, JSON.stringify(hotels, null, ' '));
};

const sortHotels = (hotels) => hotels.sort((a,b)=> b.visitors-a.visitors);

app.get('/api/hotels', (req, res) => {
    const needToSort = req.query.s;
    let searchQuery = req.query.q;
    let hotels = readHotelsFromFile();
    if (searchQuery) {
        hotels = hotels.filter((hotel) => 
            hotel.name.toLowerCase().replace(/\s/g, '').search(searchQuery.toLowerCase().replace(/\s/g, '')) !== -1);
    }
    if (needToSort === 'true') hotels = sortHotels(hotels);
    res.status(200).json(hotels);
});

app.get('/api/hotels/:id', (req, res) => {
    const {id} = req.params;
    const hotels = readHotelsFromFile();
    foundHotel = hotels.find(hotel => hotel.id === id);
    if (foundHotel) res.status(200).json(foundHotel);
    else res.status(404).json({message: 'Hotel not found'});

})

app.post('/api/hotels', (req, res) => {
    const newHotel = {id:uuid.v4(), ...req.body};
    const hotels = readHotelsFromFile();

    const existingHotel = hotels.find(hotel => hotel.name === newHotel.name);
    if (existingHotel) {
        return res.status(400).json({message: 'Hotel with this name already exists'});
    }

    hotels.push(newHotel);
    writeHotelsToFile(hotels);
    res.status(201).json(newHotel);
});

app.patch('/api/hotels/:id', (req, res) => {
    const {id} = req.params;
    const body = req.body;
    console.log(body);
    const updatedHotel = {id, ...body};

    console.log(updatedHotel);
    const hotels = readHotelsFromFile();

    const existingHotel = hotels.find(hotel => 
        hotel.name === updatedHotel.name && hotel.id !== updatedHotel.id);
    if (existingHotel) {
        return res.status(400).json({message: 'Hotel with this name already exists'});
    }
    let hotelToUpdate = hotels.find(hotel => hotel.id == updatedHotel.id);
    if (hotelToUpdate) {
        for (const key in updatedHotel) {
            hotelToUpdate[key] = updatedHotel[key];
        }
        console.log(hotelToUpdate);
        writeHotelsToFile(hotels);
        res.status(200).json(updatedHotel);
    }
    else res.status(404).json({message: 'Hotel not found'});
});

app.delete('/api/hotels/:id', (req, res) => {
    const {id} = req.params;
    let hotels = readHotelsFromFile();
    const hotelToDelete = hotels.find(hotel => hotel.id === id);
    if (hotelToDelete) {
        hotels = hotels.filter(el => el !== hotelToDelete);
        writeHotelsToFile(hotels);
        res.status(200).json({message: 'Hotel deleted successfully'});
    }
    else res.status(404).json({message: 'Hotel not found'})
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
})
