import { NextFunction, Request, Response } from "express"
import { z } from "zod";

export const validateRequest = (zodSchema: z.ZodTypeAny) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        req.body = await zodSchema.parseAsync(req.body)
        next()
    } catch (error) {
        next(error)
    }
}