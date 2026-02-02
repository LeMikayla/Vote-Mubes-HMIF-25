const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");

// Define Routes
router.get("/", UserController.getAllUsers); // GET /api/users
router.get("/search/:username", UserController.getUserByUsername);
router.get("/:id", UserController.getUserById); // GET /api/users/:id

module.exports = router;
