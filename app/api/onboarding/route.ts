import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Onboarding from '@/models/Onboarding';

export async function GET() {
  try {
    await connectDB();
    const items = await Onboarding.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, items });
  } catch (e: any) {
    return NextResponse.json({ success: false, message: e?.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const doc = await Onboarding.create(body);
    return NextResponse.json({ success: true, data: doc }, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ success: false, message: e?.message }, { status: 500 });
  }
}
