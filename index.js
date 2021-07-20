const express = require('express');

const date = require(__dirname + "/date.js"); //locale self-made module

const app = express();

app.use(express.static("public")); //Serving static files in Express

app.use(express.urlencoded({extended: true}));  // replaces bodyparser

app.set("view engine", "ejs");

var items = ["Eat", "Read", "Workout"];
var workItems = [];
var day = "";

app.get("/", function(req, res){
  let day = date.getDate();
  res.render("list.ejs", {listName: day, newListItems: items});

})

app.post("/", function(req, res){

  //console.log(req.body);

  if(req.body.button === "Work List"){
    workItems.push(req.body.newItem);
    res.redirect("/work");
  }else {
    items.push(req.body.newItem);
    res.redirect("/");
  }
})

app.get("/work", function(req, res){
  res.render("list.ejs", {listName: "Work List", newListItems: workItems});
})

app.listen(3000, function(){
  console.log("server is started at port 3000.");
})
