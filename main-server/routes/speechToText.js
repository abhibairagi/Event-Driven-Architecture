const express = require("express");

const router = express.Router();

const {convertSpeechToText} = require("../Controllers/SpeechToText")
const {validateToken} = require("../middleware/authMiddleware")


router.post("/convert" , validateToken , convertSpeechToText)

module.exports = router;