import { NextResponse } from 'next/server';
import { db } from '@/db';
import { claims } from '@/db/schema';
import { v4 as uuidv4 } from 'uuid';
import { calculateCompensation } from '@/lib/eu261';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { airline, flightNumber, date, departure, arrival, delayReason, delayHours, distanceKm, email } = body;

    const compensation = calculateCompensation(distanceKm, delayHours);

    if (compensation === 0) {
      return NextResponse.json({ error: 'Not eligible for compensation based on EU261 rules.' }, { status: 400 });
    }

    const id = uuidv4();

    await db.insert(claims).values({
      id,
      airline,
      flightNumber,
      date,
      departure,
      arrival,
      delayReason,
      delayHours,
      distanceKm,
      compensationAmount: compensation,
      email,
      createdAt: new Date(),
    });

    return NextResponse.json({ id, compensationAmount: compensation });
  } catch (error) {
    console.error('Error creating claim:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
