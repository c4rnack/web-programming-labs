const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.get('/favicon.ico', (req, res) => res.status(200));

const dataFilePath = path.join(__dirname, 'hotels.json');

const readHotelsFromFile = () => {
    const data = fs.readFileSync(dataFilePath);
    return JSON.parse(data);
};

const writeHotelsToFile = (hotels) => {
    fs.writeFileSync(dataFilePath, JSON.stringify(hotels, null, ' '));
};

app.get('/api/home', (req, res) => {
    const hotels = readHotelsFromFile();
    const result = hotels.map(hotel => ({
        id: hotel.id,
        name: hotel.name,
        description: hotel.description
    }))
    res.status(200).json(result);
});

app.get('/api/catalog', (req, res) => {
    const sortBy = req.query.sort;
    const priceRange = req.query.price;
    const searchQuery = req.query.search;

    const hotels = readHotelsFromFile();
    console.log(hotels);

    let filteredHotels = hotels.filter(hotel => {
        const hotelName = hotel.name.toLowerCase().replace(/\s/g, '');
        const searchCondition = hotelName.includes(searchQuery.toLowerCase().replace(/\s/g, ''));
        let priceCondition;
        switch (priceRange) {
          case 'less then 50$':
            priceCondition = hotel.priceForNight < 50;
            break;
          case '50$ - 100$':
            priceCondition = hotel.priceForNight >= 50 && hotel.priceForNight <= 100;
            break;
          case '100$ - 150$':
            priceCondition = hotel.priceForNight >= 100 && hotel.priceForNight <= 150;
            break;
          case '150$ - 200$':
            priceCondition = hotel.priceForNight >= 150 && hotel.priceForNight <= 200;
            break;
          case '200$ and more':
            priceCondition = hotel.priceForNight >= 200;
            break;
          default:
            priceCondition = true;
        }
        return searchCondition && priceCondition;
    });
    if (sortBy === 'Name') {
        filteredHotels.sort((a, b) => {
          if (a.name > b.name) return 1;
          else return -1;
        })
      }
      else if (sortBy === 'Price') {
        filteredHotels.sort((a,b) => a.priceForNight - b.priceForNight)
      }
    res.status(200).json(filteredHotels);
});

app.get('/api/item/:id', (req, res) => {
    const {id} = req.params;
    const hotels = readHotelsFromFile();

    let foundHotel = hotels.find(hotel => hotel.id === id);
    if (foundHotel) res.status(200).json(foundHotel);
    else res.status(404).json({message: 'Hotel not found'});
})

app.listen(3001, () => {
    console.log('Server is running on http://localhost:3001');
})
