const express = require("express");
const { register, login } = require("../controllers/login");
const router =express.Router();

//listing all the login routes
router.post("/register" , register );
router.get("/login",login);

module.exports = router;