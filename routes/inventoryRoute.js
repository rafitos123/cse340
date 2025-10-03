const express = require("express")
const router = new express.Router()
const invController = require("../controllers/invController")
const invValidation = require("../utilities/invValidation")
const utilities = require("../utilities/")

// Inventory management view
router.get("/", invController.buildManagementView)
router.get("/management", invController.buildManagementView)


// Show add classification form
router.get("/classification/add", invController.showAddClassification)

// Add classification (POST)
router.post(
  "/classification/add",
  invValidation.classificationRules(),
  invValidation.checkClassificationData,
  invController.insertClassification
)

// Show add inventory form
router.get("/classification/add-inventory", invController.showAddInventory)

// Add inventory (POST)
router.post(
  "/classification/add-inventory",
  invValidation.inventoryRules(),
  invValidation.checkInventoryData,
  invController.insertInventory
)

// Build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId)

// Build single vehicle view
router.get("/detail/:invId", invController.buildByVehicleId)

// Error test route
router.get("/error-test", invController.throwError)

router.get("/getInventory/:classification_id", utilities.handleErrors(invController.getInventoryJSON))

//edit vehicle view
router.get("/edit/:inv_id", utilities.handleErrors(invController.editInventoryView))

//update vehicle
router.post("/update/", utilities.handleErrors(invController.updateInventory))

// Edit inventory (POST)
router.post(
  "/edit/",
  invValidation.inventoryRules(),
  invValidation.checkInventoryData,
  utilities.handleErrors(invController.updateInventory)
)

// Delete vehicle view
router.get("/delete/:inv_id", utilities.handleErrors(invController.deleteInventoryView))

// Delete vehicle (POST)
router.post("/delete/", utilities.handleErrors(invController.deleteInventory))


module.exports = router