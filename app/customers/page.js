'use client';

import { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from 'next/link';

export default function Customers() {
    const [customers, setCustomers] = useState([]);
    const [editCustomerId, setEditCustomerId] = useState(null);
    const [editedCustomer, setEditedCustomer] = useState({
        name: '',
        dateOfBirth: '',
        memberNumber: '',
        interests: '',
    });
    const [newCustomer, setNewCustomer] = useState({
        name: '',
        dateOfBirth: '',
        memberNumber: '',
        interests: '',
    });
    const [showEditModal, setShowEditModal] = useState(false);

    useEffect(() => {
        async function fetchCustomers() {
            const res = await fetch('/api/customers');
            const data = await res.json();
            setCustomers(data.data);
        }
        fetchCustomers();
    }, []);

    const handleEditClick = (customer) => {
        setEditCustomerId(customer._id);
        setEditedCustomer(customer);
        setShowEditModal(true);  // Open the modal for editing
    };

    const handleSaveEdit = async () => {
        try {
            const res = await fetch(`/api/customers/${editCustomerId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editedCustomer),
            });
    
            if (res.ok) {
                setCustomers((prevCustomers) =>
                    prevCustomers.map((customer) =>
                        customer._id === editCustomerId ? { ...customer, ...editedCustomer } : customer
                    )
                );
                setShowEditModal(false);  // Close the modal after save
                setEditCustomerId(null);
            }
        } catch (error) {
            console.error('Failed to save customer:', error);
        }
    };

    const handleAddCustomer = async () => {
        const newCustomerData = {
            name: newCustomer.name,
            dateOfBirth: newCustomer.dateOfBirth,
            memberNumber: newCustomer.memberNumber,
            interests: newCustomer.interests,
        };

        try {
            const res = await fetch('/api/customers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newCustomerData),
            });

            if (res.ok) {
                const data = await res.json();
                setCustomers([...customers, data.data]);
                clearFormFields();
            } else {
                console.error('Error adding customer:', await res.json());
            }
        } catch (error) {
            console.error('Error adding customer:', error);
        }
    };

    const handleDeleteCustomer = async (customerId) => {
        try {
            const res = await fetch(`/api/customers/${customerId}`, {
                method: 'DELETE',
            });
            if (res.ok) {
                setCustomers(customers.filter(customer => customer._id !== customerId));
            } else {
                console.error('Failed to delete customer:', await res.json());
            }
        } catch (error) {
            console.error('Error deleting customer:', error);
        }
    };

    const clearFormFields = () => {
        setNewCustomer({ name: '', dateOfBirth: '', memberNumber: '', interests: '' });
    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };

    return (
        <div className="page-container" style={{ maxWidth: '80%', margin: '0 auto' }}>
            <h2>Customers</h2>
            
            {/* Add New Customer Form */}
            <div className="add-customer-form" style={{ maxWidth: '50%', margin: '0 auto' }}>
                <h3>Add New Customer</h3>
                <TextField
                    fullWidth
                    margin="normal"
                    label="Name"
                    value={newCustomer.name}
                    onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Date of Birth"
                    type="date"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={newCustomer.dateOfBirth}
                    onChange={(e) => setNewCustomer({ ...newCustomer, dateOfBirth: e.target.value })}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Member Number"
                    value={newCustomer.memberNumber}
                    onChange={(e) => setNewCustomer({ ...newCustomer, memberNumber: e.target.value })}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Interests"
                    value={newCustomer.interests}
                    onChange={(e) => setNewCustomer({ ...newCustomer, interests: e.target.value })}
                />
                <Button variant="contained" onClick={handleAddCustomer}>Add Customer</Button>
            </div>

            {/* List of Customers in Table */}
            <div className="customer-list">
                <h3>Customer List</h3>
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
                                    <Link href={`/customers/${customer._id}`}>{customer.name}</Link>
                                </td>
                                <td>{new Date(customer.dateOfBirth).toLocaleDateString('en-GB')}</td>
                                <td>{customer.memberNumber}</td>
                                <td>{customer.interests}</td>
                                <td>
                                    <button onClick={() => handleEditClick(customer)}>Edit</button>
                                    <button onClick={() => handleDeleteCustomer(customer._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Edit Customer Modal */}
            <Modal
                open={showEditModal}
                onClose={() => setShowEditModal(false)}
                aria-labelledby="edit-customer-modal"
                aria-describedby="edit-customer-form"
            >
                <Box sx={style}>
                    <h2>Edit Customer</h2>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Name"
                        value={editedCustomer.name}
                        onChange={(e) => setEditedCustomer({ ...editedCustomer, name: e.target.value })}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Date of Birth"
                        type="date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={editedCustomer.dateOfBirth}
                        onChange={(e) => setEditedCustomer({ ...editedCustomer, dateOfBirth: e.target.value })}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Member Number"
                        value={editedCustomer.memberNumber}
                        onChange={(e) => setEditedCustomer({ ...editedCustomer, memberNumber: e.target.value })}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Interests"
                        value={editedCustomer.interests}
                        onChange={(e) => setEditedCustomer({ ...editedCustomer, interests: e.target.value })}
                    />
                    <Button variant="contained" onClick={handleSaveEdit}>Save Changes</Button>
                    <Button variant="outlined" onClick={() => setShowEditModal(false)}>Cancel</Button>
                </Box>
            </Modal>
        </div>
    );
}
