const express = require("express");
const router = express.Router();
const {home,contact} = require("../controller/auth-controller");
const getAllProducts=require("../controller/products")
router.route("/").get(getAllProducts);
router.route("/contact").get(contact);
router.route("/contact").post(contact);
module.exports = router;
