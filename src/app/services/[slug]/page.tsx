"use client";

import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function ArrowUpRight({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17L17 7" /><path d="M7 7h10v10" />
    </svg>
  );
}

const SERVICE_DATA: Record<string, {
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  stat: string;
  statLabel: string;
  image: string;
}> = {
  "long-term": {
    title: "Long-Term Rentals",
    subtitle: "Enterprise Fleet Solutions",
    description: "End-to-end vehicle rental solutions for institutional fleets and retail customers. Flexible contracts starting at 12 months with comprehensive maintenance and dedicated account management included.",
    features: [
      "Dedicated fleet management team",
      "12+ month flexible contracts",
      "Comprehensive maintenance & support",
      "Corporate billing & reporting",
      "Nationwide coverage across 80+ cities",
      "GST-compliant invoicing",
    ],
    stat: "12+ months",
    statLabel: "minimum contract",
    image: "/Mann car pictures/7 series.png",
  },
  "spot": {
    title: "Spot Rentals",
    subtitle: "On-Demand Chauffeur Services",
    description: "On-demand chauffeur-driven services for corporates, airport transfers, and travel. Available 24/7 across 80+ cities with a fleet of premium, well-maintained vehicles and professional drivers.",
    features: [
      "Instant booking available",
      "Airport & hotel transfers",
      "Corporate travel management",
      "Pan-India coverage",
      "24/7 customer support",
      "Premium chauffeur-driven fleet",
    ],
    stat: "24/7",
    statLabel: "availability",
    image: "/Mann car pictures/S class.png",
  },
  "shuttle": {
    title: "Shuttle Service",
    subtitle: "Scheduled Mobility Solutions",
    description: "Scheduled, high-frequency shuttle operations connecting offices, campuses, and key city nodes. Reliable, GPS-tracked fleet ensuring employees reach their destinations safely and on time.",
    features: [
      "Fixed-route scheduling",
      "Real-time GPS tracking",
      "Employee transport solutions",
      "Campus & office connectivity",
      "80+ cities covered",
      "Safety-first operations",
    ],
    stat: "80+",
    statLabel: "cities covered",
    image: "/Mann car pictures/volvo 39, 43 seater.jpeg",
  },
  "self-drive": {
    title: "Self-Drive Leasing",
    subtitle: "Flexible Vehicle Leasing",
    description: "Flexible self-drive vehicle leasing options for individuals and professionals. Choose from 200+ vehicles across multiple categories — sedans, SUVs, and luxury cars — with zero maintenance hassle.",
    features: [
      "No driver required",
      "200+ vehicles available",
      "Short & long-term lease options",
      "Zero maintenance hassle",
      "Comprehensive insurance coverage",
      "Doorstep delivery available",
    ],
    stat: "200+",
    statLabel: "vehicles available",
    image: "/Mann car pictures/Fortuner.png",
  },
  "event": {
    title: "Event Transportation",
    subtitle: "Bespoke Event Logistics",
    description: "Customised transport for weddings, conferences, delegations, and large-scale events. With 500+ events handled, our dedicated coordinators ensure flawless execution from planning to last-mile delivery.",
    features: [
      "Dedicated event coordinators",
      "Multi-vehicle fleet management",
      "VIP & delegation transfers",
      "Pan-India event logistics",
      "500+ events handled",
      "On-site coordination teams",
    ],
    stat: "500+",
    statLabel: "events handled",
    image: "/Mann car pictures/volvo 39, 43 seater.jpeg",
  },
};

