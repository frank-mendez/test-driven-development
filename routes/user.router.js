const express = require("express");
const router = express.Router();
const controller = require("../controllers/user.controller");

router.get("/", controller.getAllusers);
router.get("/:id", controller.getUser);

module.exports = router;
