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
  let nav = await utilities.getNav();

  if (!data || data.length === 0) {
    req.flash("notice", "No vehicles found for this classification.");
    return res.status(404).render("inventory/management", {
      title: "Classification Not Found",
      nav
    });
  }
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

invCont.buildManagementView = async (req, res, next) => {
  try {
    const nav = await utilities.getNav()
    res.render("inventory/management", {
      title: "Inventory Management",
      nav
    })
  } catch (error) {
    res.redirect("/")
  }
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

/* ***************************
 *  Show add classification view
 * ************************** */
invCont.showAddClassification = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("inventory/add-classification", {
    title: "Add Classification",
    nav,
    errors: null
  })
}

/* ***************************
  *  Insert classification data
  * ************************** */
invCont.insertClassification = async function (req, res) {
  let nav = await utilities.getNav()
  const { classificationName } = req.body
  const regResult = await invModel.insertClassification(classificationName)
  if (regResult) {
    req.flash("notice", `The ${classificationName} classification was added successfully.`)
    res.status(201).redirect("/inv/classification/add")
  } else {
    req.flash("notice", "Sorry, the registration failed. Please try again.")
    res.status(501).render("inv/classification/add", {
      title: "Add Classification",
      nav,
      errors: null,
    })
  }
}

/* ***************************
 *  Show add vehicle view
 * ************************** */
invCont.showAddInventory = async function (req, res) {
  const nav = await utilities.getNav();
  const classificationList = await utilities.buildClassificationList();
    res.render("inventory/add-inventory", {
      title: "Add Inventory",
      nav,
      classificationList,
      inv_make: '',
      inv_model: '',
      inv_year: '',
      inv_description: '',
      inv_image: '/images/vehicles/no-image.png',
      inv_thumbnail: '/images/vehicles/no-image-tn.png',
      inv_price: '',
      inv_miles: '',
      inv_color: '',
      errors: []
    });
};


/* ***************************
  *  Insert vehicle data
  * ************************** */
invCont.insertInventory = async function (req, res) {
  const {
    classification_id,
    inv_make,
    inv_model,
    inv_year,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_miles,
    inv_color
  } = req.body;

  const nav = await utilities.getNav();
  const classificationList = await utilities.buildClassificationList(classification_id);

  try {
    const regResult = await invModel.insertInventory({
      classification_id,
      inv_make,
      inv_model,
      inv_year,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_miles,
      inv_color
    });

    if (regResult.rowCount > 0) {
      req.flash("notice", `The ${inv_make} ${inv_model} vehicle was added successfully.`);
      res.status(201).redirect("/inv/management");
    } else {
      throw new Error("Insert failed");
    }
  } catch (error) {
    req.flash("notice", "Sorry, the registration failed. Please try again.");
    res.status(501).render("inventory/add-inventory", {
      title: "Add Inventory",
      nav,
      classificationList,
      ...req.body,
      errors: errors.array()
    });
  }
};

  module.exports = invCont