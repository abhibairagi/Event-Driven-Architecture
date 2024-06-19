const userModel = require("../models/user")
const jwt = require('jsonwebtoken')
const audioModel = require("../models/audio")
const mongoose = require("mongoose")


exports.emailCheckerController = async (req , res) => {
    try {
        const user = await userModel.find({email : req.params.email}).exec()

        if(user && user.length > 0) {
            return res.status(405).send({message : "User Already Register"});
        } else {
            return res.status(200).send({message : "Proceed"});
        }

    } catch (error) {
        // Capture Logs Here
        res.status(401).send({message : "Something went Wrong", data : []})
    }
}

exports.register = async (req , res) => {
    try {
        const {email , password} = req.body

        if(!email || !password) {
            return res.status(401).send({message : "Some Fields are missing", data : []});
        }

        const registerUser = await new userModel(req.body).save()

        return res.status(200).send({message : "Created Successfully", data : registerUser});

    } catch (error) {
        // Capture Logs Here
        res.status(401).send({message : "Something went Wrong", data : []})
    }
}

exports.loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
  
        const user = await userModel.findOne({ email : email });
      
      
        if (user && (await user.matchPassword(password))) {

        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET)
            
          const response = {
            _id: user._id,
            full_name: user.full_name,
            email: user.email,
            token: token,
          };
          return res.status(200).send({message : "login", data : response});
        } else {
            // Capture Logs Here
            res.status(401).send({message : "Incorrect Password", data : []})
    
        }
    } catch (error) {
        console.log(error)
    }
 
  };


  exports.allUsers  = async (req , res) => {
    try {

        const pipeline = [
            {
                $match : {
                    _id : {$ne : req.user._id}
                }
            },
            {
                $project : {
                    full_name : 1
                }
            }
        ]


        const allUsers = await userModel.aggregate(pipeline)

        return res.status(200).send({message : "login", data : allUsers});

    } catch (error) {
        res.status(401).send({message : "Unable to Find all users", data : []})
    }
  }


  exports.getUserAudio = async (req , res) => {
        try {
            const pipeline = [
                {
                    $match : {
                        userId : new mongoose.Types.ObjectId(req.user._id)
                    }
                }, 
                {
                    $sort : { createdAt : -1 }
                }
            ]

            const AllAudio = await audioModel.aggregate(pipeline)
            return res.status(200).send({message : "All Audio", data : AllAudio});


        } catch (error) {
            console.log(error.message, "Message")
            res.status(401).send({message : "Unable to find users Audio", data : []})

        }
  }