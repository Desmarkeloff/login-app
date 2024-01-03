import express from "express";
import { loginUser, revalidarJWT } from "../controllers/auth.js";
import { validarJWT } from "../middlewares/validarJWT.js";

const router = express.Router();

//LOGIN
router.post('/', loginUser);

router.get('/renew', validarJWT, revalidarJWT);

export default router;
