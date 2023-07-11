import React, { useState } from 'react'
import { TextField, Button } from '@mui/material'

import 'css/CardStyles.css'
import SnackbarMessage from 'componenets/Snackbar'
import { validateCreditCard } from 'helpers/api-helper'

const CreditCardForm = () => {
    const [messageSeverity, setMessageSeverity] = useState('')
    const [message, setMessage] = useState('')
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [ccNumber, setCardNumber] = useState('')

    const handleCloseSnackbar = (event: any, reason: string) => {
        if (reason === 'clickaway') return
        setOpenSnackbar(false)
    };

    async function handleSubmit(event: any) {
        event.preventDefault()
        const response = await validateCreditCard(ccNumber)

        if (response.status < 400) {
            setMessageSeverity('success')
            setMessage('Valid Credit Card')
        } else {
            setMessageSeverity(response.status < 500 ? 'warning' : 'error')
            setMessage(String(response.data.error))
        }
        setOpenSnackbar(true)
    }

    return (
        <div>
            <div className="cardForm">
                <React.Fragment>
                    <SnackbarMessage open={openSnackbar} onClose={handleCloseSnackbar} severity={messageSeverity} message={message}></SnackbarMessage>
                    <h2>Credit Card Validator</h2>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            type="number"
                            variant='outlined'
                            color='primary'
                            label="Credit Card Number"
                            onChange={e => setCardNumber(e.target.value)}
                            value={ccNumber}
                            fullWidth
                            required
                        />
                        <Button className="Button" variant="outlined" color="primary" type="submit">Validate Credit Card</Button>
                    </form>
                </React.Fragment>
            </div>
        </div>
    )
}

export default CreditCardForm