import dbConnect from '../../../../lib/db';
import Customer from '../../../../models/Customer';
import { NextResponse } from 'next/server';

// DELETE: Delete a customer by ID
export async function DELETE(req, { params }) {
    await dbConnect();
    const { id } = params;
    try {
        const deletedCustomer = await Customer.findByIdAndDelete(id);
        if (!deletedCustomer) {
            return NextResponse.json({ message: 'Customer not found' }, { status: 404 });
        }
        return NextResponse.json({ message: 'Customer deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error deleting customer:', error);
        return NextResponse.json({ error: 'Failed to delete customer' }, { status: 500 });
    }
}

// PUT: Update an existing customer by ID
export async function PUT(req, { params }) {
    await dbConnect();
    const { id } = params;
    try {
        const { name, dateOfBirth, memberNumber, interests } = await req.json();
        const updatedCustomer = await Customer.findByIdAndUpdate(id, { name, dateOfBirth, memberNumber, interests }, { new: true });
        if (!updatedCustomer) {
            return NextResponse.json({ message: 'Customer not found' }, { status: 404 });
        }
        return NextResponse.json({ data: updatedCustomer }, { status: 200 });
    } catch (error) {
        console.error('Error updating customer:', error);
        return NextResponse.json({ error: 'Failed to update customer' }, { status: 500 });
    }
}

export async function GET(req, { params }) {
    await dbConnect();
    const { id } = params;

    try {
        const customer = await Customer.findById(id);
        if (!customer) {
            return NextResponse.json({ message: 'Customer not found' }, { status: 404 });
        }
        return NextResponse.json({ data: customer }, { status: 200 });
    } catch (error) {
        console.error('Error fetching customer:', error);
        return NextResponse.json({ error: 'Failed to fetch customer' }, { status: 500 });
    }
}