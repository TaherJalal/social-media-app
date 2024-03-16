import Router from 'express'
import {register, login} from "../controller/AuthController.ts";

const router = Router()
const basePath: string = "/api/auth"

router.post(basePath + "/register", register)
router.post(basePath + "/login", login)

export default router