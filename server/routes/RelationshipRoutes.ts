import Router from 'express'
import {follow, unfollow} from "../controller/RelationshipController.ts";

const router = Router()
const basePath: string = "/api/relationship"

router.post(basePath + "/follow", follow)
router.post(basePath + "/unfollow", unfollow)

export default router