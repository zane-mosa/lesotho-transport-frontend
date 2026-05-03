// src/pages/Passenger/EntryPage.js
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function PassengerEntryPage() {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Get taxi number from URL params
        const params = new URLSearchParams(location.search);
        const taxiNumber = params.get('taxi');
        const driverId = params.get('driver');

        console.log('QR Scan - Saving Taxi:', taxiNumber);

        // Store in localStorage for after login
        if (taxiNumber) {
            localStorage.setItem('scanTaxiNumber', taxiNumber);
            if (driverId) {
                localStorage.setItem('scanDriverId', driverId);
            }
        }

        // Check if user is logged in
        const token = localStorage.getItem('token');
        const userStr = localStorage.getItem('user');

        if (token && userStr) {
            try {
                const user = JSON.parse(userStr);
                if (user.role === 'passenger') {
                    navigate('/passenger');
                    return;
                }
            } catch (e) {}
        }
        
        navigate('/login');
    }, [location, navigate]);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <h3>Redirecting to payment...</h3>
        </div>
    );
}

export default PassengerEntryPage;