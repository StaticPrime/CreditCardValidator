import { forwardRef } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

interface SnackbarProps {
    open: boolean,
    onClose: any,
    severity: any,
    message: string
}

const SnackbarMessage = (props: SnackbarProps) => {
    return (
        <>
            <Snackbar open={props.open} autoHideDuration={6000} onClose={props.onClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Alert onClose={props.onClose} severity={props.severity} sx={{ width: '100%' }}>
                    {props.message}
                </Alert>
            </Snackbar>
        </>
    )
}

export default SnackbarMessage