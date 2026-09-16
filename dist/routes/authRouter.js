import { Router } from "express";
import { getUser, login, register } from "../controller/authController.js";
import { authMiddleware } from "../middleware/middleware.js";
const authRouter = Router();
authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/profile", authMiddleware, getUser);
export default authRouter;
//# sourceMappingURL=authRouter.js.map