# Mann Fleet Partners — Website Change Tracker

## ✅ COMPLETED

### Branding & Text
- [x] Change "28+ pickup points" to "80+ cities in India" in USPs
- [x] Add positioning: "more than just a transport management company"
- [x] Add "celebrities" and "world leaders" to the "What We Are" section
- [x] Wherever "Mann" is written, changed to "Mann Fleet Partners" everywhere
- [x] Change email to `info@mannfleetpartners.com` across all pages

### About Page — Timeline
- [x] Typo fix: "200S" → "2005"
- [x] Diplomats entry set to 2002
- [x] All timeline entries use "year onwards" format (not "year–year")
- [x] "2008 onwards" includes sports leagues and cricket leagues
- [x] USA added to 2019 and Today cards
- [x] "Handled transportation for the biggest-ever event in India at Jamnagar" added to Today card

### About Page — Other
- [x] Add G20 and last 4 US Presidential Visits to the "3× award winner" stat pill
- [x] Remove red highlight in "Skilful Execution" quote (uses neutral text colour)
- [x] Add "Our Values" section (split-screen right side of "What Sets Us Apart")
  - Values included: Integrity, Reliability, Discipline, Accountability, Consistency, Willpower
- [x] USA, Nepal, Sri Lanka added to Pan India & Global Reach section
- [x] USA added to Pan-India & Global Reach USP card description

### Meet the Team
- [x] "Founding Directors" heading changed to "Executive Directors"
- [x] CTA button changed from "Contact Us" → "Work Inquiry"
- [x] CTA email updated to `info@mannfleetpartners.com`

### Awards Page
- [x] "Client Testimonials" title made more bold and prominent

### Noida International Airport Page (formerly Flagship Project)
- [x] Nav link changed to "Noida International Airport"
- [x] Page heading changed to "Noida International Airport"
- [x] "Jewar Airport" changed to "Noida International Airport" throughout
- [x] Scale of Opportunity: replaced 3 boxes with 2 boxes
  - 6.5 million expected flyers in first year
  - 20–25% Compound Annual Growth Rate
- [x] "Three Pillars of Mobility" placed above "The Scale of Opportunity"
- [x] Mann Taj Express section added below airport image
- [x] 38 years → 40 years in Mann Fleet Advantage section
- [x] No abbreviation "NIA" used — full form written throughout
- [x] "Experience Mann Fleet Partners at Noida International Airport" at start and end
- [x] Agra added and emphasised in Routes Connecting Region

### We Care Page
- [x] COVID-19 Community Response section added
- [x] EV vehicles / green mobility section added
- [x] Hyperlink to Faze.in (sustainable cars subsidiary) added

### Fleet Page — Local Image Migration
- [x] Maruti Suzuki Ertiga — replaced Unsplash with local images (5 imgs)
- [x] Kia Carens — replaced Unsplash with local images (5 imgs)
- [x] Mahindra XUV700 — replaced Unsplash with local images (6 imgs)
- [x] Ford Endeavour — replaced Unsplash with local images (6 imgs)
- [x] BMW X5 — replaced Unsplash with local images (6 imgs)
- [x] Volvo XC90 — replaced Unsplash with local images (7 imgs)
- [x] Range Rover Sport — replaced Unsplash with local images (6 imgs)
- [x] Hyundai Creta (Self Drive) — replaced Unsplash with local images (6 imgs)
- [x] Added new Hyundai Creta chauffeur-driven entry (Economy Plus SUV)

### Services
- [x] Shuttle Service added to services section

### Navigation & Footer
- [x] Reserve button removed from footer quick links; replaced with "Book Now"
- [x] Book Now links to Google Play app (`play.google.com/store/apps/details?id=com.user.mannfleet`)
- [x] Footer email updated to `info@mannfleetpartners.com`
- [x] Footer copyright updated to "Mann Fleet Partners"

### Legal Pages
- [x] Terms & Conditions of Service page added (full MFPL T&C)
- [x] Privacy Policy page exists

### FAQs Page
- [x] **FAQs page created** — `/faq` route with all 15 FAQ items in accordion layout
- [x] **FAQs added to Navbar** — "FAQs" link added between "We Care" and "Contact"
- [x] **FAQs added to Footer quick links** — "FAQs" link added to footer quick links column

### Meet the Team — Photos
- [x] **Ashok Jha photo** — `Ashok jha.jpeg` copied to `public/teams/` and wired in meet-the-team page
- [x] **Avarjit Singh photo** — `Avarjit Singh.jpeg` copied to `public/teams/` and wired in meet-the-team page
- [x] **Mohammad Sami photo** — `Mohd Sami.jpeg` copied to `public/teams/` and wired in meet-the-team page

---


### Clients / Partners Marquee
- [x] **Add** GE, ASI (Archaeological Survey of India), LG, Bosch logos added to marquee *(Porsche, Parliament of India, Ministry of External Affairs, ICL still awaited)*
- [x] **Remove** French Embassy from clients marquee — removed `WhatsApp Image 2026-04-18 at 17.59.29.jpeg` from PartnersMarquee.tsx

### Awards
- [x] Replace award PDFs with award **pictures** — award cards now show trophy/plaque images; 11 appreciation letters now show image thumbnails
- [x] Arrange awards in order of importance — government-tagged images (`(govenment)` in filename) now referenced correctly; GST Dept & G20 moved to top of Appreciations; AWARDS grid already has National Tourism (govt) awards first

### Noida International Airport Page
- [x] Add **picture of Taj Mahal** to Mann Taj Express section
- [x] Add **image of chauffeur in uniform** — replaced emoji icon with actual image in Noida International Airport page chauffeur card

