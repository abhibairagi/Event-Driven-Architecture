
const { kafka } = require("../client");
const AudioModel = require("../models/audio")

exports.convertTextToAudio = async (req , res) => {
    try {



        const producer = kafka.producer()

        var newAudio  = {
            name : req.body.name,
            url : req.body.name + ".mp3",
            userId : req.user._id,
            status : "Procesing",
            type : "Audio"
        }

        const saveAudio = await new AudioModel(newAudio).save()

        const userdetails = {
            name : req.body.name,
            text : req.body.text,
            userId : req.user._id,
            _id : saveAudio._id
        }
        

        await producer.connect();
        await producer.send({
            topic: "textToSpeech",
            messages: [{
                partition : 0,
                key: "data", 
                value: JSON.stringify(userdetails)
            }]
        })

        console.log("produce Successfully")

        await producer.disconnect()

        return res.status(200).send({message : "Audio Converions is going On"});
       
    } catch (error) {
        console.log(error)
        return res.status(401).send({message : "Something went Wrong"});

    }
}