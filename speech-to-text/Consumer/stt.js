const {SpeechToText} = require("../speech_converter")
const {kafka} = require("../client")


exports.SpeechToTextConsumer = async (req , res) => {
    const consumer = kafka.consumer({ groupId: "user-4" });
    await consumer.connect();
  
    await consumer.subscribe({ topics: ["speechToText"], fromBeginning: true });
  
    await consumer.run({
            eachMessage: async ({message, key , partition }) => {
  
              console.log(JSON.parse(message.value.toString()), "Consume14")  
              const response = await SpeechToText(JSON.parse(message.value.toString()))
              console.log(response)

              const producer =  kafka.producer()

              await producer.connect();
              await producer.send({
                  topic: "speechToText-response",
                  messages: [{
                      partition : 0,
                      key: "data", 
                      value: JSON.stringify(response)
                  }]
              })
      
              console.log("produce Successfully 3030")

            },
          });
}