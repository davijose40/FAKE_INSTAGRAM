const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

// load sesssion
router.get("/", function (req, res, next) {
  res.render("auth/login", { title: "Express" });
});

// login session
router.get("/login", authController.create);
router.post("/login", authController.store);

// register session
router.get("/registro", userController.create);
router.post("/registro", userController.store);

// after login
router.get("/home", function (req, res, next) {
  res.render("index", { title: "Express" });
});

module.exports = router;
