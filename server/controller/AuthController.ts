import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import {type Request, type Response} from "express";
import {PrismaClient} from '@prisma/client'
import * as Joi from "joi";

const prisma = new PrismaClient()
const salt: number = Number(process.env.SALT)
const secret: string = String(process.env.SECRET)

export async function register(req: Request, res: Response): Promise<object> {
    const {username, email, password, firstname, lastname} = req?.body

    const userSchema = Joi.object({
        username: Joi.string()
            .min(3)
            .max(30)
            .alphanum()
            .required(),

        password: Joi.string()
            .min(8)
            .max(16),

        email: Joi.string()
            .email(),

        firstname: Joi.string()
            .min(3)
            .max(30),

        lastname: Joi.string()
            .min(3)
            .max(30)
    })
    const {error} = await userSchema.validate(req.body)

    if (error) {
        return res.status(400).json(error.details[0].message)
    }

    const user = await prisma.user.create({
        data: {
            username,
            email,
            password: bcrypt.hashSync(password, salt),
            firstname,
            lastname,
            followingCount: 0,
            followersCount: 0
        },
    })

    const payload = {
        token: jwt.sign(user.id, secret)
    }

    return res.status(201).json(payload)
}

export async function login(req: Request, res: Response): Promise<object> {
    const {username, email, password, firstname, lastname} = req?.body

    const userSchema = Joi.object({
        username: Joi.string()
            .min(3)
            .max(30)
            .alphanum()
            .required(),

        password: Joi.string()
            .min(8)
            .max(16),

        email: Joi.string()
            .email(),

        firstname: Joi.string()
            .min(3)
            .max(30),

        lastname: Joi.string()
            .min(3)
            .max(30)
    })
    const {error} = await userSchema.validate(req.body)

    if (error) {
        return res.status(400).json(error.details[0].message)
    }

    const user = await prisma.user.findUnique({
        where: {
            username
        }
    })

    if (!user) {
        const errorPayload = {
            error: "user does not exist"
        }

        return res.status(400).json(errorPayload)
    }

    if (!bcrypt.compare(user?.password, password)) {

        const errorPayload = {
            error: "password is wrong"
        }

        return res.status(400).json(errorPayload)
    }

    const payload = {
        token: jwt.sign(user.id, secret)
    }

    return res.status(200).json(payload)

}
