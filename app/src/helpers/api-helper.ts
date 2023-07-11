import axios from 'axios'

interface ReturnData {
    data: {
        message?: string
        error?: string
    },
    status: number
}

const NetworkError: ReturnData = {
    data: {
        error: 'Network Error'
    },
    status: 500
}

export const validateCreditCard = async (ccNumber: string): Promise<ReturnData> => {
    return await axios.post(`${process.env.REACT_APP_API}`, { cc_number: ccNumber }).then((response) => {
        return response
    }).catch((ex) => {
        if (ex.response) return ex.response
        return NetworkError
    })
}