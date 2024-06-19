const express = require("express");

const router = express.Router();

const {convertTextToAudio} = require("../Controllers/textToAudio")
const {validateToken} = require("../middleware/authMiddleware")


router.post("/convert" , validateToken , convertTextToAudio)

module.exports = router;