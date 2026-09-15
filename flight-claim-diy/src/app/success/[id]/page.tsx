"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Download, Copy, CheckCircle } from "lucide-react";
import confetti from "canvas-confetti";
import jsPDF from "jspdf";

export default function SuccessPage() {
  const params = useParams();
  const { toast } = useToast();
  const [letter, setLetter] = useState("");
  const [generating, setGenerating] = useState(false);
  const [formData, setFormData] = useState({ name: "", address: "" });
  const [claimInfo, setClaimInfo] = useState<any>(null);

  useEffect(() => {
    // Fire confetti on load!
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);

    // Fetch claim info for the PDF
    fetch(`/api/claims/${params.id}`)
      .then(res => res.json())
      .then(data => {
          if(!data.error) setClaimInfo(data);
      })

    return () => clearInterval(interval);
  }, [params.id]);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setGenerating(true);

    try {
      const res = await fetch(`/api/claims/${params.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error);
      setLetter(data.letter);
      toast({ title: "Success!", description: "Your letter is ready.", variant: "default" });
    } catch (err) {
      toast({ title: "Error", description: "Failed to generate letter.", variant: "destructive" });
    } finally {
      setGenerating(false);
    }
  };

  const downloadPDF = () => {
    if (!letter) return;

    const doc = new jsPDF();
    const splitText = doc.splitTextToSize(letter, 170); // Margins

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text(splitText, 20, 20);

    doc.save(`EU261_Claim_${claimInfo?.airline || 'Airline'}_${claimInfo?.flightNumber || ''}.pdf`);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 flex flex-col items-center">
      <div className="max-w-2xl w-full mb-8 text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-2">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900">Payment Successful!</h1>
        <p className="text-lg text-slate-600">
          You are one step away from claiming your €{claimInfo?.compensationAmount || '600'}.
        </p>
      </div>

      <Card className="max-w-2xl w-full shadow-2xl border-t-4 border-t-green-500">
        <CardHeader className="bg-green-50/50 border-b">
          <CardTitle>Finalize your legal letter</CardTitle>
          <CardDescription>We need your contact details to put on the official demand letter to the airline.</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          {!letter ? (
            <form onSubmit={handleGenerate} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name (Account Holder)</Label>
                <Input id="name" required placeholder="e.g. Jane Doe" className="h-12 text-lg" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Full Address</Label>
                <Input id="address" required placeholder="e.g. 123 Main St, 10115 Berlin, Germany" className="h-12 text-lg" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} />
              </div>
              <Button type="submit" className="w-full h-14 text-lg bg-green-600 hover:bg-green-700" disabled={generating}>
                {generating ? "Generating Document..." : "Generate My PDF Letter"}
              </Button>
            </form>
          ) : (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-slate-100 p-8 rounded-xl whitespace-pre-wrap font-mono text-sm border shadow-inner overflow-y-auto max-h-[500px]">
                {letter}
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button onClick={downloadPDF} className="w-full h-14 text-lg bg-blue-600 hover:bg-blue-700">
                  <Download className="mr-2 h-5 w-5" /> Download PDF
                </Button>
                <Button variant="outline" className="w-full h-14 text-lg" onClick={() => {
                    navigator.clipboard.writeText(letter);
                    toast({title: "Copied to clipboard!"});
                }}>
                  <Copy className="mr-2 h-5 w-5" /> Copy Text
                </Button>
              </div>
              <p className="text-center text-sm text-slate-500">
                Next step: Email this PDF to {claimInfo?.airline || 'the airline'}'s customer service or print and mail it.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
