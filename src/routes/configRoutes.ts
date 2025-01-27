import { Router } from "express";
import { createConfig } from "../controllers/createConfigController";
import { getConfig } from "../controllers/getConfigController";
import { deleteConfig } from "../controllers/deleteConfigController";
import { getAllConfigs } from "../controllers/getAllConfigsController";
import { ping } from "../controllers/pingController";
import { updateConfig } from "../controllers/updateConfigController";

const router = Router();

router.get("/ping", ping);
router.get("/configs", getAllConfigs);
router.get("/config/:sequenceNo", getConfig);
router.post("/config", createConfig);
router.put("/config/:sequenceNo", updateConfig);
router.delete("/config/:sequenceNo", deleteConfig);

export default router;
