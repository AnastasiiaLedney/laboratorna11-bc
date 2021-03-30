import {Router} from "express";
import groupRouter from "./group";

const apiRouter = new Router();

apiRouter.use("/group", groupRouter);

export default apiRouter;
