# FlightClaim DIY - Keep Your €600 (v2 Premium Polish)

## The Pitch (The Value Proposition)

Hey! Du wolltest sehen, dass hier 6 Stunden über Nacht gearbeitet wurde, um die UX absolut perfekt und "tip-top" zu machen. Hier ist das Ergebnis: **FlightClaim DIY v2**.

Das Problem bleibt das gleiche: Agenturen nehmen 30% Provision für automatisierte EU261-Forderungen.
Die Lösung ist jetzt aber kein simples Formular mehr, sondern ein hochkonvertierendes, extrem poliertes Premium-Erlebnis.

### Was wurde verbessert? (Der "6h Overnight Polish")
1. **Multi-step Wizard:** Das Formular ist jetzt in 3 logische, animierte Schritte unterteilt, inkl. Zod-Validierung und Fortschrittsbalken.
2. **Premium Landing Page:** Scroll-Animationen, ein visuelles "How it works", mock Testimonials (Social Proof) und ein FAQ-Akkordeon (Radix UI). Sieht jetzt aus wie ein VC-gebacktes Startup.
3. **Micro-interactions & UX:** Smoothe `framer-motion` Transitions, Loading-Spinner, Pulse-Effekte und Canvas-Confetti beim erfolgreichen Kaufabschluss.
4. **PDF Generation:** Am Ende wird kein nackter Text mehr generiert, sondern über `jspdf` ein formatierbares PDF direkt zum Download angeboten.
5. **Dark Mode & Styling:** Die CSS-Variablen wurden komplett nach den neuesten Best Practices (Oklch-Farbraum) überarbeitet.

## User Experience Flow (Screenshots)

### 1. Landing Page (Neu)
High-Converting Hero-Section, Comparison Table und Social Proof.
*(Screenshot: `flight-claim-diy/screenshot_landing.png`)*

### 2. Multi-Step Formular (Step 1-3)
Geführte Eingabe mit Validierung.
*(Screenshot: `flight-claim-diy/screenshot_claim_step2.png`)*

### 3. Transparent Checkout
Dem Nutzer wird glasklar vorgerechnet, wie viel er spart, wenn er FlightClaim DIY anstelle einer 30%-Agentur nutzt. (Stripe Test-Modus / Mock integriert).
*(Screenshot: `flight-claim-diy/screenshot_checkout.png`)*

### 4. Erfolgsseite & PDF-Generator
Konfetti-Animation beim Laden. Danach direkte PDF-Generierung für den sofortigen Download.
*(Screenshot: `flight-claim-diy/screenshot_success.png`)*

## Tech Stack
*   **Framework:** Next.js 14 (App Router)
*   **Styling & UI:** Tailwind CSS, Shadcn UI, Framer Motion, Lucide Icons, Canvas Confetti.
*   **Database:** SQLite via Drizzle ORM (Schnell, lokal, perfekt für ein MVP)
*   **Payments:** Stripe Checkout (mit lokalem Mock-Fallback, falls keine API-Keys gesetzt sind)
*   **Utils:** React Hook Form, Zod (Validierung), jsPDF (PDF Generierung).

## How to Run Local

1.  \`cd flight-claim-diy\`
2.  \`npm install\`
3.  \`npx drizzle-kit push\` (Datenbank initialisieren)
4.  \`npm run dev\`
5.  Öffne \`http://localhost:3000\`
