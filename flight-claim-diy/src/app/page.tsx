import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, Plane, Euro, ShieldCheck } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl text-blue-600">
            <Plane className="h-6 w-6" />
            <span>FlightClaim DIY</span>
          </div>
        </div>
      </header>

      <main>
        <section className="py-20 text-center px-4 bg-gradient-to-b from-blue-50 to-slate-50">
          <div className="max-w-3xl mx-auto space-y-6">
            <h1 className="text-5xl font-extrabold tracking-tight text-slate-900">
              Claim your €600 Flight Compensation. <br />
              <span className="text-blue-600">Keep 100% of it.</span>
            </h1>
            <p className="text-xl text-slate-600">
              Agencies like Flightright or AirHelp take up to 30% (€180) of your rightful compensation.
              Generate your own legally binding EU261 claim letter in 2 minutes for a flat €9 fee.
            </p>
            <div className="pt-8">
              <Link href="/claim">
                <Button size="lg" className="text-lg h-14 px-8 font-semibold shadow-lg hover:shadow-xl transition-all">
                  Start Your Claim Now
                </Button>
              </Link>
              <p className="mt-4 text-sm text-slate-500 font-medium flex items-center justify-center gap-2">
                <ShieldCheck className="h-4 w-4" /> No hidden fees. Secure checkout.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card className="border-none shadow-md bg-blue-50/50">
                <CardContent className="pt-6 text-center space-y-4">
                  <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Plane className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-xl">1. Check Eligibility</h3>
                  <p className="text-slate-600">Enter your flight details. We instantly calculate if you're owed €250, €400, or €600 under EU law.</p>
                </CardContent>
              </Card>
              <Card className="border-none shadow-md bg-blue-50/50">
                <CardContent className="pt-6 text-center space-y-4">
                  <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Euro className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-xl">2. Pay Flat Fee</h3>
                  <p className="text-slate-600">Pay a one-time €9 fee. No 30% commission, no hidden costs. You keep every cent the airline pays.</p>
                </CardContent>
              </Card>
              <Card className="border-none shadow-md bg-blue-50/50">
                <CardContent className="pt-6 text-center space-y-4">
                  <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-xl">3. Send Letter</h3>
                  <p className="text-slate-600">Download your personalized, legally sound PDF demand letter. Send it to the airline and get paid.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-16 bg-slate-900 text-white text-center px-4">
            <div className="max-w-2xl mx-auto space-y-6">
                <h2 className="text-3xl font-bold">Don't leave €180 on the table.</h2>
                <p className="text-slate-300">If an agency wins your €600 case, they keep €180. With FlightClaim DIY, you pay €9 and keep €600. It's the same law, the same rights, just without the agency cut.</p>
            </div>
        </section>
      </main>

      <footer className="py-8 text-center text-slate-500 text-sm bg-white border-t">
        <p>© {new Date().getFullYear()} FlightClaim DIY. Not legal advice.</p>
      </footer>
    </div>
  );
}
