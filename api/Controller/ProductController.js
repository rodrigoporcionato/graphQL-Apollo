var express = require('express');
const { func } = require('joi');
var router = express.Router();
var sql = require('mssql');
var conn = require('../connection/connect')();

var routes = function(){

        router.route('/')
        .get(function(req, res)
        {
            conn.connect().then(function(){
                var query = "select * FROM TESTDB.dbo.Products";
                var req = new sql.Request(conn);
                req.query(query).then(function(recordset)
                {
                    res.json(recordset.recordset);
                    conn.close();
                })
                .catch(function(err){
                    conn.close();
                    res.status(400).send("error while select from query =" + err);
                })
            })
            .catch(function(err){
                conn.close();
                res.status(400).send("error while select data" + err);
            });
        });
        
        router.route('/')
        .post(function(req, res)
        {
            conn.connect().then(function()
            {
                var trans = new sql.Transaction(conn);
                trans.begin().then(function()
                {
                    var request = new sql.Request(trans);
                    request.input("name", sql.VarChar(100), req.body.name)
                    request.input("price", sql.Decimal, req.body.price)
                    request.execute("dbo.pr_product_c").then(function()
                    {
                        trans.commit().then(function(recordSet)
                        {
                            conn.close();
                            //res.status(200).send(req.body);
                            res.status(200).send();
                        })
                        .catch(function(err){
                            conn.close();
                            res.status(400).send("error while insert data =" + err);
                        });
                    })
                    .catch(function(err){
                        conn.close();
                        res.status(400).send("error while select from query =" + err);
                    });
                })                
                .catch(function(err){
                    conn.close();
                    res.status(400).send("error while execute =" + err);
                })
            })
            .catch(function(err){
                conn.close();
                res.status(400).send("error while on connect to sql server = " + err);
            });
        })

        router.route('/:id')
        .put(function (req, res)
        {
            var _productID = req.params.id;
            conn.connect().then(function () {
                var transaction = new sql.Transaction(conn);
                transaction.begin().then(function () {
                    var request = new sql.Request(transaction);
                    request.input("id", sql.Int, _productID)
                    request.input("name", sql.VarChar(100), req.body.name)
                    request.input("price", sql.Decimal(18, 0), req.body.price)
                    request.execute("dbo.pr_product_u").then(function () {
                        transaction.commit().then(function (recordSet) {
                            conn.close();
                            res.status(200).send(req.body);
                        }).catch(function (err) {
                            conn.close();
                            res.status(400).send("Error while updating data" + err);});
                    }).catch(function (err) {
                        conn.close();
                        res.status(400).send("Error while updating data");});
                }).catch(function (err) {
                    conn.close();
                    res.status(400).send("Error while updating data");});
            }).catch(function (err) {
                    conn.close();
                    res.status(400).send("Error while updating data");});
        });
        

        router.route('/:id')
        .delete(function (req, res) {
            var _productID = req.params.id;
            conn.connect().then(function () {
                var transaction = new sql.Transaction(conn);
                transaction.begin().then(function () {
                    var request = new sql.Request(transaction);
                    request.input("id", sql.Int, _productID)
                    request.execute("pr_product_d").then(function () {
                        transaction.commit().then(function (recordSet) {
                            conn.close();
                            res.status(200).json("ID:" + _productID);
                        }).catch(function (err) {
                            conn.close();
                            res.status(400).send("Error while Deleting data");
                        });
                    }).catch(function (err) {
                        conn.close();
                        res.status(400).send("Error while Deleting data");
                    });
                }).catch(function (err) {
                    conn.close();
                    res.status(400).send("Error while Deleting data");
                });
            })
        });

        
        

    return router;    
};

module.exports = routes;