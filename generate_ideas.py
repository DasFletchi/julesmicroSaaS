import json

ideas = [
    {"name": "Subscription Cancellation Assistant", "description": "Generates legally binding cancellation letters for any service."},
    {"name": "Flight Compensation DIY (FlightClaim DIY)", "description": "Helps users claim EU261 flight compensation directly without giving up 30% to agencies."},
    {"name": "Rent Reduction Calculator", "description": "Calculates rent reductions for housing defects and generates notice to landlord."},
    {"name": "Tax Deadline Reminder", "description": "Personalized tax deadlines and penalty avoidance tracker."},
    {"name": "Warranty Claim Tracker", "description": "Tracks receipts and generates legal warranty claims when items break."},
    {"name": "Bank Fee Analyzer", "description": "Analyzes bank statements for hidden fees and suggests cheaper accounts."},
    {"name": "Unclaimed Money Finder", "description": "Searches government databases for unclaimed property."},
    {"name": "Traffic Ticket Contestor", "description": "Guides users through contesting minor traffic tickets."},
    {"name": "Deposit Return Demand", "description": "Generates formal demands for landlords withholding security deposits."},
    {"name": "GDPR Data Deletion Automator", "description": "Sends and tracks data deletion requests to data brokers."},
    {"name": "Pothole Damage Claimer", "description": "Claims compensation from cities for car damage from potholes."},
    {"name": "Internet Outage Refund", "description": "Calculates pro-rated refunds for ISP outages and generates requests."},
    {"name": "Medical Bill Error Checker", "description": "Parses medical bills for overcharges (US)."},
    {"name": "Home Energy Grant Finder", "description": "Finds eligible government grants for home energy upgrades."},
    {"name": "Package Delay Claimer", "description": "Claims refunds for late guaranteed-delivery packages."},
    {"name": "Gym Contract Terminator", "description": "Generates cancellation notices for difficult gym contracts."},
    {"name": "Property Tax Appeal", "description": "Generates an appeal packet to lower property taxes based on neighbor sales."},
    {"name": "Divorce Expense Tracker", "description": "Ledger for splitting expenses during separation."},
    {"name": "Freelancer Tax Write-off Finder", "description": "Finds missed tax write-offs for small side gigs."},
    {"name": "Inherited Asset Locator", "description": "Helps find bank accounts of deceased relatives."},
    {"name": "Moving Expense Claimer", "description": "Formats eligible moving expenses for employer reimbursement."},
    {"name": "Pet Insurance Claim Formatter", "description": "Formats vet bills for pet insurance approval."},
    {"name": "Wedding Contract Reviewer", "description": "Highlights hidden fees in wedding vendor contracts."},
    {"name": "Student Loan Forgiveness Checker", "description": "Tracks eligibility for public service loan forgiveness."},
    {"name": "Small Claims Court Prep", "description": "Guides users through building a small claims case."},
    {"name": "Used Car Lemon Law Checker", "description": "Analyzes car repair history for lemon law eligibility."},
    {"name": "Luggage Reimbursement Claimer", "description": "Generates claims for delayed/lost airline luggage."},
    {"name": "Speeding Camera Legality Checker", "description": "Checks if speed cameras comply with distance rules."},
    {"name": "Child Support Payment Tracker", "description": "Legally admissible ledger for co-parenting expenses."},
    {"name": "Tenant Background Check Self-Prep", "description": "Lets tenants run self-checks to fix errors before applying."}
]

with open("IDEAS.md", "w") as f:
    f.write("# 30 B2C Micro-SaaS Ideas\n\n")
    for i, idea in enumerate(ideas):
        f.write(f"## {i+1}. {idea['name']}\n")
        f.write(f"{idea['description']}\n\n")

    f.write("""
## Selection & Evaluation

**Winner: Flight Compensation DIY (FlightClaim DIY)**

### Evaluation of Winner:
- **Demand:** Very high. Millions of flights are delayed every year, and passengers are legally entitled to €250-€600 under EU261.
- **Willingness to Pay:** High. Users are claiming €600, paying a small one-time fee (e.g., €9-€15) to get 100% of it instead of giving up 30% (€180) to Flightright or AirHelp is a no-brainer.
- **Competition:** Flightright, AirHelp. But they are agencies taking a huge cut. The DIY software segment is under-served.
- **Technical Effort (MVP):** Low. Form to collect flight details, calculation logic based on distance, PDF/Email generator, and a database of airline contact emails. Buildable in hours.
- **Retention:** One-time use per delayed flight. B2C monetizes well on one-time payments for immediate financial wins.
- **Distribution:** SEO (e.g., "how to claim lufthansa delay without flightright"), Reddit travel communities, TikTok/Shorts showing the "hack" to keep 100% of the compensation.
- **Legal Risk:** Low, as long as it's clear the tool provides software/templates and not legal advice.
- **REAL USER VALUE (Highest Priority):** The user gets exactly the same legal claim formatted, but saves ~€180 in agency fees. Highly ethical, fights back against airlines making it hard to claim. I would 100% recommend this to my family.

### Runner ups:
- **Rent Reduction Calculator:** Great value, but legal risk is slightly higher as housing law varies wildly by municipality.
- **Subscription Cancellation Assistant:** Good, but willingness to pay is lower (people can just send an email themselves).
""")
