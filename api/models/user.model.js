import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
    username:{type:String,
    required:true,
    unique:true,
},
    email:{type:String,
    required:true,
    unique:true,
},
    password:{type:String,
    required:true,
},
    avatar:{type:String,
    default:"https://thumbs.dreamstime.com/b/handsome-real-estate-agent-holding-banner-house-sale-house-land-insurance-man-real-estate-agent-business-suit-276191193.jpg",
},
},
{timestamps:true},
);

const User=mongoose.model("User",userSchema);
export default User;