import {Router} from "express";
import passport from "passport";
import groupControler from "./controllerMogoose";


const groupRouter = new Router();
groupRouter.get("/", groupControler.get);
groupRouter.get("/:id", groupControler.getById);
groupRouter.post("/",  groupControler.post);
groupRouter.delete("/:id",  groupControler.delete);
// groupRouter.patch("/:id",  passport.authenticate("jwt", {session:false}), groupControler.patch);
// groupRouter.put("/", groupControler.put);
export default groupRouter;





