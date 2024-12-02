const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const bcrypt = require('bcrypt');

const initDB = require('./initDb').initDB;
const User = require('./models/User').User;
const Cart = require('./models/Cart').Cart;

const app = express();

app.use(cors());
app.use(express.json());
app.get('/favicon.ico', (req, res) => res.status(200));

initDB();

const hotelsFilePath = path.join(__dirname, 'hotels.json');
const usersFilePath = path.join(__dirname, 'users.json');

const readHotelsFromFile = () => {
    const data = fs.readFileSync(hotelsFilePath);
    return JSON.parse(data);
};

const readUsersFromFile = () => {
  const data = fs.readFileSync(usersFilePath);
  return JSON.parse(data);
};

const writeHotelsToFile = (hotels) => {
    fs.writeFileSync(hotelsFilePath, JSON.stringify(hotels, null, ' '));
};

const writeUsersToFile = (users) => {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, ' '));
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

app.post('/api/register', async (req, res) => {
  const {username, email, password} = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.create({ username: username, email: email, password: hashedPassword});
    await Cart.create({ user_id: user.id, items: []});
    res.status(201).json(user);
  }
  catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post('/api/login', async (req, res) => {
  const {email, password} = req.body;
  try {
    const user = await User.findOne({ where: {email}});
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({error: "Wrong email or password"})
    }
    let cart = await Cart.findOne({ where: {user_id: user.id}});
    if (!cart) {
      await Cart.create({user_id: user.id, items: []});
    }
    res.status(200).json({username: user.username, email: user.email});
  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/cart', async (req, res) => {
  const email = req.headers.authorization.split(' ')[1];
  try {
    const user = await User.findOne({ where: {email: email} });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const cart = await Cart.findOne({ where: {user_id: user.id}});
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    res.status(200).json(cart);
  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/cart', async (req, res) => {
  const email = req.headers.authorization.split(' ')[1];
  const { items } = req.body;
  try {
    const user = await User.findOne({ where: {email: email} });
    console.log(user);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const cart = await Cart.findOne({ where: {user_id: user.id}});
    console.log(cart);
    if (cart) {
      cart.items = items;
      await cart.save();
    } else {
      cart = await Cart.create({ user_id: user.id, items: items });
    }
    res.status(201).json(cart);
  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }
})

app.listen(3001, () => {
    console.log('Server is running on http://localhost:3001');
})
