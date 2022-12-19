const mongoose=require("mongoose");

mongoose.connect(`mongodb+srv://kush_yashsingh:8887810076@cluster0.nkofpbx.mongodb.net/test`,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("connection is successful");
}).catch((e)=>{
    console.log(e);
    console.log("no connection");
})