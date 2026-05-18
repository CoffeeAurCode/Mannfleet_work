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


# Some more changes required from client side 
- front angle should be the first pic (reference pic of the vehicle we are talking about : )


