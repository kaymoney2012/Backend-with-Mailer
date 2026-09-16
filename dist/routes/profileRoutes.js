import { Router } from "express";
import { createUser, getUsers } from "../controller/profileController.js";
const profileRouter = Router();
profileRouter.post("/create", createUser);
profileRouter.get("/getall", getUsers);
export default profileRouter;
//# sourceMappingURL=profileRoutes.js.map