import Joi from 'joi'
import { Request, Response, NextFunction } from 'express'

import { logger } from 'helpers/logger'
import { ApiError, ReturnCode } from 'helpers/api-response'

export const JoiUrlEndpoint = () => Joi.string().custom((value: string, helpers) => {
    if (value.includes('://')) return helpers.error('any.invalid')

    return value
}, 'Url Endpoint Validation')

export default (schema: Joi.AnySchema, source: string) => (req: Request, res: Response, next: NextFunction) => {
    try {
        const { error } = schema.validate(req[source])

        if (!error) return next()

        const { details } = error
        const message = details.map((i) => i.message.replace(/['"]+/g, '')).join(',')

        next(new ApiError(ReturnCode.BAD_REQUEST, message))
    } catch (ex) {
        logger.error(`Error in Validator: ${ex}`)
        next(new ApiError(ReturnCode.INTERNAL_ERROR, 'System Error'))
    }
}