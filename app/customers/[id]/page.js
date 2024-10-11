'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';

export default function CustomerDetails({ params }) {
    const router = useRouter();
    const [customer, setCustomer] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCustomer() {
            try {
                const res = await fetch(`/api/customers/${params.id}`);
                if (res.ok) {
                    const data = await res.json();
                    setCustomer(data.data);
                } else {
                    console.error('Failed to fetch customer details');
                }
            } catch (error) {
                console.error('Error fetching customer:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchCustomer();
    }, [params.id]);

    if (loading) {
        return <CircularProgress />;
    }

    if (!customer) {
        return <Typography variant="h5" color="error">Customer not found!</Typography>;
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '80vh',
                padding: '20px'
            }}
        >
            <Typography variant="h3" gutterBottom align="center" sx={{ marginBottom: '20px' }}>
                Customer Details
            </Typography>

            <Card sx={{ maxWidth: 600, width: '100%', padding: 3, boxShadow: 3 }}>
                <CardContent>
                    <Typography variant="h4" gutterBottom>
                        {customer.name}
                    </Typography>
                    <Typography variant="body1" color="textSecondary" gutterBottom>
                        <strong>Member Number:</strong> {customer.memberNumber}
                    </Typography>
                    <Typography variant="body1" color="textSecondary" gutterBottom>
                        <strong>Date of Birth:</strong> {new Date(customer.dateOfBirth).toLocaleDateString('en-GB')}
                    </Typography>
                    <Typography variant="body1" color="textSecondary" gutterBottom>
                        <strong>Interests:</strong> {customer.interests}
                    </Typography>
                </CardContent>
                <Box display="flex" justifyContent="space-between" mt={2}>
                    <Button variant="contained" color="primary" onClick={() => router.push('/customers')}>
                        Back to Customers
                    </Button>
                </Box>
            </Card>
        </Box>
    );
}
