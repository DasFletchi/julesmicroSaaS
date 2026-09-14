import { NextResponse } from 'next/server';
import { db } from '@/db';
import { claims } from '@/db/schema';
import { eq } from 'drizzle-orm';
import Stripe from 'stripe';

export async function POST(req: Request) {
  try {
    const { claimId } = await req.json();

    // Check if Stripe key exists (mock mode if not)
    if (!process.env.STRIPE_SECRET_KEY) {
      console.log("No Stripe key, simulating payment success.");
      // Mark as paid in DB
      await db.update(claims).set({ paidAt: new Date() }).where(eq(claims.id, claimId));
      return NextResponse.json({ mockUrl: `/success/${claimId}` });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2024-04-10' as any });

    const claimResult = await db.select().from(claims).where(eq(claims.id, claimId));
    if (claimResult.length === 0) {
      return NextResponse.json({ error: 'Claim not found' }, { status: 404 });
    }

    const claim = claimResult[0];

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: 'FlightClaim DIY - EU261 Legal Letter',
              description: `Claim €${claim.compensationAmount} for flight ${claim.flightNumber}`,
            },
            unit_amount: 900, // 9 EUR
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/success/${claimId}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/checkout/${claimId}`,
      metadata: { claimId },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Stripe error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
