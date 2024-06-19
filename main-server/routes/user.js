const express = require("express");
const {
  emailCheckerController, 
  loginController, 
  register,
  allUsers,
  getUserAudio
} = require("../Controllers/user");
const { validateToken } = require("../middleware/authMiddleware");



const router = express.Router();

router.post("/login", loginController);
router.post("/register", register);
router.post("/email-checker/:email", emailCheckerController);
router.get("/all", validateToken ,allUsers);
router.get("/audioList", validateToken ,getUserAudio);




module.exports = router;
