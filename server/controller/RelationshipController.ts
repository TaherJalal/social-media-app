import jwt from 'jsonwebtoken'
import {PrismaClient} from '@prisma/client'
import {type Request, type Response} from "express";

const prisma = new PrismaClient();
const secret: string = String(process.env.SECRET)

export async function follow(req: Request, res: Response): Promise<object> {
    const {userId} = req?.body
    const token = req?.header("Authorization") as string

    if (!token) {
        const payload: object = {
            error: "UnAuthorized"
        }
        return res.status(403).json(payload)
    }

    const user = jwt.verify(token, secret) as string

    if (!user) {
        const payload: object = {
            error: "UnAuthorized"
        }
        return res.status(403).json(payload)
    }

    await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            followersIds: {
                push: user
            },
            followersCount: {
                increment: 1
            }
        }
    })

    await prisma.user.update({
        where: {
            id: user
        },
        data: {
            followingIds: {
                push: userId
            },
            followingCount: {
                increment: 1
            }
        }
    })

    const payload: object = {
        message: "user followed succesfully"
    }

    return res.status(201).json(payload)
}

export async function unfollow(req: Request, res: Response): Promise<object> {
    const {userId} = req?.body
    const token = req?.header("Authorization") as string

    if (!token) {
        const payload: object = {
            error: "UnAuthorized"
        }
        return res.status(403).json(payload)
    }

    const verifyToken = jwt.verify(token, secret) as string

    if (!verifyToken) {
        const payload: object = {
            error: "UnAuthorized"
        }
        return res.status(403).json(payload)
    }

    const user = await prisma.user.findUniqueOrThrow({
        where:{
            id: verifyToken
        }
    })

    const userToBeUnfollowed = await prisma.user.findUniqueOrThrow({
        where:{
            id: userId
        }
    })

    const userFollowingIds = user.followingIds.filter(id => id !== userToBeUnfollowed.id)

    await prisma.user.update({
        where:{
            id: user.id
        },
        data:{
            followingIds: userFollowingIds,
            followingCount:{
                decrement: 1
            }
        }
    })

    const userFollowersIds = userToBeUnfollowed.followersIds.filter(id => id !== userId)

    await prisma.user.update({
        where:{
            id: userToBeUnfollowed.id
        },
        data:{
            followersIds: userFollowersIds,
            followersCount: {
                decrement: 1
            }
        }
    })


    const payload: object = {
        message: "user followed succesfully"
    }

    return res.status(201).json(payload)
}