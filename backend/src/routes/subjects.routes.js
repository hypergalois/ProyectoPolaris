import { Router } from "express";
import { getSubjects, getSubjectsByDegree} from "../controllers/subjects.controllers.js";

const router = Router();

router.get("/subjects", getSubjects);

router.get("/subjects/:degreeId", getSubjectsByDegree);

export default router;