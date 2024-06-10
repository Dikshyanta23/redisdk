const { createUser, getAllUsers } = require("../Controllers/userController");

const express = require("express");

const router = express.Router();

router.route("/").post(createUser).get(getAllUsers);

module.exports = router;
