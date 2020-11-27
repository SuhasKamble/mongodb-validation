const mongoose = require('mongoose')
const { default: validator } = require('validator')
const validators = require('validator')
mongoose.connect('mongodb://localhost:27017/suhastest2',{useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{console.log("Connected Succesfully..")}).then((err)=>{console.log(err)})

const detailsSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        uppercase:true,
        trim:true,
        minlength:3,
        maxlength:50,

    },
    email:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is Invalids")
            }
        }
    },
    age:{
        type:Number,
        validate(value){
            if(value<0){
                throw new Error("Age must be 0 or greater than 0")
            }
        }
    },
    phone:{
        type:Number,
        minlength:10,
        maxlength:12
    },
    date:{
        type:Date,
        default:Date.now
    }

})

const Details  = new mongoose.model('Detail',detailsSchema)

const createDocument = async ()=>{
    try{
        const rohanDetails = new Details({
            name:"abc Kamble                ",
            email:"abckamble@gmail.com",
            age:1,
            phone:1234567890,
    
        })
        const result = await rohanDetails.save()
        console.log(result)
    }catch(err){
        console.log(err)
    }  
 
}

createDocument()