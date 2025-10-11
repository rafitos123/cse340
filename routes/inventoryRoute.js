const express = require("express")
const router = new express.Router()
const invController = require("../controllers/invController")
const invValidation = require("../utilities/invValidation")
const utilities = require("../utilities/")
const multer = require('multer')
const path = require('path')


//upload images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/vehicles/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})
const upload = multer({ storage: storage })


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

// Add inventory with image upload (POST)
router.post(
  '/classification/add-inventory',
  upload.fields([
    { name: 'inv_image_upload', maxCount: 1 },
    { name: 'inv_thumbnail_upload', maxCount: 1 }
  ]),

  invValidation.inventoryRules(),
  invController.insertInventory,
  invValidation.checkInventoryData

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


// Edit inventory (POST)
router.post(
  '/update/',
  upload.fields([
    { name: 'inv_image_upload', maxCount: 1 },
    { name: 'inv_thumbnail_upload', maxCount: 1 }
  ]),
  invValidation.inventoryRules(),
  invValidation.checkUpdateData,
  invController.updateInventory,
  utilities.handleErrors(invController.updateInventory)
)

// Delete vehicle view
router.get("/delete/:inv_id", utilities.handleErrors(invController.deleteInventoryView))

// Delete vehicle (POST)
router.post("/delete/", utilities.handleErrors(invController.deleteInventory))



module.exports = router