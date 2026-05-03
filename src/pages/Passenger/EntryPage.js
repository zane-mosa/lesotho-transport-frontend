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

        console.log('QR Scan - Taxi:', taxiNumber, 'Driver:', driverId);

        // Store in localStorage for after login
        if (taxiNumber) {
            localStorage.setItem('scanTaxiNumber', taxiNumber);
            localStorage.setItem('scanDriverId', driverId || '');
        }

        // Check if user is logged in
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');

        if (token && user) {
            // Already logged in, go to passenger dashboard
            navigate('/passenger');
        } else {
            // Not logged in, go to login page
            navigate('/login');
        }
    }, [location, navigate]);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <h3>Redirecting to payment...</h3>
        </div>
    );
}

export default PassengerEntryPage;