export default function ServicePage() {
  const params = useParams();
  const slug = params.slug as string;
  const service = SERVICE_DATA[slug];

  if (!service) {
    notFound();
  }

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", minHeight: "100vh", background: "var(--bg-base)" }}>
      <Navbar />

      <main>
        {/* ── Hero ── */}
        <section style={{
          padding: "clamp(3rem, 8vw, 6rem) clamp(1.25rem, 5vw, 4rem) 0",
          maxWidth: 1240,
          margin: "0 auto",
        }}>
          <Link
            href="/#services"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              fontSize: "0.78rem",
              fontWeight: 600,
              color: "var(--text-muted)",
              textDecoration: "none",
              marginBottom: "1.5rem",
              letterSpacing: "0.02em",
            }}
          >
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 7L7 17" /><path d="M17 17H7V7" />
            </svg>
            All Services
          </Link>

          <span className="glass-badge" style={{ marginBottom: "1rem", display: "inline-block" }}>
            {service.subtitle}
          </span>

          <div style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: "2rem",
          }}>
            <div style={{ flex: "1 1 400px" }}>
              <h1 className="font-serif" style={{
                fontSize: "clamp(2.6rem, 7vw, 5rem)",
                fontWeight: 400,
                lineHeight: 1.05,
                color: "var(--text-primary)",
                margin: "0 0 1.25rem",
                letterSpacing: "0.01em",
              }}>
                {service.title}
              </h1>
              <p className="font-sans" style={{
                fontSize: "1rem",
                color: "var(--text-secondary)",
                lineHeight: 1.7,
                maxWidth: 520,
                margin: "0 0 2rem",
              }}>
                {service.description}
              </p>
              <Link href="/contact" className="btn-primary" style={{ textDecoration: "none" }}>
                Get a Quote
                <ArrowUpRight size={15} />
              </Link>
            </div>

            {/* Stat card */}
            <div className="glass-card" style={{
              padding: "2rem 2.5rem",
              borderRadius: "1.75rem",
              textAlign: "center",
              minWidth: 180,
              flexShrink: 0,
            }}>
              <p className="font-sans text-emboss" style={{
                fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
                fontWeight: 700,
                color: "var(--text-primary)",
                lineHeight: 1,
                margin: "0 0 0.5rem",
              }}>
                {service.stat}
              </p>
              <p className="font-sans" style={{
                fontSize: "0.78rem",
                color: "var(--text-muted)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                fontWeight: 600,
                margin: 0,
              }}>
                {service.statLabel}
              </p>
            </div>
          </div>
        </section>

        {/* ── Hero Image ── */}
        <section style={{
          padding: "3rem clamp(1.25rem, 5vw, 4rem)",
          maxWidth: 1240,
          margin: "0 auto",
        }}>
          <div style={{
            borderRadius: "2rem",
            overflow: "hidden",
            height: "clamp(220px, 40vw, 500px)",
            border: "1px solid var(--border-subtle)",
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={service.image}
              alt={service.title}
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
            />
          </div>
        </section>

        {/* ── Features ── */}
        <section style={{
          padding: "0 clamp(1.25rem, 5vw, 4rem) clamp(4rem, 8vw, 6rem)",
          maxWidth: 1240,
          margin: "0 auto",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
            <div style={{ width: 28, height: 2, background: "var(--accent)", borderRadius: 2 }} />
            <span className="font-sans" style={{
              fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.16em",
              textTransform: "uppercase", color: "var(--text-muted)",
            }}>What&apos;s included</span>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 280px), 1fr))",
            gap: "1rem",
          }}>
            {service.features.map((feature) => (
              <div key={feature} className="glass-card" style={{
                padding: "1.25rem 1.5rem",
                borderRadius: "1.25rem",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
              }}>
                <div style={{
                  width: 28, height: 28, borderRadius: "8px", flexShrink: 0,
                  background: "linear-gradient(135deg, rgba(200,40,40,0.18) 0%, rgba(200,40,40,0.06) 100%)",
                  border: "1px solid rgba(200,40,40,0.28)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "var(--accent)",
                }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <span className="font-sans" style={{
                  fontSize: "0.85rem", fontWeight: 600, color: "var(--text-primary)", lineHeight: 1.4,
                }}>
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA Banner ── */}
        <section style={{
          padding: "0 clamp(1.25rem, 5vw, 4rem) clamp(4rem, 8vw, 6rem)",
          maxWidth: 1240,
          margin: "0 auto",
        }}>
          <div className="glass-card" style={{
            padding: "clamp(2rem, 5vw, 3.5rem)",
            borderRadius: "2rem",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1.5rem",
          }}>
            <div>
              <h2 className="font-serif" style={{
                fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
                fontWeight: 400,
                color: "var(--text-primary)",
                margin: "0 0 0.5rem",
                letterSpacing: "0.01em",
              }}>
                Ready to get started?
              </h2>
              <p className="font-sans" style={{
                fontSize: "0.9rem",
                color: "var(--text-secondary)",
                margin: 0,
                lineHeight: 1.6,
              }}>
                Our team will find the perfect solution tailored to your needs.
              </p>
            </div>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <Link href="/reservation" className="btn-primary" style={{ textDecoration: "none" }}>
                Book Now
                <ArrowUpRight size={15} />
              </Link>
              <Link href="/contact" style={{
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.75rem 1.5rem",
                borderRadius: 9999,
                border: "1.5px solid var(--border-mid)",
                fontSize: "0.88rem",
                fontWeight: 600,
                color: "var(--text-primary)",
                background: "transparent",
              }}>
                Talk to us
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
