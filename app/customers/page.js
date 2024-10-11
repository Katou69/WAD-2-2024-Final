'use client';

import { useState, useEffect } from 'react';

export default function Customers() {
    const [customers, setCustomers] = useState([]);
    const [newCustomer, setNewCustomer] = useState({
        name: '',
        dateOfBirth: '',
        memberNumber: '',
        interests: '',
    });
    const [editCustomer, setEditCustomer] = useState(null);

    useEffect(() => {
        async function fetchCustomers() {
            const res = await fetch('/api/customers');
            const data = await res.json();
            setCustomers(data.data);
        }
        fetchCustomers();
    }, []);

    // Add a new customer
    const handleAddCustomer = async () => {
        try {
            const res = await fetch('/api/customers', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newCustomer),
            });

            if (res.ok) {
                const data = await res.json();
                setCustomers([...customers, data.data]);
                setNewCustomer({ name: '', dateOfBirth: '', memberNumber: '', interests: '' });
            }
        } catch (error) {
            console.error('Error adding customer:', error);
        }
    };

    // Delete a customer
    const handleDeleteCustomer = async (id) => {
        try {
            const res = await fetch(`/api/customers/${id}`, { method: 'DELETE' });
            if (res.ok) {
                setCustomers(customers.filter((customer) => customer._id !== id));
            }
        } catch (error) {
            console.error('Error deleting customer:', error);
        }
    };

    // Update a customer
    const handleUpdateCustomer = async () => {
        try {
            const res = await fetch(`/api/customers/${editCustomer._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editCustomer),
            });

            if (res.ok) {
                const updatedCustomer = await res.json();
                setCustomers(customers.map((customer) => (customer._id === editCustomer._id ? updatedCustomer.data : customer)));
                setEditCustomer(null);
            }
        } catch (error) {
            console.error('Error updating customer:', error);
        }
    };

    return (
        <div>
            <h2>Customer List</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Date of Birth</th>
                        <th>Member Number</th>
                        <th>Interests</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((customer) => (
                        <tr key={customer._id}>
                            <td>
                                <a href={`/customers/${customer._id}`}>{customer.name}</a>  {/* Link to detail page */}
                            </td>
                            <td>{new Date(customer.dateOfBirth).toLocaleDateString()}</td>
                            <td>{customer.memberNumber}</td>
                            <td>{customer.interests}</td>
                            <td>
                                <button onClick={() => setEditCustomer(customer)}>Edit</button>
                                <button onClick={() => handleDeleteCustomer(customer._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Add Customer */}
            <h2>Add New Customer</h2>
            <input
                type="text"
                value={newCustomer.name}
                onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                placeholder="Name"
            />
            <input
                type="date"
                value={newCustomer.dateOfBirth}
                onChange={(e) => setNewCustomer({ ...newCustomer, dateOfBirth: e.target.value })}
                placeholder="Date of Birth"
            />
            <input
                type="number"
                value={newCustomer.memberNumber}
                onChange={(e) => setNewCustomer({ ...newCustomer, memberNumber: e.target.value })}
                placeholder="Member Number"
            />
            <input
                type="text"
                value={newCustomer.interests}
                onChange={(e) => setNewCustomer({ ...newCustomer, interests: e.target.value })}
                placeholder="Interests"
            />
            <button onClick={handleAddCustomer}>Add Customer</button>

            {/* Edit Customer */}
            {editCustomer && (
                <div>
                    <h2>Edit Customer</h2>
                    <input
                        type="text"
                        value={editCustomer.name}
                        onChange={(e) => setEditCustomer({ ...editCustomer, name: e.target.value })}
                        placeholder="Name"
                    />
                    <input
                        type="date"
                        value={editCustomer.dateOfBirth}
                        onChange={(e) => setEditCustomer({ ...editCustomer, dateOfBirth: e.target.value })}
                        placeholder="Date of Birth"
                    />
                    <input
                        type="number"
                        value={editCustomer.memberNumber}
                        onChange={(e) => setEditCustomer({ ...editCustomer, memberNumber: e.target.value })}
                        placeholder="Member Number"
                    />
                    <input
                        type="text"
                        value={editCustomer.interests}
                        onChange={(e) => setEditCustomer({ ...editCustomer, interests: e.target.value })}
                        placeholder="Interests"
                    />
                    <button onClick={handleUpdateCustomer}>Update Customer</button>
                    <button onClick={() => setEditCustomer(null)}>Cancel</button>
                </div>
            )}
        </div>
    );
}
