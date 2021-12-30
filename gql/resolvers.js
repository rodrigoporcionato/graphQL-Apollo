
module.exports = {
    Query: {
      products: (_, __, { dataSources }) =>
        dataSources.productAPI.getAllProducts()
    //   launch: (_, { id }, { dataSources }) =>
    //     dataSources.launchAPI.getLaunchById({ launchId: id }),
    //   me: (_, __, { dataSources }) => dataSources.userAPI.findOrCreateUser()
    }
  };
  