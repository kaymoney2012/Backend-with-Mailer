import { Router } from "express";
import {
  resendOTP,
  signup,
  verifyOTP,
} from "../../controller/newUserController.js";

const newUserRouter = Router();

newUserRouter.post("/signup", signup);
newUserRouter.post("/sendotp", verifyOTP);
newUserRouter.post("/resendotp", resendOTP);
// newUserRouter.post("/signin", );

export default newUserRouter;
