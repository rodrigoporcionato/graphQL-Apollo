const { RESTDataSource } = require('apollo-datasource-rest');

class ProductAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://localhost:49160/api/';
  }

  async getAllProducts() {
    const response = await this.get('products');
    return Array.isArray(response)
    ? response.map(products => this.productReducer(products))
      : [];
  }


  productReducer(result) {
    return {
      id: result.ID || 0,
      name: result.NAME,
      price: result.PRICE || 0      
    };
  }

}

module.exports = ProductAPI;