"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
        router.push(data.mockUrl);
      } else if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      toast({ title: "Error", description: "Checkout failed.", variant: "destructive" });
      setPaying(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 flex flex-col items-center">
      <div className="max-w-md w-full mb-8 text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
          <CheckCircle2 className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900">Good News!</h1>
        <p className="text-xl text-slate-600">
          You are legally entitled to <span className="font-bold text-green-600">€{claim.compensationAmount}</span> compensation.
        </p>
      </div>

      <Card className="max-w-md w-full shadow-xl border-blue-100">
        <CardHeader className="bg-blue-50/50 border-b pb-6">
          <CardTitle>Unlock Your Claim Letter</CardTitle>
          <CardDescription>Pay a flat €9 fee to generate your legally binding demand letter.</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-slate-600">Expected Payout</span>
            <span className="font-bold text-green-600 text-lg">€{claim.compensationAmount}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-slate-600">Agency Cut (30%)</span>
            <span className="font-bold text-red-500 line-through">€{claim.compensationAmount * 0.3}</span>
          </div>
          <div className="flex justify-between items-center py-2 font-bold text-xl">
            <span>FlightClaim DIY Fee</span>
            <span>€9.00</span>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-800 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
            <p><strong>Note:</strong> We do not take any cut of your compensation. You send the letter directly to the airline and they pay you directly.</p>
          </div>

          <Button size="lg" className="w-full h-14 text-lg" onClick={handleCheckout} disabled={paying}>
            {paying ? "Processing..." : "Pay €9 & Get Letter"}
          </Button>
          <p className="text-xs text-center text-slate-500">Secure test checkout (Mock mode active if no keys provided).</p>
        </CardContent>
      </Card>
    </div>
  );
}
