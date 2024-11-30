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