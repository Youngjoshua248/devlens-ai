import { Router } from "express";
import {
  createRepository,
  getRepositories,
  scanLocalRepository,
  summarizeLocalRepository,
} from "../controllers/repository.controller";

const router = Router();

router.get("/scan-local", scanLocalRepository);
router.get("/summary-local", summarizeLocalRepository);
router.get("/", getRepositories);
router.post("/", createRepository);

export default router;
