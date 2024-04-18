const mongoose = require('mongoose');
const { type } = require('os');
const bcrypt = require('bcrypt');

//define persion schema
const userSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type: Number,
        required: true
    },
    email:{
        type: String
    },
    address:{
        type: String,
        required:true
    },
    aadharCardNumber:{
        type:Number,
        required: true,
        unqiue: true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: String,
        enum: ['voter', 'admin'],
        default: 'voter'
    },
    isVoted:{
        type: Boolean,
        default: false
    }

    
});

userSchema.pre('save', async function(next){
    const person = this;

    //hash the password
    if(!person.isModified('password')) return next();

    try{
        // hash pass genertr
        const salt = await bcrypt.genSalt(10);

        //hash passwd
        const hashedPassword = await bcrypt.hash(person.password, salt);

        // overide the plain pssd
        person.password = hashedPassword;


        next();
    }catch(err){
        return next(err);

    }
})

userSchema.methods.comparePassword = async function(candidatePassword){
    try{
        // use bcrypt compre
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;

    }catch(err){
        throw err;
    }
}

// create prson model
const User = mongoose.model('User',userSchema);
module.exports =User;