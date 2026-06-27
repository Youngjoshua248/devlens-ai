import { Router } from "express";
import authRoutes from "./auth.routes";
import repositoryRoutes from "./repository.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/repositories", repositoryRoutes);

export default router;
