import mongoose, { model,Schema } from "mongoose";

const userSchema = new Schema({
    firstName:String,
    lastName:String,
    userName:{type:String, required:true},
    email:{type:String, unique:true, required:true,lowercase:true},
    confirmEmail:{type:Boolean, default:false},
    password:{type:String, required:true},
    gender:{type:String, default:'male',enum:['male','female']},
    phone:String,
    age:Number,
    coverImage:[{secure_url:String,public_id:String}],
    profileImage:{secure_url:String,public_id:String},
},{timestamps: true});

const userModel= mongoose.models.User || model('User',userSchema);
export default userModel