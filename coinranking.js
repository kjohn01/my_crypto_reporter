const axios = require('axios'); 

const client = axios.create({
  baseURL: 'https://api.coinranking.com/v1/public/',
});

module.exports = {
  async getCoin(coinId) {
    const response = await client.get(`/coin/${coinId}`, {
      params: {
        base: 'USD',
      },
    });
    
    return response.data;
  },
};