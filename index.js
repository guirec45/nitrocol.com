const { query } = require("express");
const express = require("express");
const app = express();
app.use(express.urlencoded({extended : true}));


// BDD 
const mysql = require('mysql');
const connect = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "nitrocol.com",
});

app.use(express.static("public"));
app.set('view engine', "ejs");
app.set('views', "./views");

app.listen(8080, ()=>{
    console.log("le serveur tourne sur la page http://127.0.0.1:8080")
});

app.use(express.json());

const produits = require('./api/produitsClass');


connect.connect(function(err){
    if (err) throw err;
    console.log("Yess cela fonctionne");
    connect.query("SELECT * from produits;", function(err, result){
        if (err) throw err;
        console.log(result);
    })

});

app.get("/produitsClass", function (request, response) {
    connect.query("SELECT * FROM produits;", function (err, result) {
        if (err) throw err;
        console.log(result);
        response.status(200).json(result)
        // 200 = OK 
        response.render("produitsClass",{produits : result})
    })
});






app.get("/accueil", function (request, response) {
    response.render("produits", { produits })
})