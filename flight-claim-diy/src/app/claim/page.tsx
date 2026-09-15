"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, ArrowLeft, CheckCircle2, Plane, Clock, ShieldCheck } from "lucide-react";

const formSchema = z.object({
  airline: z.string().min(2, "Airline is required"),
  flightNumber: z.string().min(2, "Flight number is required"),
  date: z.string().min(1, "Date is required"),
  departure: z.string().min(3, "Departure is required").max(3, "Use 3-letter code (e.g., FRA)"),
  arrival: z.string().min(3, "Arrival is required").max(3, "Use 3-letter code (e.g., JFK)"),
  delayReason: z.string().min(1, "Reason is required"),
  delayHours: z.string().refine((val) => parseInt(val) >= 0, { message: "Must be a positive number" }),
  distanceKm: z.string().refine((val) => parseInt(val) > 0, { message: "Must be a positive number" }),
  email: z.string().email("Invalid email address"),
});

type FormValues = z.infer<typeof formSchema>;

const steps = [
  { id: "flight", title: "Flight Details", icon: Plane },
  { id: "route", title: "Route & Time", icon: Clock },
  { id: "contact", title: "Delay & Contact", icon: ShieldCheck },
];

export default function ClaimFlow() {
  const router = useRouter();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onTouched",
    defaultValues: {
      airline: "",
      flightNumber: "",
      date: "",
      departure: "",
      arrival: "",
      delayReason: "unknown",
      delayHours: "",
      distanceKm: "",
      email: "",
    },
  });

  const processNextStep = async () => {
    let fieldsToValidate: any[] = [];
    if (currentStep === 0) fieldsToValidate = ["airline", "flightNumber", "date"];
    if (currentStep === 1) fieldsToValidate = ["departure", "arrival", "distanceKm"];
    if (currentStep === 2) fieldsToValidate = ["delayHours", "delayReason", "email"];

    const isStepValid = await form.trigger(fieldsToValidate as any);
    if (isStepValid) {
      if (currentStep < steps.length - 1) {
        setCurrentStep((prev) => prev + 1);
      } else {
        onSubmit(form.getValues());
      }
    }
  };

  const processPrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const onSubmit = async (data: FormValues) => {
    setLoading(true);

    try {
      const res = await fetch("/api/claims", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          delayHours: parseInt(data.delayHours),
          distanceKm: parseInt(data.distanceKm),
        }),
      });

      const responseData = await res.json();

      if (!res.ok) {
        toast({ title: "Not Eligible", description: responseData.error, variant: "destructive" });
        setLoading(false);
        return;
      }

      router.push(`/checkout/${responseData.id}`);
    } catch (err) {
      toast({ title: "Error", description: "Something went wrong.", variant: "destructive" });
      setLoading(false);
    }
  };

  const progressPercentage = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 flex flex-col items-center">

      <div className="max-w-xl w-full mb-8">
        <h1 className="text-3xl font-bold text-slate-900 text-center mb-2">Check Your Compensation</h1>
        <p className="text-slate-500 text-center mb-8">Takes less than 2 minutes.</p>

        <div className="flex justify-between mb-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;
            return (
              <div key={step.id} className="flex flex-col items-center w-1/3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-colors ${isActive ? 'bg-blue-600 text-white shadow-md' : isCompleted ? 'bg-green-500 text-white' : 'bg-slate-200 text-slate-400'}`}>
                  {isCompleted ? <CheckCircle2 className="w-6 h-6" /> : <Icon className="w-5 h-5" />}
                </div>
                <span className={`text-xs font-medium ${isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-slate-400'}`}>{step.title}</span>
              </div>
            )
          })}
        </div>
        <Progress value={progressPercentage} className="h-2 bg-slate-200" />
      </div>

      <Card className="max-w-xl w-full shadow-xl border-t-4 border-t-blue-600 overflow-hidden relative min-h-[400px]">
        <CardContent className="p-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -50, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="p-8"
            >
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>

                {/* STEP 0: Flight Details */}
                {currentStep === 0 && (
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold mb-4">Tell us about your flight</h2>

                    <div className="space-y-2">
                      <Label htmlFor="airline">Airline</Label>
                      <Input id="airline" placeholder="e.g. Lufthansa" {...form.register("airline")} className="h-12 text-lg" />
                      {form.formState.errors.airline && <p className="text-sm text-red-500">{form.formState.errors.airline.message}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="flightNumber">Flight Number</Label>
                        <Input id="flightNumber" placeholder="e.g. LH123" {...form.register("flightNumber")} className="h-12 text-lg" />
                        {form.formState.errors.flightNumber && <p className="text-sm text-red-500">{form.formState.errors.flightNumber.message}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="date">Date of Flight</Label>
                        <Input id="date" type="date" {...form.register("date")} className="h-12 text-lg" />
                        {form.formState.errors.date && <p className="text-sm text-red-500">{form.formState.errors.date.message}</p>}
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 1: Route Details */}
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold mb-4">Where did you fly?</h2>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="departure">Departure Airport (IATA)</Label>
                        <Input id="departure" placeholder="FRA" {...form.register("departure")} className="h-12 text-lg uppercase" maxLength={3} />
                        {form.formState.errors.departure && <p className="text-sm text-red-500">{form.formState.errors.departure.message}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="arrival">Arrival Airport (IATA)</Label>
                        <Input id="arrival" placeholder="JFK" {...form.register("arrival")} className="h-12 text-lg uppercase" maxLength={3} />
                        {form.formState.errors.arrival && <p className="text-sm text-red-500">{form.formState.errors.arrival.message}</p>}
                      </div>
                    </div>

                    <div className="space-y-2 pt-4">
                      <Label htmlFor="distanceKm">Flight Distance (km)</Label>
                      <p className="text-xs text-slate-500 mb-2">Distance determines your compensation (e.g., &gt;3500km = €600)</p>
                      <Input id="distanceKm" type="number" placeholder="e.g. 6200" {...form.register("distanceKm")} className="h-12 text-lg" />
                      {form.formState.errors.distanceKm && <p className="text-sm text-red-500">{form.formState.errors.distanceKm.message}</p>}
                    </div>
                  </div>
                )}

                {/* STEP 2: Delay Details */}
                {currentStep === 2 && (
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold mb-4">Delay & Contact</h2>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="delayHours">Delay at Arrival (Hours)</Label>
                        <Input id="delayHours" type="number" placeholder="e.g. 4" {...form.register("delayHours")} className="h-12 text-lg" />
                        {form.formState.errors.delayHours && <p className="text-sm text-red-500">{form.formState.errors.delayHours.message}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label>Reason (if known)</Label>
                        <Select onValueChange={(val) => form.setValue("delayReason", val || "unknown")} defaultValue="unknown">
                          <SelectTrigger className="h-12 text-lg">
                            <SelectValue placeholder="Select reason" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="unknown">Unknown</SelectItem>
                            <SelectItem value="technical">Technical Issue</SelectItem>
                            <SelectItem value="crew">Crew Shortage</SelectItem>
                            <SelectItem value="weather">Weather (Extraordinary)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2 pt-4">
                      <Label htmlFor="email">Where should we send the receipt?</Label>
                      <Input id="email" type="email" placeholder="you@example.com" {...form.register("email")} className="h-12 text-lg" />
                      {form.formState.errors.email && <p className="text-sm text-red-500">{form.formState.errors.email.message}</p>}
                    </div>
                  </div>
                )}

              </form>
            </motion.div>
          </AnimatePresence>
        </CardContent>

        <div className="p-6 border-t bg-slate-50 flex justify-between rounded-b-xl absolute bottom-0 left-0 right-0">
          <Button type="button" variant="outline" onClick={processPrevStep} disabled={currentStep === 0 || loading} className="w-32 h-12">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>

          <Button type="button" onClick={processNextStep} disabled={loading} className="w-40 h-12 font-bold shadow-md">
            {loading ? "Calculating..." : currentStep === steps.length - 1 ? "See Results" : "Next"}
            {!loading && currentStep < steps.length - 1 && <ArrowRight className="w-4 h-4 ml-2" />}
          </Button>
        </div>
      </Card>
    </div>
  );
}
