//unit 4 
const express = require("express");
const router = new express.Router();
const accountController = require("../controllers/accountController");
const utilities = require("../utilities");
const regValidate = require('../utilities/account-validation')

// Route to account management view
router.get("/login", utilities.handleErrors(accountController.buildLogin));
router.get("/register", utilities.handleErrors(accountController.buildRegister));

// Route to process account management actions
// Process the registration data
router.post(
  "/register",
  regValidate.registationRules(),
  regValidate.checkRegData,
  utilities.handleErrors(accountController.registerAccount)
)


// Process the login request
router.post(
  "/login",
  regValidate.loginRules(),
  regValidate.checkLoginData,
  utilities.handleErrors(accountController.accountLogin)
)

//Logged in view
router.get("/logged-in", utilities.handleErrors(accountController.buildLoggedIn));

router.get("/", utilities.checkLogin, utilities.handleErrors(accountController.buildManagement))

//Uptade profile
router.get("/edit-profile", utilities.checkLogin, utilities.handleErrors(accountController.buildEditProfile))

//uptade Profile POST
router.post(
  "/profile", 
  utilities.checkLogin, 
  regValidate.profileRules(), 
  regValidate.checkProfileData, 
  utilities.handleErrors(accountController.updateProfile)
)


//Update Password
router.get("/update-password", utilities.checkLogin, utilities.handleErrors(accountController.buildUpdatePassword))

//Update Password POST
router.post(
  "/password",
  utilities.checkLogin, 
  regValidate.passwordRules(), 
  regValidate.checkPasswordData, 
  utilities.handleErrors(accountController.updatePassword)
)

//Logout
router.get("/logout", utilities.handleErrors(accountController.accountLogout));

module.exports = router;