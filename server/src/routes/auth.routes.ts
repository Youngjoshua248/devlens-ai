import { Router } from "express";
import { register } from "../controllers/auth.controller";

const router = Router();

router.get("/", (_req, res) => {
  res.json({
    message: "Auth route is working",
  });
});

router.post("/register", register);

export default router;
