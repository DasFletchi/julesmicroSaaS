import { NextResponse } from 'next/server';
import { db } from '@/db';
import { claims } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { generateLegalLetter } from '@/lib/eu261';

// Provide generic type to avoid un-awaited params warning
export async function GET(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const params = await context.params;
    const claimResult = await db.select().from(claims).where(eq(claims.id, params.id));
    if (claimResult.length === 0) {
      return NextResponse.json({ error: 'Claim not found' }, { status: 404 });
    }

    return NextResponse.json(claimResult[0]);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const params = await context.params;
    const body = await req.json();
    const { name, address } = body;

    const claimResult = await db.select().from(claims).where(eq(claims.id, params.id));
    if (claimResult.length === 0) {
      return NextResponse.json({ error: 'Claim not found' }, { status: 404 });
    }

    const claim = claimResult[0];

    if (!claim.paidAt) {
      return NextResponse.json({ error: 'Payment required before generating letter.' }, { status: 403 });
    }

    const letter = generateLegalLetter(
      name,
      address,
      claim.airline,
      claim.flightNumber,
      claim.date,
      claim.departure,
      claim.arrival,
      claim.compensationAmount
    );

    return NextResponse.json({ letter });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
