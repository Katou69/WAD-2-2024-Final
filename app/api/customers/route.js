import dbConnect from '../../../lib/db';
import Customer from '../../../models/Customer';
import { NextResponse } from 'next/server';

// GET: Fetch all customers
export async function GET() {
    await dbConnect();
    try {
        const customers = await Customer.find();
        return NextResponse.json({ data: customers }, { status: 200 });
    } catch (error) {
        console.error('Error fetching customers:', error);
        return NextResponse.json({ error: 'Failed to fetch customers' }, { status: 500 });
    }
}

// POST: Add a new customer
export async function POST(req) {
    await dbConnect();
    try {
        const { name, dateOfBirth, memberNumber, interests } = await req.json();
        const newCustomer = new Customer({ name, dateOfBirth, memberNumber, interests });
        await newCustomer.save();
        return NextResponse.json({ data: newCustomer }, { status: 201 });
    } catch (error) {
        console.error('Error adding customer:', error);
        return NextResponse.json({ error: 'Failed to add customer' }, { status: 500 });
    }
}
