const mongoose=require("mongoose");
const jwt=require("jsonwebtoken");

var userSchema= new mongoose.Schema({

    name: {
      type:  String,
    },
    profile:{
       type: String,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    userName:{
        type:String,
        required:true,

    },
    pictureURL:{
        type:String,
        required:true,
        unique:true
    },
    branch:{
        type:String,
        required:true
    },
    year:{
        type:String,
        required:true
    },
    student_number:{
        type:String,
        required:true
    },
    student_roll:{
        type:String,
        required:true
    },
    question:{
        type:String
    },
    payment_status:{
        type:Boolean,
        default:false,
    },
    order_id:{
        type:String,
        default:"NULL"
    },
    payment_id:{
        type:String,
        default:"NULL",
    }
})

userSchema.methods.generateAuthtoken=async function(){
    try {
        console.log(this.email);
        const token=jwt.sign({email:this.email.toString()},"mynameisprakhar");
        return token;
        
    } catch (error) {
        console.log(error);
    }
}



var Register=mongoose.model("USER",userSchema);

var user = new Register()

user.save(function(){})

module.exports=Register;