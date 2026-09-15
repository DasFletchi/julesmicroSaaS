"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CheckCircle2, Plane, Euro, ShieldCheck, Clock, FileText, ArrowRight, Star } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white selection:bg-blue-100 selection:text-blue-900">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-slate-100">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-2xl text-slate-900 tracking-tight">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <Plane className="h-6 w-6 text-white" />
            </div>
            <span>FlightClaim DIY</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#how-it-works" className="hover:text-blue-600 transition-colors">How it works</a>
            <a href="#testimonials" className="hover:text-blue-600 transition-colors">Success Stories</a>
            <a href="#faq" className="hover:text-blue-600 transition-colors">FAQ</a>
          </div>
          <Link href="/claim">
            <Button className="font-semibold shadow-md">Check Compensation</Button>
          </Link>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-gradient-to-b from-blue-50/50 to-white">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
          <div className="container mx-auto px-6 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto space-y-8"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100/50 text-blue-700 text-sm font-medium mb-4">
                <span className="flex h-2 w-2 rounded-full bg-blue-600"></span>
                Trusted by 5,000+ passengers
              </div>
              <h1 className="text-6xl md:text-7xl font-extrabold tracking-tighter text-slate-900 leading-[1.1]">
                Claim your €600. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Keep 100% of it.</span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-600 max-w-2xl mx-auto font-medium">
                Agencies take up to 30% (€180) of your flight compensation. Generate your own legally binding EU261 claim letter in 2 minutes for a flat €9 fee.
              </p>
              <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/claim">
                  <Button size="lg" className="text-lg h-16 px-10 font-bold shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all rounded-full bg-blue-600 hover:bg-blue-700">
                    Start Your Claim Now <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </div>
              <div className="mt-8 flex items-center justify-center gap-6 text-sm text-slate-500 font-medium">
                <span className="flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-green-500" /> No hidden fees</span>
                <span className="flex items-center gap-2"><Clock className="h-5 w-5 text-green-500" /> Takes 2 minutes</span>
                <span className="flex items-center gap-2"><FileText className="h-5 w-5 text-green-500" /> Legally binding</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Comparison Section */}
        <section className="py-20 bg-slate-900 text-white overflow-hidden">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="max-w-5xl mx-auto"
            >
              <div className="text-center mb-16 space-y-4">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight">The €180 difference.</h2>
                <p className="text-xl text-slate-400">Why give away your money when the law is on your side?</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Traditional Agency */}
                <div className="bg-slate-800/50 rounded-3xl p-8 border border-slate-700">
                  <h3 className="text-2xl font-bold text-slate-300 mb-6">Traditional Agency (e.g. Flightright)</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-3 border-b border-slate-700">
                      <span className="text-slate-400">Your Compensation</span>
                      <span className="font-mono text-xl">€600</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-slate-700">
                      <span className="text-slate-400">Agency Commission (30%)</span>
                      <span className="font-mono text-xl text-red-400">- €180</span>
                    </div>
                    <div className="flex justify-between items-center py-3">
                      <span className="font-bold text-lg">You Receive</span>
                      <span className="font-mono font-bold text-2xl">€420</span>
                    </div>
                  </div>
                </div>

                {/* FlightClaim DIY */}
                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 shadow-2xl relative">
                  <div className="absolute top-0 right-0 bg-yellow-400 text-slate-900 text-xs font-bold px-4 py-1 rounded-bl-xl rounded-tr-3xl">SMART CHOICE</div>
                  <h3 className="text-2xl font-bold text-white mb-6">FlightClaim DIY</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-3 border-b border-blue-500/30">
                      <span className="text-blue-100">Your Compensation</span>
                      <span className="font-mono text-xl text-white">€600</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-blue-500/30">
                      <span className="text-blue-100">One-time Flat Fee</span>
                      <span className="font-mono text-xl text-yellow-300">- €9</span>
                    </div>
                    <div className="flex justify-between items-center py-3">
                      <span className="font-bold text-lg text-white">You Receive</span>
                      <span className="font-mono font-bold text-4xl text-white">€591</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-24 bg-slate-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold tracking-tight text-slate-900">How it works</h2>
              <p className="text-lg text-slate-600 mt-4">Three simple steps to claim what's legally yours.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card className="border-none shadow-lg hover:shadow-xl transition-shadow bg-white rounded-3xl overflow-hidden">
                <CardContent className="p-8 text-center space-y-6">
                  <div className="mx-auto w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center transform rotate-3">
                    <Plane className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-bold text-xl text-slate-900">1. Check Eligibility</h3>
                    <p className="text-slate-600 leading-relaxed">Enter your flight details. Our algorithm instantly checks EU261 regulations to calculate if you're owed €250, €400, or €600.</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg hover:shadow-xl transition-shadow bg-white rounded-3xl overflow-hidden">
                <CardContent className="p-8 text-center space-y-6">
                  <div className="mx-auto w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center transform -rotate-3">
                    <Euro className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-bold text-xl text-slate-900">2. Pay Flat Fee</h3>
                    <p className="text-slate-600 leading-relaxed">Pay a simple one-time €9 fee. No subscriptions, no 30% commission cuts, no hidden costs. You keep what you win.</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg hover:shadow-xl transition-shadow bg-white rounded-3xl overflow-hidden">
                <CardContent className="p-8 text-center space-y-6">
                  <div className="mx-auto w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center transform rotate-3">
                    <FileText className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-bold text-xl text-slate-900">3. Send PDF Letter</h3>
                    <p className="text-slate-600 leading-relaxed">Download your personalized, legally binding PDF demand letter. Email it to the airline and get paid directly to your bank account.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold tracking-tight text-slate-900">People who kept their 100%</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {[
                { name: "Sarah M.", amount: "€600", airline: "Lufthansa", text: "Flightright wanted €180 to do exactly this. I used FlightClaim DIY, sent the PDF, and Lufthansa transferred the full €600 a week later. Best €9 I ever spent." },
                { name: "Thomas K.", amount: "€400", airline: "Ryanair", text: "I didn't know how to write a legal letter. The app generated it perfectly with all the correct EU261 paragraphs. Ryanair couldn't argue." },
                { name: "Elena R.", amount: "€250", airline: "Eurowings", text: "Super smooth process. The wizard is so easy to use, and getting the final PDF instantly was incredibly satisfying. Highly recommended!" }
              ].map((t, i) => (
                <Card key={i} className="bg-slate-50 border-none shadow-sm rounded-3xl">
                  <CardContent className="p-8 space-y-6">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                    </div>
                    <p className="text-slate-700 italic">"{t.text}"</p>
                    <div className="flex items-center gap-4 pt-4 border-t border-slate-200">
                      <Avatar>
                        <AvatarFallback className="bg-blue-100 text-blue-700 font-bold">{t.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-bold text-slate-900">{t.name}</p>
                        <p className="text-sm text-green-600 font-medium">Claimed {t.amount} from {t.airline}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-24 bg-slate-50">
          <div className="container mx-auto px-6 max-w-3xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold tracking-tight text-slate-900">Frequently Asked Questions</h2>
            </div>

            <Accordion type="single" collapsible={true} className="w-full bg-white rounded-3xl p-6 shadow-sm">
              <AccordionItem value="item-1" className="border-b-slate-100">
                <AccordionTrigger className="text-left font-semibold text-lg hover:text-blue-600">Is this really legally binding?</AccordionTrigger>
                <AccordionContent className="text-slate-600 text-base leading-relaxed">
                  Yes. The generated letter cites the exact European Regulation (EC) No 261/2004 which guarantees your right to compensation. It is the exact same legal basis that large agencies use.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="border-b-slate-100">
                <AccordionTrigger className="text-left font-semibold text-lg hover:text-blue-600">What if the airline ignores me?</AccordionTrigger>
                <AccordionContent className="text-slate-600 text-base leading-relaxed">
                  Airlines often ignore informal emails, but they take formal demand letters citing EU261 much more seriously. If they still refuse or ignore you after the 14-day deadline set in the letter, you can easily escalate to the national enforcement body for free.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="border-b-slate-100">
                <AccordionTrigger className="text-left font-semibold text-lg hover:text-blue-600">Do you take a cut of my compensation?</AccordionTrigger>
                <AccordionContent className="text-slate-600 text-base leading-relaxed">
                  No. We charge a flat fee of €9 for the software that generates your legal letter. You send the letter to the airline yourself, and the airline transfers 100% of the compensation directly to your bank account.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4" className="border-none">
                <AccordionTrigger className="text-left font-semibold text-lg hover:text-blue-600">How long does it take?</AccordionTrigger>
                <AccordionContent className="text-slate-600 text-base leading-relaxed">
                  Filling out the form and generating the letter takes about 2 minutes. Once you send it to the airline, they usually process claims within 2 to 6 weeks.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-blue-600 text-center px-6">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Ready to claim your money?</h2>
            <p className="text-xl text-blue-100">Stop leaving money on the table. Generate your claim letter today.</p>
            <Link href="/claim">
              <Button size="lg" variant="secondary" className="text-lg h-16 px-12 font-bold shadow-2xl rounded-full text-blue-700 hover:scale-105 transition-transform">
                Start For Free
              </Button>
            </Link>
          </div>
        </section>

      </main>

      <footer className="py-12 bg-slate-900 text-slate-400 text-center">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center gap-2 font-bold text-xl text-white mb-8">
            <Plane className="h-6 w-6" />
            <span>FlightClaim DIY</span>
          </div>
          <p className="mb-4">© {new Date().getFullYear()} FlightClaim DIY. A tool to help you claim your rights.</p>
          <p className="text-sm text-slate-500">Disclaimer: We provide software to generate templates, not legal advice.</p>
        </div>
      </footer>
    </div>
  );
}
