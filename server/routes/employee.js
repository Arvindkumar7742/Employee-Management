const express = require("express");
const { createEmployee, updateEmployee, fetchAllEmployee, deleteEmployee } = require("../controllers/employee");
const router =express.Router();

//listing all the employee routes
router.post("/createEmployee" ,createEmployee);
router.post("/updateEmployee",updateEmployee);
router.get("/getAllEmployees" ,fetchAllEmployee);
router.delete("/deleteEmployee",deleteEmployee);

module.exports = router;