## 🆕 NEW CLIENT REQUESTS (2026-05-10)

### Noida International Airport Page (flagship-project)
- [x] **Replace "Official Appointment" paragraph** — replaced the "Mann Fleet Partners has been appointed…" paragraph with the Christoph Schnellmann announcement text
- [x] **Remove "WORK WITH US" CTA section** — removed the "Experience Mann Fleet Partners at Noida International Airport" + "Get in Touch" + legal links section from the bottom of the NIA page
- [x] **Remove chauffeur image** from the "Uniformed Chauffeur Service" card in the Mann Taj Express section — removed the `<img>` element, text card remains

### We Care Page
- [x] **Reposition bus image** — added `objectPosition: "left center"` to the `10.07.13.jpeg` (Dekho Apna Desh bus) image in both the Focus Areas (Healthcare card) and Beyond Compliance (Responsibility card)

### Home Page
- [x] **Make "Our Clients" heading plain white** — removed `text-emboss` class, set `color: "#ffffff"` in PartnersMarquee.tsx
- [x] **Add small images to each service row** — added a pill-shaped thumbnail image (visible in normal state, fades on hover) to the right side of each service row in ServicesSection.tsx
- [x] **Fix service arrow buttons** — added `onClick={(e) => e.preventDefault()}` to the anchor to prevent home-page scroll/redirect

### Fleet Page
- [x] **Add Kia Carnival Limousine** to the Luxury SUV segment — added entry with placeholder image (needs actual Kia Carnival photo from client)
- [x] **Add "335+ vehicles owned by us"** — changed fleet hero badge from "200+ Vehicles Available" to "335+ Vehicles Owned by Us"
- [x] **Add all fleet images sent to date** — Mercedes-Benz GLE wired up with 6 local images from `/Mann car pictures/GLE/`
- [x] **Add Toyota Camry Hybrid boot/trunk image** — added `WhatsApp Image 2026-05-10 at 13.55.06.jpeg` to the Camry Hybrid gallery array
- [x] **Add "Our Amenities" section** — added section before Footer on fleet page with 9 bullet points (Napkin used instead of Tissue papers)

### About Page
- [x] **Add "About our company" content block** — added "Who We Are" section with 6 bullet points (Established 1986, ISO certs, etc.)
- [x] **Add "Leading Events handled by us" section** — added alongside "Who We Are" in a 2-column grid with all 14 events listed

---

## ⏳ PENDING — Waiting on Content / Assets

### Meet the Team
- [ ] Add individual bio/story for each team member (from old website or new)
  - Amrit Pal Singh Mann — bio present ✓
  - Parmjeet Mann — bio present ✓
  - Robin Singh Mann — bio present ✓
  - Mr. Ashok Kumar — *no bio, awaiting from Shivani ma'am*
  - Mr. Averjit Singh — *no bio, awaiting from Shivani ma'am*
  - Dr. Mohammad Sami — *no bio, awaiting from Shivani ma'am*
  - Amarjeet Mann — bio added ✓ (from profiles docx; shows in card + "Read Full Profile" modal)
  - Jagdeep Singh Mann — bio added ✓ (from profiles docx; shows in card + "Read Full Profile" modal)
  - Ashwani Kumar — bio added ✓ (from profiles docx; shows in card + "Read Full Profile" modal)

### We Care / CSR
- [x] **Ganga Ram Hospital pay letter** — image received (`WhatsApp Image 2026-05-13 at 17.01.27.jpeg`), copied to `public/We care/` and added to CSR section

### Legal
- [ ] **Refund and Cancellation Policy** page — *awaiting content from Shivani ma'am*

### Fleet Page — Awaiting Local Images
- [x] Range Rover (Vogue / Autobiography / LWB) — replaced Unsplash with 6 local images from `/Mann car pictures/range rover sport/`
- [ ] Tempo Traveller — still on Unsplash, no local images yet

### Other
- [ ] **Download App** link at bottom of website — *app link confirmed: `play.google.com/store/apps/details?id=com.user.mannfleet`* — add to footer CTA area
- [ ] **Add more services** wherever required — *awaiting list from Shivani ma'am*
- [ ] **Our Values** — confirm if additional values beyond the 6 listed need to be added — *ask Shivani ma'am*

---

## ⚠️ NEEDS CLARIFICATION / REQUIRES CODE WORK

| Task | Notes |
|------|-------|
| Typo: "KSA instead of USA" | Cannot locate this typo in the codebase — tell dev which page/section |
| ~~Contact page format~~ | ✅ Done — rebuilt to match Contact_us.md (GST/CIN, correct phone nos, branch office cards for Amarjeet/Jagdeep/Ashwani, Quick Links) |
| Chatbot integration | Every query should go through chatbot first — requires developer to implement |
| Map — 2 overlapping office dots | Layout fix needed — requires developer |
| Remove phone numbers from Meet Our Team | Phone numbers are not currently displayed in meet-the-team page — confirm if resolved |
| ~~Make reservation form shorter~~ | ✅ Done — rebuilt to 6 sections from Reservation_form.md (Title/First/Last, Contact, Trip Duration, Pick-up Details, Drop-off, Requirements) |
| Spot Rentals: remove "less than 30 mins" | This text is not currently in the code — may already be resolved |

---

## 📋 NOTES

- All items marked **"awaiting from Shivani ma'am"** are blocked until content/assets are received.
- Items in the **"Needs Clarification"** table require either a code change (beyond text editing) or more information from the client before work can begin.
- The old website (`mannfleetpartners.com/investor/`) has bios for team members not yet added.
