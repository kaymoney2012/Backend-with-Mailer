import Router from "express";
import { validateEmail, validatePassword, validateSignup } from "../middleware/validation.middleware.js";
import { signin, signup, verifyUser } from "../controller/user.controller.js";
import { validateHeaderValue } from "http";
const userRouter = Router();
// signup
userRouter.post("/signup", validateSignup, signup);
// verify user
userRouter.post("/verify", validateEmail, verifyUser);
// signin
userRouter.post("/signin", validateEmail, validatePassword, signin);
export default userRouter;
//# sourceMappingURL=user.routes.js.map