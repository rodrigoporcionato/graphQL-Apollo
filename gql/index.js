const { ApolloServer } = require('apollo-server');
const productAPI = require('./3party/productAPI');
const resolvers = require('./resolvers');


const typeDefs = `
    type Products {
        id: Int
        name: String
        price: Float
    }
    type Query {
        products: [Products]
    }
`
//resolver faux
// const resolvers = {
//     Query: {
//         info: () => `this is the api of I use`
//         productAPI: productAPI
//     }
// }

const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
        productAPI: new productAPI()
    })
});

server
  .listen()
  .then(({ url }) =>
    console.log(`Server is running on ${url}`)
  );

