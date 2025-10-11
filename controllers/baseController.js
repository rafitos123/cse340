const utilities = require("../utilities/")
const invModel = require("../models/inventory-model") 
const baseController = {}

baseController.buildHome = async function(req, res){
   const vehicles = await invModel.getAllVehicles() 
  const randomIndex = Math.floor(Math.random() * vehicles.length)
  const featuredVehicle = vehicles[randomIndex]
    const nav = await utilities.getNav() 

  res.render("index", {
    title: "Welcome to CSE Motors!",
    featuredVehicle,
    nav,
    messages: req.flash("notice2")
  })
}

module.exports = baseController