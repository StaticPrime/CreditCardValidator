import { logger } from "helpers/logger"

export const checkLuhn = (cardNumber: string): boolean => {
    try {
        const len = cardNumber.length
        const parity = len % 2
        let sum = 0
    
        for (var i = len - 1; i >= 0; i--) {
            var d = parseInt(cardNumber.charAt(i))
            if (i % 2 == parity) d *= 2
            if (d > 9) d -= 9
            sum += d
        }
        return sum % 10 === 0
    } catch (ex) {
        logger.error(`There was an error Validating Credit Card Number ${cardNumber} using Luhn Method: ${ex.message}`, ex)
        return false
    }
}