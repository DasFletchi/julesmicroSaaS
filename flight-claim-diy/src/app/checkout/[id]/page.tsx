"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CheckCircle2, AlertCircle, Lock, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

export default function CheckoutPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [claim, setClaim] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);

  useEffect(() => {
    fetch(`/api/claims/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) throw new Error(data.error);
        setClaim(data);
        setLoading(false);
      })
      .catch((err) => {
        toast({ title: "Error", description: "Claim not found.", variant: "destructive" });
        router.push("/");
      });
  }, [params.id, router, toast]);

  const handleCheckout = async () => {
    setPaying(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ claimId: params.id }),
      });
      const data = await res.json();

      if (data.mockUrl) {
        // Fallback mock payment success
        setTimeout(() => router.push(data.mockUrl), 1000); // Add slight delay for UX
      } else if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      toast({ title: "Error", description: "Checkout failed.", variant: "destructive" });
      setPaying(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 space-y-4">
      <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
      <p className="text-slate-500 font-medium animate-pulse">Calculating your maximum compensation...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 flex flex-col items-center">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="max-w-md w-full mb-8 text-center space-y-4"
      >
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-2 ring-4 ring-green-50">
          <CheckCircle2 className="h-10 w-10 text-green-600" />
        </div>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Great News!</h1>
        <p className="text-xl text-slate-600">
          You are legally entitled to <span className="font-extrabold text-green-600 bg-green-100 px-2 py-1 rounded-md">€{claim.compensationAmount}</span> compensation.
        </p>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="w-full max-w-md"
      >
        <Card className="w-full shadow-2xl border-t-4 border-t-blue-600 overflow-hidden">
          <CardHeader className="bg-blue-50/50 border-b pb-6">
            <CardTitle className="text-2xl">Unlock Your Claim Letter</CardTitle>
            <CardDescription className="text-base">Pay a flat €9 fee to instantly generate your legally binding PDF demand letter.</CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <div className="space-y-4 bg-slate-50 p-4 rounded-xl border">
              <div className="flex justify-between items-center pb-3 border-b border-slate-200">
                <span className="text-slate-600 font-medium">Expected Airline Payout</span>
                <span className="font-bold text-green-600 text-xl">€{claim.compensationAmount}</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-slate-200 opacity-50">
                <span className="text-slate-500">Agency Cut (e.g. Flightright)</span>
                <span className="font-bold text-red-500 line-through">- €{claim.compensationAmount * 0.3}</span>
              </div>
              <div className="flex justify-between items-center pt-2 font-bold text-2xl">
                <span className="text-slate-900">Our Flat Fee</span>
                <span className="text-slate-900">€9.00</span>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 shrink-0 mt-0.5 text-blue-600" />
              <p><strong>Remember:</strong> We take 0% commission. You send the letter directly to the airline, and they transfer the full €{claim.compensationAmount} to your bank account.</p>
            </div>

            <Button size="lg" className="w-full h-16 text-xl font-bold bg-blue-600 hover:bg-blue-700 shadow-xl hover:shadow-2xl transition-all" onClick={handleCheckout} disabled={paying}>
              {paying ? (
                <><Loader2 className="mr-2 h-6 w-6 animate-spin" /> Processing Securely...</>
              ) : (
                <><Lock className="mr-2 h-5 w-5" /> Pay €9 & Get Letter</>
              )}
            </Button>

            <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
              <Lock className="w-3 h-3" /> Secure test checkout (Mock mode active)
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
