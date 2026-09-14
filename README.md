# FlightClaim DIY - Keep Your €600

## The Pitch (The Value Proposition)

Hey! Hier ist die Umsetzung des B2C Micro-SaaS für Privatpersonen.

### Das Problem
Millionen von Menschen erleben jährlich Flugverspätungen und haben nach EU-Recht (EU261) Anspruch auf 250€ bis 600€ Entschädigung. Das Problem: Airlines ignorieren oft normale E-Mails, und Agenturen wie *Flightright* oder *AirHelp* nehmen **30% Provision (bis zu 180€)** für einen automatisierten Prozess, den man theoretisch selbst machen könnte, wenn man das juristische Wording kennt.

### Die Lösung (Das Produkt)
**FlightClaim DIY**. Ein Tool, das in 2 Minuten prüft, ob ein Anspruch besteht, und für eine **einmalige Flat-Fee von 9€** ein rechtssicheres, juristisch formuliertes PDF/Text-Dokument generiert, das der Nutzer direkt an die Airline schickt.

### Der Mehrwert-Filter (Ethik-Check)
*   **Würde ich das meiner Familie empfehlen?** 100% JA! Es ist exakt das gleiche Gesetz, das Agenturen nutzen, aber anstatt 180€ an eine Agentur abzugeben, zahlt der Nutzer 9€ und behält 600€. Ein massiver, direkt messbarer finanzieller Vorteil. Keine Abofalle, kein Scam. Ein faires Werkzeug gegen Airlines, die auf die Unwissenheit der Verbraucher spekulieren.

## User Experience Flow (Screenshots)

### 1. Landing Page
Klares Messaging: "Claim your €600. Keep 100% of it." Keine versteckten Kosten.
*(Screenshot: `flight-claim-diy/screenshot_landing.png`)*

### 2. Eligibility Check Form
Nutzer geben ihre Flugdaten ein. Die Distanz und Verspätung werden genutzt, um den genauen EU261-Anspruch zu berechnen (250€, 400€ oder 600€).
*(Screenshot: `flight-claim-diy/screenshot_claim_form.png`)*

### 3. Transparent Checkout
Dem Nutzer wird glasklar vorgerechnet, wie viel er spart, wenn er FlightClaim DIY anstelle einer 30%-Agentur nutzt. (Stripe Test-Modus / Mock integriert).
*(Screenshot: `flight-claim-diy/screenshot_checkout.png`)*

### 4. Generated Legal Demand Letter
Nach der Zahlung werden die Adressdaten eingefügt und das juristisch korrekte Anschreiben generiert. Der Nutzer kann es direkt kopieren oder als TXT herunterladen und abschicken.
*(Screenshot: `flight-claim-diy/screenshot_letter.png`)*

## Tech Stack
*   **Framework:** Next.js 14 (App Router)
*   **Styling:** Tailwind CSS + Shadcn UI (Für maximale Performance und eine extrem cleane, schnelle B2C-UX)
*   **Database:** SQLite via Drizzle ORM (Schnell, lokal, perfekt für ein MVP)
*   **Payments:** Stripe Checkout (mit lokalem Mock-Fallback, falls keine API-Keys gesetzt sind)

## How to Run Local

1.  \`cd flight-claim-diy\`
2.  \`npm install\`
3.  \`npx drizzle-kit push\` (Datenbank initialisieren)
4.  \`npm run dev\`
5.  Öffne \`http://localhost:3000\`

*(Optional: Setze \`STRIPE_SECRET_KEY\` und \`NEXT_PUBLIC_BASE_URL\` in einer \`.env.local\` für echten Stripe Checkout. Ohne Keys ist der Payment-Flow simuliert und leitet direkt zur Success-Page).*
