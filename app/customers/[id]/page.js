'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';

export default function CustomerDetail() {
    const { id } = useParams();  // Get the customer ID from URL
    const [customer, setCustomer] = useState(null);
    const router = useRouter();

    useEffect(() => {
        async function fetchCustomer() {
            const res = await fetch(`/api/customers/${id}`);
            if (res.ok) {
                const data = await res.json();
                setCustomer(data.data);
            } else {
                console.error('Failed to fetch customer');
            }
        }
        fetchCustomer();
    }, [id]);

    if (!customer) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Customer Details</h2>
            <p><strong>Name:</strong> {customer.name}</p>
            <p><strong>Date of Birth:</strong> {new Date(customer.dateOfBirth).toLocaleDateString()}</p>
            <p><strong>Member Number:</strong> {customer.memberNumber}</p>
            <p><strong>Interests:</strong> {customer.interests}</p>

            <button onClick={() => router.push('/customers')}>Back to Customers</button>
        </div>
    );
}
