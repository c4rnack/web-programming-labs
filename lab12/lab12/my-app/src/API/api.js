import axios from 'axios';

export const getHotelsHome = async () => {
    return await axios.get('http://localhost:3001/api/home');
}

export const getHotelsCatalog = async (sortBy, priceRange, searchQuery) => {
    return await axios.get(`http://localhost:3001/api/catalog`, {
        params: {
            sort: sortBy,
            price: priceRange,
            search: searchQuery
        }
    });
}

export const getHotelItem = async (id) => {
    return await axios.get(`http://localhost:3001/api/item/${id}`)
}

export const loginUser = async (email, password) => {
    return await axios.post('http://localhost:3001/api/login', {email: email, password: password})
}

export const registerUser = async (username, email, password) => {
    return await axios.post('http://localhost:3001/api/register', {username, email, password})
}

export const getCart = async () => {
    const email = JSON.parse(localStorage.getItem('user')).email;
    return await axios.get('http://localhost:3001/api/cart', {
        headers: {
            Authorization: `Bearer ${email}`
        }
    })
}

export const postCart = async (items) => {
    const email = JSON.parse(localStorage.getItem('user')).email;
    return await axios.post('http://localhost:3001/api/cart', {items: items} , {
        headers: {
            Authorization: `Bearer ${email}`
        }
    })
}