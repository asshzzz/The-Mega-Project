import { Router } from "express";
import {registerUser} from '../controllers/user.controller.js'
import {upload} from "../middlewares/multer.middleware.js"


const router = Router();

router.route("/register").post(
    upload.fields([ // // its middleware work , upload.fields() ka use tab hota hai jab aapko multiple different fields ke andar files upload karni ho.
       {
           name: "avatar",
           maxCount:1
       },
       {
          name: "coverImage",
          maxCount: 1
       }
    ]), 
    registerUser
)

export default router