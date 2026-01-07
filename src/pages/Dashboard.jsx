import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// This file is deprecated but kept to prevent import errors if cached.
// It redirects to the new index route.
export default function Dashboard() {
    const navigate = useNavigate();
    useEffect(() => {
        navigate('/');
    }, []);
    return null;
}
