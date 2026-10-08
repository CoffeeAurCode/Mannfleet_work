"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { WHATSAPP_NUMBER } from "@/lib/contact";

const FAQS = [
  {
    q: "What services does Mann Fleet Partners offer?",
    a: "We provide luxury chauffeur-driven transportation across India, including airport transfers, corporate travel, wedding transportation, intercity journeys, group travel, luxury tours, and event transportation.",
  },
  {
    q: "How do I book a vehicle?",
    a: "You can book directly through our website, contact our team via phone or WhatsApp, or email us with your travel details. Once confirmed, our team handles the rest.",
  },
  {
    q: "Are chauffeurs included with every booking?",
    a: "Yes. All Mann Fleet Partners bookings include professionally trained chauffeurs known for punctuality, discretion, and service excellence, except self-drive vehicle bookings.",
  },
  {
    q: "Do you offer airport pickup and drop services?",
    a: "Yes. We provide airport transfers across major Indian cities with real-time flight tracking to ensure timely pickups, even in the event of delays.",
  },
  {
    q: "What types of vehicles are available?",
    a: "Our fleet includes luxury sedans, SUVs, Mercedes-Benz V-Class vehicles, tempo travellers, minibuses, and coaches for both individual and group transportation needs.",
  },
  {
    q: "What is the range of vehicles available at Mann Fleet Partners?",
    a: "We offer everything from compact sedans and executive SUVs to luxury vans, tempo travellers, minibuses, and full-size coaches, depending on your travel requirements and group size.",
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
    q: "Do you offer self-drive vehicles, spot rentals, or long-term leases?",
    a: "Yes. In addition to chauffeur-driven services, Mann Fleet Partners also offers self-drive vehicles, flexible spot rentals, and long-term leasing solutions for personal, corporate, and operational requirements.",
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
    a: "Yes. We specialise in group transportation and can arrange vehicles for everything from small private groups to large-scale events and delegations.",
  },
  {
    q: "How far in advance should I make a booking?",
    a: "We recommend booking in advance, especially during peak travel seasons and major events. However, subject to availability, we also accommodate last-minute requests whenever possible.",
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

const askInput: React.CSSProperties = {
  width: "100%",
  padding: "0.75rem 1rem",
  borderRadius: "0.75rem",
  background: "var(--glass-ultra)",
  border: "1px solid var(--border-subtle)",
  color: "var(--text-primary)",
  fontSize: "0.9rem",
  fontFamily: "'Poppins', sans-serif",
  outline: "none",
  boxSizing: "border-box",
};

const askLabel: React.CSSProperties = {
  fontSize: "0.75rem",
  fontWeight: 600,
  letterSpacing: "0.04em",
  color: "var(--text-55)",
  textTransform: "uppercase",
};

/**
 * Lets a visitor type a question the list above doesn't answer and send it to
 * the team on WhatsApp. There is no backend, so "send" is a wa.me link with the
 * question prefilled; the visitor still presses send inside WhatsApp.
 * It stays an <a> (not window.open) so MetaPixel's delegated listener counts
 * it as a Contact and popup blockers leave it alone.
 */
function AskQuestion() {
  const [name, setName] = useState("");
  const [question, setQuestion] = useState("");
  const [showHint, setShowHint] = useState(false);

  const trimmed = question.trim();
  const message = [
    "Hello Mann Fleet Partners, I have a question from your FAQ page:",
    "",
    trimmed,
    ...(name.trim() ? ["", `— ${name.trim()}`] : []),
  ].join("\n");
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  return (
    <section
      id="ask-a-question"
      style={{
        padding: "0 clamp(1.5rem, 6vw, 6rem) clamp(3rem, 7vw, 5rem)",
        maxWidth: 860,
        margin: "0 auto",
        scrollMarginTop: "6rem",
      }}
    >
      <div className="glass-panel" style={{ borderRadius: "1.5rem", padding: "clamp(1.5rem, 4vw, 2.25rem)" }}>
        <span className="glass-badge font-sans" style={{ marginBottom: "0.75rem", display: "inline-block" }}>
          Ask Us
        </span>
        <h2
          className="font-serif"
          style={{
            fontSize: "clamp(1.4rem, 3vw, 2rem)",
            fontWeight: 400,
            color: "var(--text-primary)",
            lineHeight: 1.2,
            margin: "0 0 0.5rem",
          }}
        >
          Didn&apos;t find your question?
        </h2>
        <p
          className="font-sans"
          style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.7, margin: "0 0 1.5rem" }}
        >
          Type it below and we&apos;ll open WhatsApp with your question ready to send to our team.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <label style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
            <span className="font-sans" style={askLabel}>Your name (optional)</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              style={askInput}
            />
          </label>

          <label style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
            <span className="font-sans" style={askLabel}>
              Your question<span style={{ color: "var(--accent)", marginLeft: "0.2rem" }}>*</span>
            </span>
            <textarea
              value={question}
              onChange={(e) => {
                setQuestion(e.target.value);
                if (e.target.value.trim()) setShowHint(false);
              }}
              rows={4}
              placeholder="e.g. Can I book a chauffeur for a day trip from Delhi to Jaipur?"
              style={{ ...askInput, resize: "vertical", lineHeight: 1.6 }}
            />
          </label>

          {showHint && (
            <p className="font-sans" role="alert" style={{ fontSize: "0.8rem", color: "var(--accent)", margin: 0 }}>
              Please type your question first.
            </p>
          )}

          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-disabled={!trimmed}
            onClick={(e) => {
              if (!trimmed) {
                e.preventDefault();
                setShowHint(true);
              }
            }}
            className="font-sans"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.6rem",
              width: "fit-content",
              padding: "0.8rem 1.4rem",
              borderRadius: 9999,
              background: "#25D366",
              color: "#fff",
              fontSize: "0.88rem",
              fontWeight: 600,
              textDecoration: "none",
              opacity: trimmed ? 1 : 0.6,
              transition: "opacity 0.18s ease",
            }}
          >
            <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
            </svg>
            Send on WhatsApp
          </a>
        </div>
      </div>
    </section>
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
          <a href="#ask-a-question" style={{ color: "var(--accent)", textDecoration: "none" }}>
            Ask us on WhatsApp.
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

      <AskQuestion />

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
