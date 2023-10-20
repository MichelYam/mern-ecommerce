import { NextFunction, Request, Response } from "express"

import jwt from 'jsonwebtoken'

const auth = (req: any, res: Response, next: NextFunction) => {
    let response = {}

    try {
        if (!req.headers.authorization) {
            throw new Error('Token is missing from header')
        }
        // console.log(req.headers)
        const userToken = req.headers.authorization.split(' ')[1].trim()
        const decodedToken = jwt.verify(
            userToken,
            process.env.JWT_SECRET || 'default-secret-key'
        )

        req.user = decodedToken
        return next()
    } catch (error: any) {
        console.error('Error in tokenValidation.js', error)
        // res.status = 401
        // res.message = error.message
        res.status(401).json({ results: error.message })
    }
}
export default auth