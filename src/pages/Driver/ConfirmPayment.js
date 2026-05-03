// src/pages/Driver/ConfirmPayment.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { driverService } from '../../services/api';
import { Container, Paper, Typography, Box, Button, Alert, CircularProgress } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import api from '../../services/api';

function ConfirmPayment() {
    const { reference } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [transaction, setTransaction] = useState(null);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        const checkTransaction = async () => {
            try {
                // Fetch transaction details using api instance
                const response = await api.get(`/payments/status/${reference}`);
                setTransaction(response.data.transaction);
                setLoading(false);
            } catch (error) {
                console.error('Failed to load transaction:', error);
                setMessage({ type: 'error', text: 'Failed to load transaction' });
                setLoading(false);
            }
        };
        
        checkTransaction();
    }, [reference]);

    const confirmPayment = async () => {
        try {
            await driverService.verifyPayment(JSON.stringify({ reference }));
            setMessage({ type: 'success', text: '✅ Payment confirmed! Passenger can board.' });
            setTimeout(() => navigate('/driver'), 2000);
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to confirm payment' });
        }
    };

    if (loading) return <CircularProgress />;

    return (
        <Container maxWidth="sm">
            <Box sx={{ py: 4 }}>
                <Paper sx={{ p: 4, textAlign: 'center' }}>
                    <CheckCircleIcon sx={{ fontSize: 60, color: '#2E7D32', mb: 2 }} />
                    <Typography variant="h5" gutterBottom>
                        Confirm Payment
                    </Typography>
                    {transaction && (
                        <>
                            <Typography variant="body1">
                                Amount: <strong>M{transaction.amount}</strong>
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Reference: {transaction.reference}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Trip Type: {transaction.trip_type}
                            </Typography>
                        </>
                    )}
                    {message && (
                        <Alert severity={message.type} sx={{ mt: 2 }}>
                            {message.text}
                        </Alert>
                    )}
                    <Button
                        fullWidth
                        variant="contained"
                        onClick={confirmPayment}
                        sx={{ mt: 3 }}
                    >
                        Confirm Payment
                    </Button>
                </Paper>
            </Box>
        </Container>
    );
}

export default ConfirmPayment;