"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export default function SuccessPage() {
  const params = useParams();
  const { toast } = useToast();
  const [letter, setLetter] = useState("");
  const [generating, setGenerating] = useState(false);
  const [formData, setFormData] = useState({ name: "", address: "" });

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
    } catch (err) {
      toast({ title: "Error", description: "Failed to generate letter.", variant: "destructive" });
    } finally {
      setGenerating(false);
    }
  };

  const downloadLetter = () => {
    const blob = new Blob([letter], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `EU261_Claim_${params.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 flex flex-col items-center">
      <Card className="max-w-2xl w-full shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-green-600">Payment Successful!</CardTitle>
          <CardDescription>Enter your personal details to finalize your legal demand letter.</CardDescription>
        </CardHeader>
        <CardContent>
          {!letter ? (
            <form onSubmit={handleGenerate} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name (Account Holder)</Label>
                <Input id="name" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Full Address</Label>
                <Input id="address" required value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} />
              </div>
              <Button type="submit" className="w-full" disabled={generating}>
                {generating ? "Generating..." : "Generate Letter"}
              </Button>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="bg-slate-100 p-6 rounded-lg whitespace-pre-wrap font-mono text-sm border overflow-y-auto max-h-96">
                {letter}
              </div>
              <div className="flex gap-4">
                <Button onClick={downloadLetter} className="w-full h-12">Download as Text</Button>
                <Button variant="outline" className="w-full h-12" onClick={() => navigator.clipboard.writeText(letter).then(()=>toast({title: "Copied!"}))}>Copy to Clipboard</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
