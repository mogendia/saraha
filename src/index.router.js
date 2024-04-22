
import connectDB from '../DB/connection.js';
import userRouter from './modues/user/user.router.js';
import authRouter from './modues/auth/auth.router.js';
import messageRouter from './modues/message/message.router.js';
import { globalErrorHandling } from './utils/errorHandling.js';
import cors from 'cors'


const initApp = (app , express)=>{

    app.use(cors())
    app.use(express.json())

    app.get(`/`, (req,res,next) => {
        return res.status(200).json({message:'Welcome To SARAHA App'})
       });


    app.use('/user',userRouter)
    app.use('/auth',authRouter)
    app.use('/message',messageRouter)
    

    app.all("*", (req, res, next) => {
        res.status(404).send("In-valid Routing Plz check url  or  method ");
      });
      
    app.use(globalErrorHandling);
    connectDB()
}
export default initApp; 