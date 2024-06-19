const {textConverter} = require("../text_converter")
const {kafka} = require("../client")


exports.textToAudioConsumer = async (req , res) => {
    const consumer = kafka.consumer({ groupId: "user-2" });
    await consumer.connect();
  
    await consumer.subscribe({ topics: ["textToSpeech"], fromBeginning: true });
  
    await consumer.run({
            eachMessage: async ({message, key , partition }) => {
  
            //   console.log(JSON.parse(message.value.toString()), "Consume14")  
              const response = await textConverter(JSON.parse(message.value.toString()))
            //   console.log(response)

              const producer =  kafka.producer()

              await producer.connect();
              await producer.send({
                  topic: "textToSpeech-response",
                  messages: [{
                      partition : 0,
                      key: "data", 
                      value: JSON.stringify(response)
                  }]
              })
      
              console.log("produce Successfully 3030")
      
              await producer.disconnect()

            },
          });
}