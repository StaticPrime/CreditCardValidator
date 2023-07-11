import express, { Application, Request, Response } from 'express'

import { SuccessResponse, ApiError, ReturnCode } from 'helpers/api-response'
import validator from 'middleware/validator'
import asyncHandler from 'middleware/async-handler'
import { CreditCardRequest } from 'schema/credit-card'
import { checkLuhn } from 'utils'

const creditCardRouter: Application = express();

creditCardRouter.post('/validate', validator((new CreditCardRequest).schema, 'body'), asyncHandler(async (req: Request, res: Response) => {
    const isValidCC = checkLuhn(req.body.cc_number)
    if (!isValidCC) throw new ApiError(ReturnCode.BAD_REQUEST, 'Invalid Credit Card Number')

    new SuccessResponse('Credit Card is Valid').send(res)
}))

export { creditCardRouter }
