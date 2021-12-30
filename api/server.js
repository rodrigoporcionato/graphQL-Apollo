var config = require('./config');
var express = require('express');
var app = express();
var port = process.env.port || 1337;
var productController = require('./Controller/ProductController')();

//body-parser extracts the entire body portion of an incoming request stream and exposes it on req. body.
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//just for test api
// app.get("/product",function(request,response)
// {
//     response.json({"Message":"Welcome to Node js"});
// });

app.use("/api/products", productController);

app.listen(port, function(){
    var datetime = new Date();
    console.log(`
      🚀  Server is running at ${datetime}! NODE_ENV: ${config.NODE_ENV}
      🔉  Listening on port ${port}
      📭  Listen at http://localhost:${port}          
    `);
});

