import Joi from 'joi'

// American Express is 15 digits, Visa & MC are 16, Discover is 17
class CreditCardRequest {
    public schema = Joi.object().keys({
        cc_number: Joi.string().min(15).max(17).required()
    })
}

export { CreditCardRequest }