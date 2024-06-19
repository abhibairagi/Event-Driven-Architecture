const OpenAI = require("openai")
const fs = require("fs")
const util = require('util')
const path = require("path")
const AudioModel = require("./models/audio")


const openai = new OpenAI({
  apiKey: process.env.openai,
});


exports.SpeechToText = async (data) => {
  try {
    const transcription = await openai.audio.transcriptions.create({
      file: fs.createReadStream(data.url),
      model: "whisper-1"
    })
    console.log(transcription)

    const targetDir = path.resolve(__dirname, "../front-end/src/Text")
    const filePath = path.join(targetDir, data.name + ".txt")
    const writeFile = util.promisify(fs.writeFile);
    await writeFile(filePath, transcription.text);

    const UpdateAudio = await AudioModel.updateOne({ _id: data._id }, { $set: { "status": "Completed" } })
    return data


  } catch (error) {
    console.log(error)
    console.log(error.message)

  }

}

// exports.textToAudio = async () => {
//   try {
//     const mp3 = await openai.audio.speech.create({
//       model: "tts-1",
//       voice: "alloy",
//       input: "Today is a wonderful day to build something people love!",
//     });
//     const buffer = Buffer.from(await mp3.arrayBuffer());
//     await fs.promises.writeFile( 'output.mp3', buffer);
//   } catch (error) { 
//       console.log(error)
//   }

// }










