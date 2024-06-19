const mongoose = require("mongoose")
const { ObjectId } = mongoose.Schema

const audioSchema = new mongoose.Schema({
    name: {
        type: String,  
        required : true,  
    },
    url : {
        type: String,  
        required : true,
    },
    userId : {
        type : ObjectId,
        ref : "user"
    },
    status : {
        type : String,
    }, 
    type : {
        type : String,
        required : true
    }
}, { timestamps: true }
)

module.exports = mongoose.model("Audio", audioSchema);