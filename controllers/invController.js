const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}

/* ***************************
 *  Build single vehicle view
 * ************************** */
invCont.buildByVehicleId = async function (req, res, next) {
  const inv_id = req.params.invId
  const data = await invModel.getVehicleById(inv_id)
  let nav = await utilities.getNav()
  const grid = await utilities.buildSingleView(data)

  res.render("inventory/detail", {
    title: data.inv_make + " " + data.inv_model,
    nav,
    grid
  })
}

/* *******************************
 *  Build footer intentional error 
 * ******************************* */
invCont.throwError = async function (req, res, next) {
  try {
    // Simula um erro assíncrono
    await new Promise((resolve, reject) => {
      setTimeout(() => reject(new Error("Something went wrong. 500 error!")), 100)
    })
  } catch (err) {
    err.status = 500  
    next(err)           
  }
}




  module.exports = invCont