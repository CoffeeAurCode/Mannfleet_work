"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/* ── Icons ─────────────────────────────────────────────────── */
function ArrowUpRight({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17L17 7" /><path d="M7 7h10v10" />
    </svg>
  );
}

function CheckCircleIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  );
}

/* ── Shared input style ────────────────────────────────────── */
const inputBase: React.CSSProperties = {
  width: "100%",
  padding: "0.75rem 1rem",
  borderRadius: "0.75rem",
  background: "var(--glass-ultra)",
  border: "1px solid var(--border-subtle)",
  color: "var(--text-primary)",
  fontSize: "0.9rem",
  fontFamily: "'Poppins', sans-serif",
  outline: "none",
  transition: "border-color 0.18s ease",
};

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
      <label className="font-sans" style={{
        fontSize: "0.78rem",
        fontWeight: 600,
        letterSpacing: "0.04em",
        color: "var(--text-55)",
        textTransform: "uppercase",
      }}>
        {label}{required && <span style={{ color: "var(--accent)", marginLeft: "0.2rem" }}>*</span>}
      </label>
      {children}
    </div>
  );
}

function Input({
  type = "text",
  placeholder,
  value,
  onChange,
  required,
  readOnly,
}: {
  type?: string;
  placeholder?: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  readOnly?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      readOnly={readOnly}
      style={{
        ...inputBase,
        borderColor: focused ? "var(--accent)" : "var(--border-subtle)",
        cursor: readOnly ? "default" : "text",
        opacity: readOnly ? 0.7 : 1,
      }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    />
  );
}

function Select({
  value,
  onChange,
  required,
  children,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
  children: React.ReactNode;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <select
      value={value}
      onChange={onChange}
      required={required}
      style={{
        ...inputBase,
        borderColor: focused ? "var(--accent)" : "var(--border-subtle)",
        appearance: "none",
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23888' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right 1rem center",
        paddingRight: "2.5rem",
      }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      {children}
    </select>
  );
}

function Textarea({
  placeholder,
  value,
  onChange,
  rows = 4,
}: {
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      rows={rows}
      style={{
        ...inputBase,
        borderColor: focused ? "var(--accent)" : "var(--border-subtle)",
        resize: "vertical",
        lineHeight: 1.6,
      }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    />
  );
}

function RadioGroup({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div style={{ display: "flex", gap: "1rem" }}>
      {["Yes", "No"].map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          style={{
            flex: 1,
            padding: "0.65rem 1rem",
            borderRadius: "0.75rem",
            border: `1px solid ${value === opt ? "var(--accent)" : "var(--border-subtle)"}`,
            background: value === opt ? "rgba(200,40,42,0.08)" : "var(--glass-ultra)",
            color: value === opt ? "var(--accent)" : "var(--text-secondary)",
            fontSize: "0.88rem",
            fontWeight: value === opt ? 600 : 400,
            fontFamily: "'Poppins', sans-serif",
            cursor: "pointer",
            transition: "all 0.18s ease",
          }}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

/* ── Section card wrapper ──────────────────────────────────── */
function SectionCard({
  badge,
  title,
  subtitle,
  children,
}: {
  badge: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="glass-panel" style={{
      borderRadius: "1.5rem",
      padding: "clamp(1.5rem, 4vw, 2.25rem)",
    }}>
      <div style={{ marginBottom: "1.75rem" }}>
        <span className="glass-badge" style={{ marginBottom: "0.75rem", display: "inline-block" }}>
          {badge}
        </span>
        <h2 className="font-serif" style={{
          fontSize: "clamp(1.25rem, 2.5vw, 1.7rem)",
          fontWeight: 400,
          color: "var(--text-primary)",
          lineHeight: 1.2,
          margin: 0,
        }}>
          {title}
        </h2>
        {subtitle && (
          <p className="font-sans" style={{
            fontSize: "0.82rem",
            color: "var(--text-muted)",
            margin: "0.4rem 0 0",
          }}>{subtitle}</p>
        )}
      </div>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
        gap: "1.25rem",
      }}>
        {children}
      </div>
    </div>
  );
}

/* ── Main page ─────────────────────────────────────────────── */
export default function ReservationPage() {
  const [submitted, setSubmitted] = useState(false);

  // Personal
  const [fullName, setFullName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");

  // Professional
  const [occupation, setOccupation] = useState("");
  const [company, setCompany] = useState("");
  const [workLocation, setWorkLocation] = useState("");

  // Travel
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [numberOfDays, setNumberOfDays] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");

  // Passengers
  const [totalPassengers, setTotalPassengers] = useState("");
  const [adults, setAdults] = useState("");
  const [childrenOlder, setChildrenOlder] = useState("");
  const [childrenYounger, setChildrenYounger] = useState("");

  // Vehicle
  const [vehicleCategory, setVehicleCategory] = useState("");
  const [numberOfVehicles, setNumberOfVehicles] = useState("");
  const [luggageCount, setLuggageCount] = useState("");
  const [chauffeur, setChauffeur] = useState("");
  const [tourGuide, setTourGuide] = useState("");

  // Additional services
  const [airportTransfer, setAirportTransfer] = useState("");
  const [intraCityTravel, setIntraCityTravel] = useState("");
  const [corporateBooking, setCorporateBooking] = useState("");
  const [specialRequirements, setSpecialRequirements] = useState("");

  // Additional info
  const [otherServices, setOtherServices] = useState("");
  const [specialInstructions, setSpecialInstructions] = useState("");

  // Auto-calculate days
  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
      setNumberOfDays(diff > 0 ? String(diff) : "");
    } else {
      setNumberOfDays("");
    }
  }, [startDate, endDate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (submitted) {
    return (
      <div style={{ fontFamily: "'Poppins', sans-serif", minHeight: "100vh", background: "var(--bg-base)" }}>
        <Navbar />
        <main style={{
          padding: "clamp(3rem, 8vw, 6rem) clamp(1.25rem, 5vw, 4rem)",
          maxWidth: 720,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: "2rem",
        }}>
          <div className="glass-panel" style={{
            borderRadius: "1.75rem",
            padding: "clamp(2.5rem, 6vw, 4rem)",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1.5rem",
          }}>
            <div style={{ color: "var(--accent)" }}>
              <CheckCircleIcon size={56} />
            </div>
            <div>
              <h1 className="font-serif" style={{
                fontSize: "clamp(2rem, 5vw, 3rem)",
                fontWeight: 400,
                color: "var(--text-primary)",
                lineHeight: 1.1,
                margin: "0 0 0.75rem",
              }}>
                Reservation<br />
                <span className="italic" style={{ color: "var(--text-secondary)" }}>Received</span>
              </h1>
              <p className="font-sans" style={{
                fontSize: "0.95rem",
                color: "var(--text-secondary)",
                lineHeight: 1.7,
                margin: 0,
                maxWidth: 420,
              }}>
                Thank you, <strong style={{ color: "var(--text-primary)" }}>{fullName || "valued guest"}</strong>. Our team will review your booking request and get back to you within 2 hours. For urgent assistance, reach us on WhatsApp.
              </p>
            </div>

            <a
              href="https://wa.me/919990222999"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.6rem",
                padding: "0.85rem 1.75rem",
                borderRadius: "9999px",
                background: "rgba(37,211,102,0.12)",
                border: "1px solid rgba(37,211,102,0.35)",
                color: "#25D366",
                fontSize: "0.9rem",
                fontWeight: 600,
                textDecoration: "none",
                fontFamily: "'Poppins', sans-serif",
                transition: "background 0.18s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(37,211,102,0.20)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(37,211,102,0.12)"; }}
            >
              <WhatsAppIcon size={18} />
              Chat on WhatsApp
            </a>

            <Link href="/" style={{
              fontSize: "0.82rem",
              color: "var(--text-muted)",
              textDecoration: "none",
              borderBottom: "1px solid var(--border-subtle)",
            }}>
              Back to home
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", minHeight: "100vh", background: "var(--bg-base)" }}>
      <Navbar />

      <main style={{
        padding: "clamp(3rem, 8vw, 6rem) clamp(1.25rem, 5vw, 4rem)",
        maxWidth: 1000,
        margin: "0 auto",
      }}>

        {/* ── Page header ── */}
        <div style={{ marginBottom: "clamp(2.5rem, 5vw, 4rem)" }}>
          <span className="glass-badge" style={{ marginBottom: "1rem", display: "inline-block" }}>
            Book Your Vehicle
          </span>
          <h1 className="font-serif" style={{
            fontSize: "clamp(2.4rem, 6vw, 4.5rem)",
            fontWeight: 400,
            lineHeight: 1.05,
            color: "var(--text-primary)",
            margin: "0 0 1rem",
            letterSpacing: "0.01em",
          }}>
            Make a<br />
            <span className="italic" style={{ color: "var(--text-secondary)" }}>Reservation</span>
          </h1>
          <p className="font-sans" style={{
            fontSize: "1rem",
            color: "var(--text-secondary)",
            lineHeight: 1.7,
            maxWidth: 480,
            margin: 0,
          }}>
            Complete the form below and our team will confirm your booking within 2 hours. Fields marked <span style={{ color: "var(--accent)" }}>*</span> are required.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

          {/* ── 1. Personal Information ── */}
          <SectionCard badge="01" title="Personal Information">
            <Field label="Full Name" required>
              <Input placeholder="e.g. Arjun Sharma" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
            </Field>
            <Field label="Contact Number" required>
              <Input type="tel" placeholder="+91 99902 22999" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} required />
            </Field>
            <Field label="Email Address" required>
              <Input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </Field>
            <Field label="Country of Residence" required>
              <Input placeholder="e.g. India" value={country} onChange={(e) => setCountry(e.target.value)} required />
            </Field>
            <Field label="City / Current Location">
              <Input placeholder="e.g. New Delhi" value={city} onChange={(e) => setCity(e.target.value)} />
            </Field>
            <Field label="Address">
              <Input placeholder="Street, Area" value={address} onChange={(e) => setAddress(e.target.value)} />
            </Field>
          </SectionCard>

          {/* ── 2. Professional Information ── */}
          <SectionCard
            badge="02"
            title="Professional Information"
            subtitle="Optional — helps us serve premium and corporate clients better"
          >
            <Field label="Occupation / Job Title">
              <Input placeholder="e.g. Managing Director" value={occupation} onChange={(e) => setOccupation(e.target.value)} />
            </Field>
            <Field label="Company / Organisation Name">
              <Input placeholder="e.g. Acme Corporation" value={company} onChange={(e) => setCompany(e.target.value)} />
            </Field>
            <Field label="Work Location (City / Country)">
              <Input placeholder="e.g. Mumbai, India" value={workLocation} onChange={(e) => setWorkLocation(e.target.value)} />
            </Field>
          </SectionCard>

          {/* ── 3. Travel & Booking Details ── */}
          <SectionCard badge="03" title="Travel & Booking Details">
            <Field label="Start Date of Travel" required>
              <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
            </Field>
            <Field label="End Date of Travel" required>
              <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
            </Field>
            <Field label="Number of Days">
              <Input
                value={numberOfDays ? `${numberOfDays} day${numberOfDays === "1" ? "" : "s"}` : ""}
                readOnly
                placeholder="Auto-calculated"
              />
            </Field>
            <Field label="Pick-up Location" required>
              <Input placeholder="e.g. Indira Gandhi International Airport, T3" value={pickupLocation} onChange={(e) => setPickupLocation(e.target.value)} required />
            </Field>
            <Field label="Drop-off Location" required>
              <Input placeholder="e.g. The Leela Palace, New Delhi" value={dropoffLocation} onChange={(e) => setDropoffLocation(e.target.value)} required />
            </Field>
          </SectionCard>

          {/* ── 4. Passenger Details ── */}
          <SectionCard badge="04" title="Passenger Details">
            <Field label="Total Number of Passengers" required>
              <Input type="number" placeholder="e.g. 4" value={totalPassengers} onChange={(e) => setTotalPassengers(e.target.value)} required />
            </Field>
            <Field label="Number of Adults (18+)">
              <Input type="number" placeholder="e.g. 2" value={adults} onChange={(e) => setAdults(e.target.value)} />
            </Field>
            <Field label="Number of Children (12–18)">
              <Input type="number" placeholder="e.g. 1" value={childrenOlder} onChange={(e) => setChildrenOlder(e.target.value)} />
            </Field>
            <Field label="Number of Children (Below 12)">
              <Input type="number" placeholder="e.g. 1" value={childrenYounger} onChange={(e) => setChildrenYounger(e.target.value)} />
            </Field>
          </SectionCard>

          {/* ── 5. Vehicle & Service Preferences ── */}
          <SectionCard badge="05" title="Vehicle & Service Preferences">
            <Field label="Vehicle Category" required>
              <Select value={vehicleCategory} onChange={(e) => setVehicleCategory(e.target.value)} required>
                <option value="" disabled>Select a category</option>
                <option value="Economy">Economy</option>
                <option value="Economy Plus">Economy Plus</option>
                <option value="Premium">Premium</option>
                <option value="Premium Plus">Premium Plus</option>
                <option value="Luxury">Luxury</option>
                <option value="Super Luxury">Super Luxury</option>
                <option value="Rolls Royce">Rolls Royce</option>
                <option value="Range Rover">Range Rover</option>
                <option value="Self Driving">Self Driving</option>
                <option value="Long Term Leasing">Long Term Leasing</option>
              </Select>
            </Field>
            <Field label="Number of Vehicles Required" required>
              <Input type="number" placeholder="e.g. 2" value={numberOfVehicles} onChange={(e) => setNumberOfVehicles(e.target.value)} required />
            </Field>
            <Field label="Number of Luggage / Bags">
              <Input type="number" placeholder="e.g. 3" value={luggageCount} onChange={(e) => setLuggageCount(e.target.value)} />
            </Field>
            <Field label="Require a Chauffeur?">
              <RadioGroup value={chauffeur} onChange={setChauffeur} />
            </Field>
            <Field label="Require a Tour Guide?">
              <RadioGroup value={tourGuide} onChange={setTourGuide} />
            </Field>
          </SectionCard>

          {/* ── 6. Additional Services ── */}
          <SectionCard badge="06" title="Additional Services">
            <Field label="Airport Transfers Required?">
              <RadioGroup value={airportTransfer} onChange={setAirportTransfer} />
            </Field>
            <Field label="Intra-city Travel Required?">
              <RadioGroup value={intraCityTravel} onChange={setIntraCityTravel} />
            </Field>
            <Field label="Corporate / Event Booking?">
              <RadioGroup value={corporateBooking} onChange={setCorporateBooking} />
            </Field>
            <div style={{ gridColumn: "1 / -1" }}>
              <Field label="Special Requirements">
                <Input
                  placeholder="VIP handling, security, language preference, accessibility needs…"
                  value={specialRequirements}
                  onChange={(e) => setSpecialRequirements(e.target.value)}
                />
              </Field>
            </div>
          </SectionCard>

          {/* ── 7. Additional Information ── */}
          <SectionCard badge="07" title="Additional Information">
            <div style={{ gridColumn: "1 / -1" }}>
              <Field label="Any Other Services You Are Looking For">
                <Textarea
                  placeholder="Describe any other services or requirements you have in mind…"
                  value={otherServices}
                  onChange={(e) => setOtherServices(e.target.value)}
                  rows={3}
                />
              </Field>
            </div>
            <div style={{ gridColumn: "1 / -1" }}>
              <Field label="Special Instructions / Notes">
                <Textarea
                  placeholder="Any specific instructions for our team…"
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  rows={4}
                />
              </Field>
            </div>
          </SectionCard>

          {/* ── Submit ── */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
            padding: "0.5rem 0",
          }}>
            <p className="font-sans" style={{
              fontSize: "0.78rem",
              color: "var(--text-muted)",
              margin: 0,
            }}>
              We&apos;ll confirm your booking within 2 hours of submission.
            </p>
            <button
              type="submit"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.85rem 2rem",
                borderRadius: "9999px",
                background: "var(--accent)",
                color: "#ffffff",
                border: "none",
                fontSize: "0.9rem",
                fontWeight: 600,
                fontFamily: "'Poppins', sans-serif",
                cursor: "pointer",
                boxShadow: "0 4px 20px rgba(200,40,42,0.30)",
                transition: "transform 0.15s ease, box-shadow 0.15s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.boxShadow = "0 8px 28px rgba(200,40,42,0.40)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(200,40,42,0.30)";
              }}
            >
              Submit Reservation
              <ArrowUpRight size={14} />
            </button>
          </div>

        </form>
      </main>

      <Footer />
    </div>
  );
}
