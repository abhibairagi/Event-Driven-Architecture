
const { kafka } = require("../client");
const AudioModel = require("../models/audio")
const multer = require('multer');
const OpenAI = require("openai")
const fs = require("fs")

const openai = new OpenAI({
    apiKey: process.env.openai,
});

const storage = multer.diskStorage({
    destination: '../uploads',
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage: storage }).single('file');


exports.convertSpeechToText = async (req, res) => {


    upload(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(400).send('File upload error.');
        } else if (err) {
            return res.status(500).send('Internal server error.');
        }

        const file = req.file;
        // console.log(file, "file")
        if (!file) {
            return res.status(400).send('No file uploaded.');
        }

        try {
            console.log(file.path, "File")

            const data = {
                name: req.body.name,
                url: file.path,
                userId: req.user._id,
                status: "processing",
                type: "Text"
            }

            const newAudio = await new AudioModel(data).save()

            const producer = kafka.producer()
            await producer.connect();
            await producer.send({
                topic: "speechToText",
                messages: [{
                    partition: 0,
                    key: "data",
                    value: JSON.stringify(newAudio)
                }]
            })

            console.log("produce Successfully")

            await producer.disconnect()

            return res.status(200).send({ message: "Speech To Text Converions is going On" });


        } catch (error) {
            console.error('Error transcribing file:', error);
            res.status(500).send('Error transcribing file.');
        }
    });


    
}