const { kafka } = require("./client");
require('dotenv').config()
const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require('body-parser')
const cors = require("cors")
const { SpeechToTextConsumer} = require('./Consumer/stt')


const port = 8000
const app = express()

mongoose.connect(process.env.DATABASE_URL,{ useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('database connected &&  MicroService Server is Running'))

app.use(cors())
app.use(bodyParser.json());


SpeechToTextConsumer()


