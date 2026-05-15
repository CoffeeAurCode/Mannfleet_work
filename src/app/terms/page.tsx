"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Clause {
  num: string;
  text: string;
  subitems?: string[];
}

interface Section {
  num: string;
  title: string;
  clauses: Clause[];
}

const SECTIONS: Section[] = [
  {
    num: "1",
    title: "Scope of Services & Booking Protocols",
    clauses: [
      { num: "1.1", text: 'Mann Fleet Partners Limited (hereinafter referred to as "MFPL") covenants to provide professional transportation services maintained at the highest industry standards.' },
      { num: "1.2", text: "MFPL endeavours that all dispatched vehicles shall be punctual, well-maintained, and sanitary. Chauffeurs shall be appropriately uniformed, briefed on the specific service requirements, and maintain a courteous, professional demeanour at all times." },
      { num: "1.3", text: "Service requests are only valid once a formal MFPL confirmation number is issued. Verbal instructions are not binding. If you do not receive a reply from us within 12 hours, please consider your message undelivered and contact us again to ensure receipt." },
      { num: "1.4", text: "Pricing provided for bespoke or tailor-made itineraries shall remain valid for a period of sixty (60) days from the date of issuance." },
      { num: "1.5", text: 'All immediate or "current" bookings are subject to a minimum requisition period of three (3) hours prior to the scheduled execution time.' },
      { num: "1.6", text: "MFPL shall provide services on a best-efforts basis. The Client expressly acknowledges that vehicle availability, timely deployment, and continuity of service are subject to operational constraints, including but not limited to traffic conditions, driver availability, regulatory restrictions, mechanical issues, and unforeseen circumstances. MFPL does not guarantee uninterrupted or error-free service." },
    ],
  },
  {
    num: "2",
    title: "Tariff Structure, Billing & Taxation",
    clauses: [
      { num: "2.1", text: "Time and mileage (kilometers) shall be calculated on a 'Garage-to-Garage' basis. Charges will originate from and terminate at the MFPL designated garage located within the specific city where the services are rendered. For multi-city or intercity services, the starting and ending points will be the service origin and destination, respectively" },
      { num: "2.2", text: 'For Airport Transfers and Local Sightseeing, all ancillary costs—including parking fees, tolls, and state taxes—shall be billed as extras. Any service exceeding a four-hour duration shall be billed under the "80 km / 8 hours" tariff bracket.' },
      { num: "2.3", text: "For trips beyond city limits, all parking, tolls, and state taxes shall be charged at actuals based on original receipts. Prepaid taxes shall be billed as per the actual paid receipt value." },
      { num: "2.4", text: "Package tours are inclusive of parking, tolls, chauffeur allowances, and state taxes; however, parking charges for airport or railway station pickups remain an additional liability of the client." },
      { num: "2.5", text: "GST will be applicable, as per Govt. directive" },
      { num: "2.6", text: "Payments made via credit card shall be subject to a facilitation fee equivalent to the actual bank processing charges on the total transaction value. This fee will be added to the final invoice at the time of payment processing." },
      { num: "2.7", text: "All rates are subject to adjustment based on fuel price volatility or regulatory changes, following prior intimation to the client. Please note that a tariff increase will be mandatory if there is an impact of more than 5% on fuel prices relative to the rates at the time of contract execution." },
    ],
  },
  {
    num: "3",
    title: "Payment Terms & Credit Policy",
    clauses: [
      { num: "3.1", text: "Unless otherwise agreed in writing, all service fees must be settled in full prior to the departure or commencement of services." },
      { num: "3.2", text: "For entities with executed contracts and approved credit lines, payments are due within thirty (30) days from the date of invoice presentation." },
      { num: "3.3", text: "Any payment delayed beyond the 30-day credit period shall attract an interest levy of 3% per month, calculated from the date of service delivery." },
      { num: "3.4", text: 'The client must notify MFPL of any discrepancies in the invoice within five (5) working days of receipt. In the absence of such notification, the invoice shall be deemed accepted and "perfect." Unauthorised deductions or "cuttings" from the invoiced amount are strictly prohibited and not acceptable.' },
      { num: "3.5", text: "Clients must obtain a valid, printed receipt for any payment made to a chauffeur or authorised representative. Payments made without a corresponding receipt shall be treated as unpaid." },
      { num: "3.6", text: "MFPL reserves the right to suspend or withhold services without liability in case of delayed or non-payment by the Client." },
    ],
  },
  {
    num: "4",
    title: "Amenities, Usage & Conduct",
    clauses: [
      { num: "4.1", text: "Standard rates apply for mineral water, beverages, and garlands. Complimentary mineral water is provided only for local services within the Luxury and SUV segments." },
      { num: "4.2", text: "Coaches and vans are provided with 3GB of complimentary Wi-Fi on request; usage exceeding this threshold shall be billed at Rs. 500 per GB. Wi-Fi for cars/SUVs is available only upon specific request." },
      { num: "4.3", text: "No credits, refunds, or deductions shall be granted for the intermittent failure of secondary amenities, including LCD/DVD systems, music systems, or Wi-Fi, due to technical or unavoidable circumstances." },
      { num: "4.4", text: "The consumption of food, alcoholic beverages, or hot drinks (such as tea and coffee) is strictly prohibited while the vehicle is in motion. Any resulting damage to the vehicle interior will be invoiced to the client; this invoice will include the full cost of repairs plus compensation for the number of days the vehicle is grounded and unavailable for service." },
      { num: "4.5", text: "The transportation of illicit drugs or sealed/unsealed/illegal alcoholic bottles/illegal merchandise are strictly prohibited and may result in immediate termination of service without refund. MFPL maintains a zero-tolerance policy regarding the transport of illegal substances, unauthorised merchandise, or alcoholic containers. We reserve the right to cancel services instantly and forfeit all payments. Additionally, we will report all such activities to the relevant legal agencies for further statutory action." },
      { num: "4.6", text: "Chauffeurs are instructed to follow the pre-agreed itinerary. Deviations without prior written approval from MFPL management will incur additional charges, and chauffeurs reserve the right to decline unscheduled routes." },
      { num: "4.7", text: "Airport and station transfers are strictly point-to-point, one-way services; any diversions, breaks, or continued vehicle usage following arrival in the city or at the hotel will terminate the transfer status and trigger additional charges as per the applicable tariff or local running rates." },
      { num: "4.8", text: "The Client acknowledges that chauffeurs are employees/contractors of MFPL deployed strictly for driving purposes. Any misconduct, misbehaviour, or unlawful instructions issued by the Client to the chauffeur shall be at the Client’s sole risk and responsibility." },
    ],
  },
  {
    num: "5",
    title: "Cancellation & Breakdown Protocols",
    clauses: [
      {
        num: "5.1",
        text: "Cancellations for premium vehicles, coaches, and vans are subject to the following:",
        subitems: [
          "From the reservation date till 30 days before the day or time of departure: 10% of the gross amount or a 1-day minimum charge.",
          "29 to 15 days before the day or time of departure: 25% of the gross amount or a 1-day minimum charge.",
          "14 to 2 days prior to day or time of departure: 50% of the gross amount or a 1-day minimum charge.",
          "Within 48 hours before departure and last-minute cancellation or No-Show: 100% of the gross amount will be charged.",
        ],
      },
      { num: "5.2", text: "Once a vehicle has exited the garage for a booking, full charges apply regardless of whether the service is utilised." },
      { num: "5.3", text: "In the event of mechanical failure, accident, or breakdown, MFPL shall make reasonable efforts to arrange a replacement vehicle within a reasonable timeframe. However, MFPL shall not be liable for any delay, inconvenience, loss, or consequential damages arising therefrom. The Client waives any claims in this regard." },
    ],
  },
  {
    num: "6",
    title: "Liability, Safety & Compliance",
    clauses: [
      { num: "6.1", text: "To mitigate driver fatigue and ensure the safety of the client, chauffeurs are mandated to take a 15-minute rest after 2 hours of continuous driving, and a 30-minute rest after 4 hours." },
      { num: "6.2", text: "MFPL assumes no liability for personal belongings left in our vehicles; all items are carried at the sole risk of the client. Specifically, the company disclaims all responsibility for high-value assets, including gold, jewellery, or electronics. If any items are recovered, the client is entirely responsible for all costs associated with their return." },
      { num: "6.3", text: "Clients are liable for all damages to the vehicle or its interior fixtures caused by misuse. MFPL will invoice the hiring party for the total repair costs plus a daily downtime fee for the duration the vehicle remains in the workshop. This amount must be settled in cash or as otherwise directed by the company before the conclusion of the contract or upon demand." },
      { num: "6.4", text: "MFPL shall not be liable for failure or delay in performance due to Force Majeure events, including but not limited to natural disasters, strikes, riots, government restrictions, pandemics, road blockages, or any circumstances beyond reasonable control. During such events, services may be suspended, delayed, or cancelled without any liability, refund, or compensation." },
      {
        num: "6.5",
        text: "MFPL is not liable for indirect losses, including loss of productivity or man-hours, resulting from technical failures or accidents. All vehicles are comprehensively insured; any liability claims must be pursued directly through the respective insurance providers.",
      },
      { num: "6.6", text: "The chauffeur reserves the absolute right to refuse any route, street, or passage deemed unsafe for the passengers, the vehicle, or themselves. Such decisions, based on the chauffeur's professional assessment of risk, shall not be considered a breach of service or a basis for a refund. MFPL disclaims all liability for delays or itinerary changes resulting from these essential safety measures." },
      { num: "6.7", text: "The hiring company agrees not to solicit, recruit, or employ any staff member of MFPL during the service term or for a period of one year thereafter. Breach of this clause shall trigger legal proceedings." },
      {
        num: "6.8",
        text: "Notwithstanding anything contained herein, MFPL’s total aggregate liability under this agreement, whether in contract, tort, or otherwise, shall not exceed the total amount paid by the Client for the specific service giving rise to the claim. Under no circumstances shall MFPL be liable for:",
        subitems: [
          "(i) indirect, incidental, special, or consequential damages",
          "(ii) loss of profit, business, opportunity, or reputation",
          "(iii) delay-related losses",
          "(iv) third-party claims",
        ],
      },
      {
        num: "6.9",
        text: "Service Disruptions MFPL shall not be held liable for:",
        subitems: [
          "(i) delay in arrival or completion of service",
          "(ii) non-availability of vehicle or chauffeur",
          "(iii) trip cancellations due to operational constraints",
          "(iv) traffic congestion, road closures, law & order issues",
          "(v) vehicle breakdown or technical faults",
        ],
      },
      { num: "6.9.1", text: "While MFPL undertakes reasonable background checks and training, it shall not be liable for independent acts, omissions, negligence, or misconduct of chauffeurs beyond the scope of employment. Any dispute arising from driver behaviour shall not give rise to any financial or legal liability on MFPL." },
      { num: "6.9.2", text: "Third-Party Claims: MFPL shall not be liable for any claims, damages, injuries, or losses suffered by any third party during the course of service. All such liabilities shall be governed strictly by applicable motor vehicle insurance policies, and the Client agrees that MFPL bears no independent liability beyond such coverage." },
    ],
  },
  {
    num: "7",
    title: "Grievances, Indemnity & Jurisdiction",
    clauses: [
      { num: "7.1", text: "All service deficiencies or disputes must be reported immediately at the time of occurrence to allow for real-time resolution. MFPL shall not entertain any claims or complaints raised after the conclusion of the service. Formal written complaints must be filed within 24 hours via email to amrit@manntours.com." },
      {
        num: "7.2",
        text: "The Client agrees to fully indemnify, defend, and hold harmless MFPL, its directors, employees, and agents from and against any and all:",
        subitems: [
          "claims, demands, damages, losses",
          "legal proceedings",
          "penalties, fines, or liabilities",
          "third-party claims (including injury, death, property damage)",
        ],
      },
      {
        num: "7.2b",
        text: "arising out of:",
        subitems: [
          "(i) misuse of vehicle",
          "(ii) breach of terms",
          "(iii) acts or omissions of the Client or passengers",
          "(iv) unlawful instructions given to the driver",
        ],
      },
      { num: "7.3", text: "The Client acknowledges that it has not relied upon any representations, assurances, or statements not expressly set out in this agreement. This indemnity shall survive termination of the contract." },
      { num: "7.4", text: "Nothing contained herein shall be deemed to create any partnership, joint venture, or agency relationship between MFPL and the Client." },
      { num: "7.5", text: "MFPL reserves the right to refuse or terminate service without refund in case of unsafe conditions, unlawful activity, or misconduct by the Client or passengers." },
      { num: "7.6", text: "Clauses relating to liability, indemnity, jurisdiction, and dispute resolution shall survive termination." },
      { num: "7.7", text: "These terms and all services rendered shall be governed by and construed in accordance with the laws of the Republic of India." },
      { num: "7.8", text: "The parties irrevocably submit to the exclusive jurisdiction of the competent courts located in Delhi for any legal proceedings." },
      { num: "7.9", text: "Any disputes arising from this contract shall be resolved through arbitration under the Arbitration and Conciliation Act, 1996. The seat of arbitration shall be Delhi, and the language of proceedings shall be English." },
    ],
  },
];

