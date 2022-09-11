const express = require('express');

const date = require(__dirname + "/date.js"); //locale self-made module

const mongoose = require("mongoose");


const app = express();

app.use(express.static("public")); //Serving static files in Express

app.use(express.urlencoded({extended: true}));  // replaces bodyparser

app.set("view engine", "ejs");

mongoose.connect("mongodb://localhost:27017/todolistDB");


var day = "";


////// Creating out Item schema
const itemsSchema = {
  name : String
};

////// Creating the model
const Item = mongoose.model("Item", itemsSchema);

////// Creating the documents
const item1 = new Item({
  name : "Eat"
});
const item2 = new Item({
  name : "Read"
});
const item3 = new Item({
  name : "Walk"
});


const defaultItems = [item1, item2, item3];

app.get("/", function(req, res){
  let day = date.getDate();

  Item.find({}, function(err, foundItems){

    if(foundItems.length === 0){
      Item.insertMany(defaultItems, function(err){
        if(err)console.log(err);
        else console.log("Successfully saved defaultItems to DB.");

        res.redirect("/");                  
      })
    }else res.render("list.ejs", {listName: day, newListItems: foundItems});
  });

})

app.post("/", function(req, res){

  const itemName = req.body.newItem;
  const item = new Item({
    name : itemName
  });
  item.save();

  res.redirect("/");

})

app.post("/delete", function(req, res){
  const checkedItemId = req.body.checkboxItem;
  //console.log(checkedItemId);
  Item.findByIdAndRemove(checkedItemId, function(err) {
    if(!err)console.log("Successfully deleted checked item.");
    res.redirect("/");
  })
})

app.listen(3000, function(){
  console.log("server is started at port 3000.");
})
