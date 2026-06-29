import { Router } from "express";
import {
  createRepository,
  getRepositories,
  scanLocalRepository,
} from "../controllers/repository.controller";

const router = Router();

router.get("/scan-local", scanLocalRepository);
router.get("/", getRepositories);
router.post("/", createRepository);

export default router;