export default function TermsPage() {
  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", background: "var(--bg-base)", minHeight: "100vh" }}>
      <Navbar />

      {/* Hero */}
      <div style={{ background: "var(--bg-deep)", borderBottom: "1px solid var(--border-subtle)", padding: "clamp(4rem, 10vw, 8rem) clamp(1.5rem, 6vw, 4rem) clamp(2.5rem, 6vw, 4rem)" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <p style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.12em", color: "var(--text-40)", textTransform: "uppercase", marginBottom: "1rem" }}>
            Legal
          </p>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.1, margin: "0 0 1rem", letterSpacing: "-0.025em" }}>
            Terms &amp; Conditions of Service
          </h1>
          <p style={{ fontSize: "0.875rem", color: "var(--text-45)", margin: 0 }}>
            Mann Fleet Partners Limited · Effective 2025
          </p>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "clamp(2.5rem, 6vw, 5rem) clamp(1.5rem, 6vw, 4rem)" }}>
        {SECTIONS.map((s) => (
          <section key={s.num} style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-90)", margin: "0 0 1rem", display: "flex", gap: "0.6rem" }}>
              <span style={{ color: "var(--text-35)", minWidth: "1.8rem" }}>{s.num}.</span>
              {s.title}
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              {s.clauses.map((clause) => (
                <div key={clause.num} style={{ paddingLeft: "2.4rem" }}>
                  <p style={{ fontSize: "0.9rem", color: "var(--text-55)", lineHeight: 1.8, margin: 0 }}>
                    <span style={{ fontWeight: 600, color: "var(--text-70)", marginRight: "0.5rem" }}>{clause.num}</span>
                    {clause.text}
                  </p>
                  {clause.subitems && (
                    <ul style={{ paddingLeft: "1.6rem", margin: "0.5rem 0 0", display: "flex", flexDirection: "column", gap: "0.3rem", listStyle: "none" }}>
                      {clause.subitems.map((item, i) => (
                        <li key={i} style={{ fontSize: "0.88rem", color: "var(--text-55)", lineHeight: 1.7, paddingLeft: "0.5rem", borderLeft: "2px solid var(--border-subtle)" }}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
            <div style={{ height: "1px", background: "var(--border-subtle)", marginTop: "2rem" }} />
          </section>
        ))}

        {/* Contact */}
        <section style={{ marginTop: "1rem" }}>
          <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-90)", margin: "0 0 1rem" }}>Contact &amp; Grievances</h2>
          <div style={{ paddingLeft: "2.4rem", display: "flex", flexDirection: "column", gap: "0.3rem" }}>
            <p style={{ fontSize: "0.9rem", color: "var(--text-55)", margin: 0, lineHeight: 1.8 }}>Mann Fleet Partners Limited</p>
            <p style={{ fontSize: "0.9rem", color: "var(--text-55)", margin: 0, lineHeight: 1.8 }}>Email: <a href="mailto:info@mannfleetpartners.com" style={{ color: "var(--accent)", textDecoration: "none" }}>info@mannfleetpartners.com</a></p>
            <p style={{ fontSize: "0.9rem", color: "var(--text-55)", margin: 0, lineHeight: 1.8 }}>Phone: 011-47 20 21 22</p>
            <p style={{ fontSize: "0.9rem", color: "var(--text-55)", margin: 0, lineHeight: 1.8 }}>Address: A-34, Okhla Industrial Area, Phase-I, New Delhi-110020, Delhi, India</p>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
