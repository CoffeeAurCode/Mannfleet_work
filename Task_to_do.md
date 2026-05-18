# Client Feedback Tasks

## Completed ✅

- **Mann logo on top left doesn't take to landing page**
  Fixed: LogoIntro now sets `sessionStorage` flag on dismiss so HeroSection's GSAP animation runs immediately on return visits, keeping the Navbar visible and clickable.

- **Spot rental picture to be changed**
  Updated to Mercedes-Benz E-Class image in both ServicesSection and service detail page.

- **Shuttle service picture to be changed**
  Updated to Force Urbania image in both ServicesSection and service detail page.

- **Self driving picture to be changed**
  Updated to Hyundai Creta image in both ServicesSection and service detail page.

- **Event transport picture to be changed**
  Updated to Vellfire image in both ServicesSection and service detail page.

- **All hyperlinks after event transport don't work**
  Fixed: Added missing service data (pan-india-mobility, film-shoots-concerts, global-leaders-celebrities, conventions-exhibitions, leasing, high-profile-delegation, board-meetings, agm-board-meets, leagues-tournaments, events-weddings, town-hall-meetings, tourism) to `/services/[slug]/page.tsx`.

- **None of the documents in investors tab open**
  Fixed path: `BASE` was `/Mann%20Investors%20/` (with trailing space, folder didn't exist) → corrected to `/Mann%20Investors/` and created `public/Mann Investors/` folder.
  ⚠️ **Action needed**: Upload the investor PDF files into `public/Mann Investors/` matching the filenames listed in `investors/page.tsx`.

- **Kia Carnival Limousine pics added**
  Fixed: Was incorrectly using Kia Carens images. Now uses all 8 images from `/Mann car pictures/Kia Carnival Limousine/` with `Kia carnival front.jpeg` as the first (cover) image.

- **Front pictures first for fleet cards**
  Updated the following cars to show their real front photo as the first image:
  - Hyundai Aura (`hyundau aura front.jpeg`)
  - BMW 5 Series (`BMW 5 series front.jpeg`)
  - Toyota Camry Hybrid + Camry Self Drive (`toyota camry hybrid front.jpeg`)
  - Toyota Fortuner + Fortuner Self Drive (`Toyota fortuner front.jpeg`)
  - Kia Carnival Limousine (`Kia carnival front.jpeg`)

---

## Pending / Needs Clarification ❓

- **Car policy not showing**
  No "car policy" section or PDF was found anywhere in the codebase or `public/` folder. Please clarify:
  - What is the car policy? A PDF document? A page section?
  - Where should it appear (fleet page, reservation page, self-drive section)?
  - Please provide the car policy PDF file so it can be added.


# Some more changes required from client side — Completed ✅

- **Tempo Traveller front angle first** — Reordered images: direct front (11_18_13), then 3/4 front (11_18_08), then interior shots.
- **6.5 Million space** — Added space: `"6.5"` + `" Million"` in flagship-project/page.tsx stat card.
- **Full form of NIA** — Changed `"NIA Inauguration"` → `"Noida International Airport Inauguration"` in flagship-project/page.tsx.
- **Map zoom** — YES, zooming in is possible. Increased default from `zoom={5}` to `zoom={5.5}` (with `zoomSnap={0.5}`) in IndiaMapLeaflet.tsx.
- **Hyundai Aura white + front first** — Replaced all 4 exterior (black) images with 5 white images from `Aura white.zip`. Front view is first. Kept all 3 interior images (dashboard, rear seat, trunk).
- **Toyota Camry Hybrid front first** — Added `toyota camry hybrid front.jpeg` as first image in both Camry Hybrid and Camry Self Drive fleet entries.
- **Mercedes-Benz Sprinter Executive images** — Replaced all images with the 5 new ones from `merecedes benz sprinter 9 seater 2.zip` (front view first).
- **Toyota Hyryder added to SUV Economy** — Extracted `Toyota hyryder.zip`, added new entry (`toyota-hyryder`) in fleet/page.tsx SUV ECONOMY section. Front view first.
- **Globe icon white (Diplomatic Excellence)** — Changed icon colour from `var(--accent)` (red) to `var(--text-primary)` (white in dark mode) in about/page.tsx.
- **Services 404** — Code already has data for all slugs (conventions-exhibitions, leasing, high-profile-delegation, board-meetings, agm-board-meets, leagues-tournaments, events-weddings, town-hall-meetings, tourism). This is a **Vercel deployment lag** — redeploy/push to fix.
- **"On-Time Guarantee" pill same colour as Luxury Fleet** — Removed the `#fff` special case for pill index 2 in BentoSection.tsx. All inactive pills now use `var(--map-badge-bg)` consistently.


