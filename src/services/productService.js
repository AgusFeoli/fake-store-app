import axios from 'axios';

const BASE_URL = 'https://fakestoreapi.com';

export const getAllProducts = async () => {
  const response = await axios.get(`${BASE_URL}/products`, {
    timeout: 10000, // 10 second timeout
  });
  return response.data;
};