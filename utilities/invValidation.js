const { body, validationResult } = require("express-validator")
const utilities = require("../utilities/")
const invModel = require("../models/inventory-model")

const validate = {}

/* **********************************
 * Classification Data Validation Rules
 ********************************** */
validate.classificationRules = () => {
  return [
    body("classificationName")
      .trim()
      .notEmpty()
      .isAlpha()
      .withMessage("Classification name must be a single word with letters only. No spaces or special characters."),
  ]
}

/* **********************************
 * Inventory Data Validation Rules
 ********************************** */
validate.inventoryRules = () => {
  return [
    body("inv_make")
      .trim()
      .notEmpty()
      .withMessage("Make is required."),
    body("inv_model")
      .trim()
      .notEmpty()
      .withMessage("Model is required."),
    body("inv_year")
      .trim()
      .notEmpty()
      .isInt({ min: 1886, max: new Date().getFullYear() + 1 })
      .withMessage(`Year must be between 1886 and ${new Date().getFullYear() + 1}.`),
    body("inv_description")
      .trim()
      .notEmpty()
      .withMessage("Description is required."),
    body("inv_image")
      .trim()
      .notEmpty()
      .withMessage("Image path is required."),
    body("inv_thumbnail")
      .trim()
      .notEmpty()
      .withMessage("Thumbnail path is required."),
    body("inv_price")
      .trim()
      .notEmpty()
      .withMessage("Price is required.")
      .isFloat({ min: 0 })
      .withMessage("Price must be a positive number."),
    body("inv_miles")
      .trim()
      .notEmpty()
      .withMessage("Miles is required.")
      .isInt({ min: 0 })
      .withMessage("Miles must be a positive integer."),
    body("inv_color")
      .trim()
      .notEmpty()
      .withMessage("Color is required."),
    body("classification_id")
      .notEmpty()
      .withMessage("Classification is required.")
      .isInt()
      .withMessage("Classification must be a valid ID."),
  ]
}

/* ******************************
 * Check classification data and return errors or continue
 ***************************** */
validate.checkClassificationData = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav()
    res.render("inventory/add-classification", {
      errors: errors.array(),
      title: "Add Classification",
      nav,
      classificationName: req.body.classificationName,
    })
    return
  }
  next()
}

/* ******************************
 * Check inventory data and return errors or continue
 ***************************** */
validate.checkInventoryData = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav()
    let classificationList = await utilities.buildClassificationList(req.body.classification_id)
    res.render("inventory/add-inventory", {
      errors: errors.array(),
      title: "Add Inventory",
      nav,
      classificationList,
      inv_make: req.body.inv_make,
      inv_model: req.body.inv_model,
      inv_year: req.body.inv_year,
      inv_description: req.body.inv_description,
      inv_image: req.body.inv_image,
      inv_thumbnail: req.body.inv_thumbnail,
      inv_price: req.body.inv_price,
      inv_miles: req.body.inv_miles,
      inv_color: req.body.inv_color,
    })
    return
  }
  next()
}

module.exports = validate