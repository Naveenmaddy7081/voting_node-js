const mongoose = require('mongoose');
const { type } = require('os');
const bcrypt = require('bcrypt');

//define persion schema
const candidateSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    party:{
        type: String,
        required: true
    },
    age:{
        type: Number,
        required: true
    },
    votes: [
        {
            user:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            voteAt:{
                type: Date,
                default: Date.now()
            }
        }
    ],
    voteCount:{
        type:Number,
        default: 0
    }
    
    
});

// create prson model
const Candidate = mongoose.model('Candidate',candidateSchema);
module.exports =Candidate;