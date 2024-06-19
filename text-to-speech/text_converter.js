const fs = require("fs")
const util = require('util')
const path = require("path")
const { kafka } = require("./client")
const textToSpeech = require('@google-cloud/text-to-speech');
const client = new textToSpeech.TextToSpeechClient();
const audioModel = require("./models/audio")



exports.textConverter = async (data) => {

  // console.log(data)
  const request = {
    input: { text: data.text },
    voice: { languageCode: 'en-US', ssmlGender: 'NEUTRAL' },
    audioConfig: { audioEncoding: 'MP3' },
  };


  const targetDir = path.resolve(__dirname , "../front-end/src/Audio")
  // const name = data.name + ".mp3"
  const filePath = path.join(targetDir , data.name + ".mp3")


  // Performs the text-to-speech request
  const [response] = await client.synthesizeSpeech(request);
  const writeFile = util.promisify(fs.writeFile);
  await writeFile(filePath, response.audioContent, 'binary');
  console.log('Audio content written to file: output.mp3');

  const Object =  {
    name : data.name,
    url  : data.name + ".mp3",
    userId : data.userId
  }

    const Audio = await audioModel.updateOne({ _id : data._id}, {$set : {"status" : "Completed"}})

    return Object
}


