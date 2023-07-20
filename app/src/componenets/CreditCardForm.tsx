import React, { useState } from 'react'
import { TextField, Button, Box, Typography, Container, createTheme, ThemeProvider, CssBaseline} from '@mui/material'

import SnackbarMessage from 'componenets/Snackbar'
import { validateCreditCard } from 'helpers/api-helper'

const CreditCardForm = () => {
    const defaultTheme = createTheme();
    const [messageSeverity, setMessageSeverity] = useState('')
    const [message, setMessage] = useState('')
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleCloseSnackbar = (event: any, reason: string) => {
        if (reason === 'clickaway') return
        setOpenSnackbar(false)
    };

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const data = new FormData(event.currentTarget);
        const cnum = data.get('ccNumber')
        const response = await validateCreditCard(String(cnum))

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
        <ThemeProvider theme={defaultTheme}>
            <SnackbarMessage open={openSnackbar} onClose={handleCloseSnackbar} severity={messageSeverity} message={message}></SnackbarMessage>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Credit Card Validator
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            type="number"
                            required
                            fullWidth
                            id="ccNumber"
                            label="Credit Card Number"
                            name="ccNumber"
                            autoFocus
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Validate Card
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}

export default CreditCardForm