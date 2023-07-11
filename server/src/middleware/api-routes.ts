import { Application, Request, Response } from 'express'

import { ApiError, ReturnCode } from 'helpers/api-response'
import { creditCardRouter } from 'routes/credit-card'

export default (app: Application) => {
    app.use('/', creditCardRouter)
    
    // Set the invalid route
    app.use('*', (req: Request, res: Response) => {
        throw new ApiError(ReturnCode.NOT_FOUND, 'Not Found')
    })
}