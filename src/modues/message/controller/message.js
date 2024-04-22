import messageModel from "../../../../DB/model/messageModel.js"
import userModel from "../../../../DB/model/userModel.js"


export const messages =async (req,res,next)=>{
    const message =await messageModel.find({recieverId:req.user._id})
    return res.json({message:'Done',message})
}


export const sendMessages = async (req, res, next) => {
    const { recieverId } = req.params;
    const { message } = req.body;

    if (!recieverId) {
        return next(new Error('Receiver ID is missing', { cause: 400 }));
  }
    const user = await userModel.findById(recieverId);
    if (!user) {
         return next(new Error('User Not Found', { cause: 404 }));
    }
    const createMsg = await messageModel.create({
      recieverId: user._id,
      message,
    });
        return res.status(201).json({ message: 'Done', createMsg });
  };

  export const deleteMessage = async (req,res,next)=>{
    const {id} = req.params;
    console.log({recieverId:req.user._id});
    const message = await messageModel.deleteOne({_id:id,recieverId:req.user._id})
    
    return message  ? res.status(200).json({ message: 'Done'}) 
                    : next(new Error('In-Valid Message Id', { cause: 404 }));

  }