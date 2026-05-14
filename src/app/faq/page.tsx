"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const FAQS = [
  {
    q: "What services does Mann Fleet Partners offer?",
    a: "We provide luxury chauffeur driven transportation across India, including airport transfers, corporate travel, wedding transportation, intercity journeys, group travel, luxury tours, and event transportation.",
  },
  {
    q: "How do I book a vehicle?",
    a: "You can book directly through our website, contact our team via phone or WhatsApp, or email us with your travel details. Once confirmed, our team handles the rest.",
  },
  {
    q: "Are chauffeurs included with every booking?",
    a: "Yes. All Mann Fleet Partners bookings include professionally trained chauffeurs known for punctuality, discretion, and service excellence, except self drive vehicle bookings.",
  },
  {
    q: "Do you offer airport pickup and drop services?",
    a: "Yes. We provide airport transfers across major Indian cities with real time flight tracking to ensure timely pickups, even in the event of delays.",
  },
  {
    q: "What types of vehicles are available?",
    a: "Our fleet includes luxury sedans, SUVs, Mercedes Benz V Class vehicles, tempo travellers, minibuses, and coaches for both individual and group transportation needs.",
  },
  {
    q: "What is the range of vehicles available at Mann Fleet Partners?",
    a: "We offer everything from compact sedans and executive SUVs to luxury vans, tempo travellers, minibuses, and full size coaches, depending on your travel requirements and group size.",
  },
  {
    q: "Can you arrange transportation for corporate events?",
    a: "Absolutely. We regularly manage transportation for conferences, executive travel, business delegations, employee movement, and corporate events.",
  },
  {
    q: "Do you provide wedding transportation?",
    a: "Yes. We offer luxury transportation for weddings, including guest shuttles, bridal vehicles, airport transfers, and complete event transportation coordination.",
  },
  {
    q: "Is intercity travel available?",
    a: "Yes. We provide premium intercity chauffeur services between major cities and tourist destinations across India, including Delhi, Agra, Jaipur, Chandigarh, and more.",
  },
  {
    q: "Do you provide tour guides?",
    a: "Yes. Upon request, we can arrange experienced local tour guides for destinations across India to make your travel experience more seamless and informative.",
  },
  {
    q: "Do you offer self drive vehicles, spot rentals, or long term leases?",
    a: "Yes. In addition to chauffeur driven services, Mann Fleet Partners also offers self drive vehicles, flexible spot rentals, and long term leasing solutions for personal, corporate, and operational requirements.",
  },
  {
    q: "What is included in the Mann Taj Express service?",
    a: "The Mann Taj Express is our premium transfer experience between Delhi and Agra, designed for travellers visiting the Taj Mahal in comfort, privacy, and convenience.",
  },
  {
    q: "Are your vehicles sanitized and well maintained?",
    a: "Yes. Every vehicle is regularly inspected, professionally maintained, and cleaned before each journey to ensure comfort, reliability, and safety.",
  },
  {
    q: "Can I book transportation for large groups?",
    a: "Yes. We specialise in group transportation and can arrange vehicles for everything from small private groups to large scale events and delegations.",
  },
  {
    q: "How far in advance should I make a booking?",
    a: "We recommend booking in advance, especially during peak travel seasons and major events. However, subject to availability, we also accommodate last minute requests whenever possible.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="glass-panel"
      style={{
        borderRadius: "1rem",
        overflow: "hidden",
        marginBottom: "0.75rem",
        cursor: "pointer",
        transition: "background 0.2s",
      }}
      onClick={() => setOpen((o) => !o)}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1.25rem 1.5rem",
          gap: "1rem",
        }}
      >
        <span
          className="font-sans"
          style={{
            fontSize: "0.95rem",
            fontWeight: 600,
            color: "var(--text-primary)",
            lineHeight: 1.5,
          }}
        >
          {q}
        </span>
        <span
          style={{
            flexShrink: 0,
            width: 28,
            height: 28,
            borderRadius: "50%",
            background: open ? "var(--accent)" : "var(--glass-light)",
            border: "1px solid var(--border-subtle)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: open ? "#fff" : "var(--text-primary)",
            fontSize: "1.1rem",
            lineHeight: 1,
            transition: "background 0.2s, color 0.2s",
            userSelect: "none",
          }}
        >
          {open ? "−" : "+"}
        </span>
      </div>
      {open && (
        <div
          style={{
            padding: "0 1.5rem 1.25rem",
            borderTop: "1px solid var(--border-subtle)",
          }}
        >
          <p
            className="font-sans"
            style={{
              fontSize: "0.875rem",
              lineHeight: 1.75,
              color: "var(--text-secondary)",
              margin: "1rem 0 0",
            }}
          >
            {a}
          </p>
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-base)" }}>
      <Navbar />

      {/* Hero */}
      <section
        style={{
          padding: "clamp(7rem, 14vw, 11rem) clamp(1.5rem, 6vw, 6rem) clamp(4rem, 8vw, 6rem)",
          background: "var(--bg-deeper)",
          borderBottom: "1px solid var(--border-subtle)",
          textAlign: "center",
        }}
      >
        <span
          className="glass-badge font-sans"
          style={{ marginBottom: "1.5rem", display: "inline-block" }}
        >
          Help Centre
        </span>
        <h1
          className="font-serif"
          style={{
            fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
            fontWeight: 400,
            color: "var(--text-primary)",
            lineHeight: 1.1,
            margin: "0 0 1.25rem",
          }}
        >
          Frequently Asked Questions
        </h1>
        <p
          className="font-sans"
          style={{
            fontSize: "1rem",
            color: "var(--text-secondary)",
            maxWidth: 540,
            margin: "0 auto",
            lineHeight: 1.7,
          }}
        >
          Everything you need to know about booking, vehicles, and our services. Can&apos;t find an answer?{" "}
          <a href="/contact" style={{ color: "var(--accent)", textDecoration: "none" }}>
            Contact us directly.
          </a>
        </p>
      </section>

      {/* FAQ list */}
      <section
        style={{
          padding: "clamp(3rem, 7vw, 5rem) clamp(1.5rem, 6vw, 6rem)",
          maxWidth: 860,
          margin: "0 auto",
        }}
      >
        {FAQS.map((item) => (
          <FAQItem key={item.q} q={item.q} a={item.a} />
        ))}
      </section>

      {/* CTA */}
      <section
        style={{
          padding: "clamp(3rem, 7vw, 5rem) clamp(1.5rem, 6vw, 6rem)",
          textAlign: "center",
          background: "var(--bg-surface)",
          borderTop: "1px solid var(--border-subtle)",
        }}
      >
        <h2
          className="font-serif"
          style={{
            fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)",
            fontWeight: 400,
            color: "var(--text-primary)",
            margin: "0 0 1rem",
          }}
        >
          Ready to Book?
        </h2>
        <p
          className="font-sans"
          style={{
            fontSize: "0.9rem",
            color: "var(--text-secondary)",
            marginBottom: "2rem",
          }}
        >
          Experience premium chauffeur-driven transportation across India.
        </p>
        <a
          href="/reservation"
          className="btn-primary font-sans"
          style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
        >
          Make a Reservation
        </a>
      </section>

      <Footer />
    </div>
  );
}
