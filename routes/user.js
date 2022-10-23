const express = require('express')
const router = express.Router()

const User = require("../controllers/User");

router.get("/", User.getUsers);
router.get("/:userId", User.getUserOne);
router.post("/", User.createUser);
router.put("/:userId", User.updateUser);
router.patch("/:userId", User.updateUser);
router.delete("/:userId", User.deleteUser);

module.exports = router