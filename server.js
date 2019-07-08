const express = require("express");
const app = express();
const layouts = require("express-ejs-layouts");
const db = require("./models");
// remove fs and use sequelize instead

// const fs = require("fs"); // File system - part of node
const methodOverride = require("method-override");

const port = 3000; 

app.set("view engine", "ejs");
app.use(layouts);
app.use(express.static(__dirname + "/static"));
app.use(express.urlencoded({extended: false})); 
app.use(methodOverride("_method"));

app.get("/", function(req, res) {
    res.render("index");
});

// Get /dinosaurs = index route = gets all dinos
app.get("/dinosaurs", function(req, res) {
    // TODO: remove file system stuff and use sequelize functions
    // let dinosaurs = fs.readFileSync("./dinosaurs.json");
    // let dinoData = JSON.parse(dinosaurs);
    db.dino.findAll()
        .then(function(dinos) {
            res.render("dinos/index.ejs", {dinos});
        })
    // console.log(dinoData);
});

// Get / dinosaurs/new = To serve up our new dino form...need to move it up because of the dinosaurs/:id
app.get("/dinosaurs/new", function(req, res) {
    res.render("dinos/new");
});

// Get / dinosaurs/:id/edit = To serve up our edit dino form...need to move it up because of the dinosaurs/:id
app.get("/dinosaurs/:id/edit", function(req, res) {
    // TODO Update Route
    // let dinosaurs = fs.readFileSync("./dinosaurs.json");
    // let dinoData = JSON.parse(dinosaurs);
    let id = parseInt(req.params.id); 
    db.dino.findByPk(id)
        .then(function(dino) {
            res.render("dinos/edit", {dino});
        });
});

// Get /dinosaurs/:id = show route = gets one dino
app.get("/dinosaurs/:id", function (req, res) {
    // let dinosaurs = fs.readFileSync("./dinosaurs.json");
    // let dinoData = JSON.parse(dinosaurs);
    
    let id = parseInt(req.params.id);
    db.dino.findByPk(id)
        .then(function(dino) {
            res.render("dinos/show", {dino}); //id: id...two key value pairs being passed into the object literal
        })
});


// Post /dinosaurs
app.post("/dinosaurs", function (req, res) {
    // console.log(req.body); 
    // // Read in our JSON file
    // let dinosaurs = fs.readFileSync("./dinosaurs.json");
    // // Convert to an array 
    // let dinoData = JSON.parse(dinosaurs);
    // // Push our new data into the array
    // let newDino = {
    //     type: req.body.dinosaurType,
    //     name: req.body.dinosaurName
    // }
    // dinoData.push(newDino);
    // // Write the array back to the file
    // fs.writeFileSync("./dinosaurs.json", JSON.stringify(dinoData));
    db.dino.create({
        type: req.body.dinosaurType,
        name: req.body.dinosaurName
    }).then(function(dino) {
        res.redirect("/dinosaurs"); 
    });
    // could also use db.dino.save(newDino).then(function(dino) { this works if you have already created an object and saved it in a variable
        // res.redirect("/dinosaurs"); 
    // })
    // could also create with a newDino

});

// Need to require method-override and decide where we can call the delete method
app.delete('/dinosaurs/:id', function(req, res) {
    // // Read the data from the file
    // let dinosaurs = fs.readFileSync("./dinosaurs.json");
    // // Parse the data into an object
    // let dinoData = JSON.parse(dinosaurs); 
    // // Splice out the item at the specified index
    // var id = parseInt(req.params.id); 
    // dinoData.splice(id, 1); 
    // // Stringify the object
    // var dinoString = JSON.stringify(dinoData);
    // // Write the object back to the file
    // fs.writeFileSync("./dinosaurs.json", dinoString);
    db.dino.destroy({
        where: {id: parseInt(req.params.id)}
    }).then(function(dino) {
        res.redirect("/dinosaurs");
    })

});

app.put("/dinosaurs/:id", function(req, res) {
    // let dinosaurs = fs.readFileSync("./dinosaurs.json");
    // let dinoData = JSON.parse(dinosaurs);
    // var id = parseInt(req.params.id);
    // dinoData[id].name = req.body.dinosaurName;
    // dinoData[id].type = req.body.dinosaurType; 
    // fs.writeFileSync("./dinosaurs.json", JSON.stringify(dinoData));
    db.dino.update({
        name: req.body.dinosaurName,
        type: req.body.dinosaurType
    }, {
        where: {id: parseInt(req.params.id)}
    }).then(function(dino) {
            res.redirect("/dinosaurs/" + parseInt(req.params.id));
    });
})

app.listen(port, function() {
    console.log("We are listening (👂) on port: " + port);
});