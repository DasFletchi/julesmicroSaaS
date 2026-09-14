"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

export default function ClaimFlow() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    airline: "",
    flightNumber: "",
    date: "",
    departure: "",
    arrival: "",
    delayReason: "unknown",
    delayHours: "",
    distanceKm: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/claims", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          delayHours: parseInt(formData.delayHours),
          distanceKm: parseInt(formData.distanceKm),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast({ title: "Not Eligible", description: data.error, variant: "destructive" });
        setLoading(false);
        return;
      }

      router.push(`/checkout/${data.id}`);
    } catch (err) {
      toast({ title: "Error", description: "Something went wrong.", variant: "destructive" });
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 flex justify-center items-center">
      <Card className="max-w-xl w-full shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Check Eligibility</CardTitle>
          <CardDescription>Enter your flight details to see how much compensation you are owed under EU261.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="airline">Airline</Label>
                <Input id="airline" name="airline" placeholder="e.g. Lufthansa" required onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="flightNumber">Flight Number</Label>
                <Input id="flightNumber" name="flightNumber" placeholder="e.g. LH123" required onChange={handleChange} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Date of Flight</Label>
              <Input id="date" name="date" type="date" required onChange={handleChange} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="departure">Departure Airport</Label>
                <Input id="departure" name="departure" placeholder="FRA" required onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="arrival">Arrival Airport</Label>
                <Input id="arrival" name="arrival" placeholder="JFK" required onChange={handleChange} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="delayHours">Delay (Hours at arrival)</Label>
                <Input id="delayHours" name="delayHours" type="number" min="0" placeholder="e.g. 4" required onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="distanceKm">Flight Distance (km)</Label>
                <Input id="distanceKm" name="distanceKm" type="number" min="0" placeholder="e.g. 6200" required onChange={handleChange} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Your Email</Label>
              <Input id="email" name="email" type="email" placeholder="you@example.com" required onChange={handleChange} />
            </div>

            <Button type="submit" className="w-full h-12 text-lg mt-4" disabled={loading}>
              {loading ? "Calculating..." : "Calculate Compensation"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
