import mongoose, { Model } from "mongoose";

const InviteSchema = new mongoose.Schema({
 toke:{
 type:String,
required: true,
        uniqe:true
    },
   email:{
   type:String,
   required:true,
   uniqe:true,
},
role:{
    type:String,
    required:true,
},
    ProjectId:{
     type: String,
     required:true
} ,
    InvitedBy:{
        type:String,
        require:true,
    },
expireAt:{
        type:Number,
        required:true,
    },
    used:{
    type:Boolean,
    default: false,
  enum:fasle| true
}

})

const InviteToeknSchema = mongoose.model("InviteToekn", InviteSchema)

export default InviteToeknSchema
