// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);

// Route to build single vehicle view
router.get("/detail/:invId", invController.buildByVehicleId)

// Route to test error handling
router.get("/error-test", invController.throwError)

module.exports = router;