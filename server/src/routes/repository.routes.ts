import { Router } from "express";
import {
  createRepository,
  getRepositories,
} from "../controllers/repository.controller";

const router = Router();

router.get("/", getRepositories);
router.post("/", createRepository);

export default router;
