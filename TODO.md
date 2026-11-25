## 25 Nov 2026 — vehicle-details WhatsApp after a booking (WhatsApp, via Subhayu)

The client forwarded their booking-confirmation message (the "UPDATED vehicle detail… Thanks & Regards, Chittaranjan" sample, for a 3 Aug 2026 GLS shoot booking). Their messages said: "After the booking is confirmed this kind of message should go". Then "bookings- 9810008008, this is the number". Then the Tata Tele Business Omni login: "Please give to app developer for whatsapp integration… the template should not be changed". Subhayu: "Kal chahiye inko ye", meaning they need it the next day.
- **What their Omni account already has** (checked 25 Nov, read-only): WhatsApp Business API live and Meta-verified, quality High. It sends from **+91 74288 27400**, not 9810008008. There's an API key "MannBackend" (22 Oct) and 7 approved templates. `vdetails` and `revisedvd` (8 Dec 2025) are the WhatsApp form of the client's sample: the same fields plus Job No, Bill To, Booked By, helpline and a "Call us" button. Their staff have sent `vdetails` by hand as dashboard campaigns since June 2026, last on 2 Nov. Our reading is that "the template should not be changed" means these approved templates. A new template in the sample's exact wording was drafted but never submitted.
- **Built:** `/staff/vehicle-details`, a password-protected staff page. Staff fill in the allotted booking, pick Vehicle details (`vdetails`) or Revised (`revisedvd`), and press Send. It goes to the customer through Omni's API, with the approved text unchanged. See CLAUDE.md pattern 13.
- Tested 25 Nov: one real `vdetails` send to Pranav's number, which Omni accepted.
- **Before it goes live:** in Vercel, set `OMNI_ACCESS_TOKEN` and `STAFF_PASSWORD` (Production), then redeploy. Give the staff password and the page URL to Mann's ops team privately.
- **Ask the client:**
  1. Messages come from +91 74288 27400, the number on their Omni account. To send from 9810008008 instead, they need Tata to connect it to their Omni/WhatsApp Business account. Is 74288 27400 fine for now?
  2. Who on their team will use the staff page? We'll share the link and password with them.
  3. The Omni login was shared over WhatsApp. They should change that password.

## 18 Nov 2026 — About page + rotating vehicle gallery (WhatsApp)

- **About hero:** "Founded 1986" now sits above "Our Story" (the old "Est. 1986" line below it is gone) and a "Scroll down" cue sits at the bottom. This is our reading of "Our story — scroll down. Should be written above — founded 1986".
- **Timeline:** added 2010 (IPL teams, Commonwealth Games) and 2011 (Formula 1, Champions League, Kabaddi World Cup, US Presidential visits). The national awards were already there as the 2016–2019 card.
- **Case studies:** new `#case-studies` section on /about with 6 cards (G20, US Presidential visits, Formula 1, sporting mega-events, Jamnagar, Noida airport). Every fact comes from the existing Major Events / Awards tables; nothing new was invented.
- **Rotating gallery** for Urbania (both cards), Volvo (both coach cards), Sprinter (all 3 cards), Coaster, Hiace, Bharat Benz and Jet on Wheels. It is built from each vehicle's photos; there are no real 3D models. The client asked not to label it as 3D.
- **Ask the client:**
  1. There is no 6-seater Sprinter card (cards are 11/14, 7–9 and 8-seat washroom). Is one missing?
  2. Bharat Benz Coach was off the site since 13 May; we restored it under Economy coaches with 27/35/41/45 seats. Right?
  3. 2010 and 2011 wording: please check the event lists. "Champions League" is kept exactly as they wrote it.
  4. For true 3D (turn-around models), send GLB/3D files; we can swap them in.

## 16 Nov 2026 — third batch of photos on the Drive

The client added 17 folders to the same Drive folder (`1qdNcyGTYRgfdjoGq1p1SuHD4KSHL2L9W`). The folders already used on 5 and 7 Nov were unchanged. Most new photos are professionally retouched: replaced skies and brighter colours. Built: 103 photos (sRGB JPEG, ≤1600px, no EXIF): 93 new shots, plus 10 retouched versions that replace live raw photos. All were placed by number plate. On the cards below they lead the gallery, with the renders kept after them.
- Toyota Camry Hybrid (DL 1NA 4149, silver): 7, on both Camry cards. Its rear shot was also in the "cruiser hyryder" folder.
- Toyota Urban Cruiser Hyryder (HR55BC1228): 7.
- Range Rover (HR55BB9999, LWB with rear screens): 11, on the "Range Rover (Vogue / Autobiography / LWB)" card. That card used to show the black **Range Rover Sport** renders, which are a different car, so they were taken off it and stay only on the Sport card.
- Rolls-Royce Ghost (HR55AY9999): 5 WhatsApp screenshots. Skipped `10.03.24`, a near-copy of `10.03.06`.
- Mercedes-Benz V-Class (HR55AU0999, black): 8.
- Toyota Vellfire (HR55AU3333): 8. The dashboard and captain-seat shots (IMG_9257, IMG_9259) were in "volvo without washroom", but they're the Vellfire's interior from the same shoot.
- Tempo Traveller (HR55AM8452): 7. This answers the 7 Nov "still no real photos" note.
- Toyota Hiace (DL 1VC 4241): 10.
- Force Urbania (DL 1VC 4204): 7, on **both** Urbania cards (Modified 9/12 seater and standard 13/17 seater), the same way the renders were shared.
- Toyota Coaster (DL 1VC 4387): 7.
- Audi Q7 (HR55AN1111): 3. Skipped the screenshot, a blurrier second front of the same car.
- Mercedes-Benz Sprinter (HR55AU0567, silver): the 6 retouched shots from "mercedes benz sprinter", followed by 6 older raw photos of the same van. Those raw photos used to be on the **Sprinter with Washroom** card (`Real/Mercedes Sprinter Washroom/01–09.jpg`). The client now files this van as the plain Sprinter, and its rear shot shows a luggage area, not a washroom. So the 6 non-duplicate raw photos moved to `Mercedes-Benz Sprinter 12 seater/sprinter-silver-*.jpg`. 01, 05 and 06 were dropped as older copies of the retouched front, rear-row and recliner shots. The chat widget's fleet image pointed at `02.jpg` and now points at its new path. Skipped the folder's screenshot, a second front.
- Mercedes Sprinter with Washroom: now the client's black van with blue seats ("sprinter with washroom" folder), 3 photos. The card had no renders, so it shows just these 3.
- Sprinter Executive Lounge (HR55AU1294): the folder's one screenshot leads the card, at `center 100%` so the plate shows.
- Jet on Wheels and Volvo Coach (Luxury): "volvo jet" (UP16 JT3973) and "volvo without washroom" (DL 1PD 8981) hold retouched versions of the raw photos already live. Each retouched shot replaces its raw original in the same slot. They're saved as `*-v2.jpeg` with the raw file deleted, because `next/image` caches optimized images by URL and could keep serving the old picture under a reused name. New: a luggage-bay shot on Jet on Wheels, and a freezer and luggage-bay shot on the Volvo Coach. IMG_9289 was the same frame as IMG_9288, so it was used once. The retouched Jet front frames the bus larger, so the cover now sits at `center 80%` (logos, grille and plate) instead of `center 55%`. The TOURIST header no longer fits on the card.
- Wide side shots (Camry, Hyryder) use `contain` in their slot so the car isn't cut off. Portrait fronts and rears whose plate fell out of the 16:9 modal moved to `center 85%` / `center 80%`.
- Checked on a local production build in headless Chrome: 18 cards across all 5 tabs show the new covers. Every image on those cards (215) loads through `/_next/image`, with no console errors or failed requests.
- **Ask the client:**
  1. The silver Sprinter (HR55AU0567) was on the "Sprinter with Washroom" card. We moved it to the plain Sprinter card, going by your folder names, and put the black van with blue seats on the washroom card. Is that right?
  2. The grey Urbania (DL 1VC 4204) is on both Urbania cards (9/12 seater modified and 13/17 seater). Should it be on just one of them?
  3. The "5 series" folder has a BMW X7 photo (HR55BA0222), which is already on the X7 card. Can you send BMW 5 Series photos?
  4. Real photos still needed for: Ertiga, Kia Carens, Ford Endeavour, BMW X5, Volvo XC90, Mercedes GLE, Range Rover Sport, Kia Carnival, Volvo Coach with Washroom, and the BMW 5 Series (the last three show studio images).

## 7 Nov 2026 — reply to the 5 Nov photo questions, plus more photos (WhatsApp)

Their reply "1) yes 2) yes 3) sending" answers the three questions from 5 Nov, in order. They also said "I have added new files onto the drive, please add them to the website by tonight".
1. **Coach placement is right.** No change.
2. **Jet on Wheels cover → their orange bus.** Built: `jet-on-wheels-front-real.jpeg` is now `image[0]` (`center 55%`, so the card keeps the TOURIST header, Mann logos and grille). The black studio front moved to its old slot, before the renders.
3. **More real photos.** The same Drive folder (`1qdNcyGTYRgfdjoGq1p1SuHD4KSHL2L9W`) gained 9 folders dated 27 Oct. Built: 39 photos, sRGB JPEG, no EXIF, leading the galleries with the renders kept after them. Folder names didn't match the contents again, so photos were placed by number plate and shoot location:
   - Honda City (HR55AN4642): 4, on both City cards.
   - Innova Crysta (HR55BA1072): 5, on all five Crysta cards. Four of them were in the "fortune white" folder.
   - Innova Hycross (HR55AN2287): 4, on all four Hycross cards. The boot and middle-row shots were in "innova crysta" but match the Hycross's plate, black bumper and paved shoot location, and sit between its other shots in the camera numbering.
   - Fortuner: black (HR55AW7412) 5, then white (HR55AW0934) 5, on both Fortuner cards.
   - E-Class (DL 1NA 4203, E 220d): 5, on both E-Class cards. The side, rear, rear seat and boot shots were in "s class"/"black fortune". All were shot on the same tiled forecourt, and the boot shot's full-width chrome bumper strip matches the E's.
   - S-Class (DL 1NA 4067, S 450): 4, on both S-Class cards. The side, rear and rear seat shots were in "black fortune".
   - BMW 7 Series (DL 1NA 4024): 3. IMG_8491 was in the folder twice; used once.
   - GLS 450 (HR55BA4444): 4, ahead of the older real GLS photos already on both GLS cards.
   - Portrait shots crop to 4:3 on cards and 16:9 in the modal, so fronts sit at `center 70%` (plate and grille in frame) and rears at `center 60%`.
- Live 7 Nov (PR #41).
- **Still no real photos for:** Tempo Traveller (they named it in point 3 of our ask), and the other cars that show only renders.

## 31 Oct 2026 — booking email fixes (WhatsApp + marked-up email printout)

1. **Bookings → info@ only**, not support@. Support@ is for complaints and other problems, like a client who can't make a booking. Built: the booking email goes to info@ alone; support@ stays on the footer's App support, the guest email's helpline row and signature, and a "Still stuck?" line on the failed-send screen.
2. **No. of Days counts both ends**: 31 Oct → 1 Nov = 2 days. Built.
3. **"Residence Address" → "Reporting Address"** on the form and in the email. Built.
4. **Vehicle Type = the cars in that segment.** Their printout had "Economy (segment)" with "Dzire, Hyundai Aura, Hyundai Accent" written next to Vehicle Type. Built: Vehicle Type is now a dropdown of the cars in the chosen Vehicle Preference, from the fleet page plus Dzire and Accent, which aren't on the fleet page. Other segments' lists were made from the fleet page, so the client should check them.
5. **WhatsApp for booking queries: 9810008008.** That was already the site's WhatsApp number; it's now shown on the form and in the guest email.
6. **"Verify on mail also"**: asked the client to submit a test booking (see below). We haven't sent a real one; the live checks intercepted the request.
- Points 1–5 shipped in PR #39, live 31 Oct.
- Their other questions (code sent to Mann Fleet? SEO updates? Google Ads?) Pranav answered them on WhatsApp, 31 Oct.

**Sent on WhatsApp, 31 Oct**, numbered like their message. Points 1–5 reported live. It asked them to (a) submit a test booking and confirm it arrives on info@ only, and (b) say if any car should be added to or removed from a segment.
- **Waiting on:** their test-booking confirmation, and any segment list changes. A reply like "received on info" answers (a). Car names in their reply answer (b): edit `SEGMENT_VEHICLES` in `src/app/reservation/page.tsx`.
- **Vercel env fix, before their test:** their printout's From line read `RESERVATION_FROM=MANN Fleet Partners <noreply@…>`, so the Vercel value includes its own key name. Change the value to `MANN Fleet Partners <noreply@mannfleetpartners.com>` and redeploy. Still not done as of 31 Oct: no deployment after `58f92b2`. If their test mail still shows `RESERVATION_FROM=`, this is why.

## 28 Oct 2026 — reservation emails (WhatsApp)

1. **Bookings → support@**, **guest gets a confirmation** in the format of their own "Reservation Confirmation Details" mail, and the booking details ("auto fetched": date of travel, end date, city, airport, hotel, residence, drop-off) **also go to info@**. Built: one booking email to support@ + info@, and the guest copy in their table format. Sent from `noreply@mannfleetpartners.com` via Resend. Their second sample (vehicle no., driver name/mobile) is sent after a car is allotted, so the website can't send it.
2. **"Airport Name" → "Airport Name / Residence"**, and a **Vehicle Type** field under Vehicle Preferences (Sedan, SUV / MUV, Tempo Traveller, Coach / Bus, Vanity Van; pre-filled from the fleet card's type). Built.
- **Waiting on:** `RESEND_API_KEY` and `RESERVATION_FROM` set in Vercel (Production), then a redeploy. Until then the live form shows the manual fallback.

## 19 Oct 2026 — "Website changes" Google Doc

Sent as a Google Doc plus Subhayu's forward of the client's "Integration of the financial system in our website" email thread.
1. **Add these company names** (25-row table pasted as an image). Ten already had logos in the home-page marquee. All 25 now run as a names row under the logos (PR #33, live 19 Oct, checked in real Chrome in dark and light mode). Casing was normalised and billing locations like "(Karnataka)" dropped. "J S Summits, Ministry of External Affairs" and "Ministry of External Affairs" are kept as two entries, as the client listed them.
2. **Payment gateway possibilities** — answer the client; no code yet. Their Mann Tours site has `manntours.com/Atompay/` (Atom / NTT DATA, cards) and `manntours.com/RazorPay/`, each a PHP form (amount, name, email, mobile, address) that redirects to the gateway, which emails the customer a receipt. Mann Fleet Partners Limited is the same company renamed ("Previously known as Mann Tourist Transport Service Limited" in their signatures), so no new gateway account is needed. Both existing accounts still show the old name: the Atom receipt says "MANN TOURIST TRANSPORT SERVICE PVT LTD B2C", and `rzp.io/l/Ed2PYJw` says "MANN TOURIST TRANSPORT SERVICE PRIVATE LIMITED". The client asks Atom and Razorpay to update the business name and approve `mannfleetpartners.com`, then shares the API keys securely. After that we build a `/pay` page plus server routes (keys in Vercel env vars). The "QR code and payment receipt" mentioned in the thread weren't in the forward.
3. **Car images** — client will send; same as "Vehicle pictures" below.

**Sent on WhatsApp, 19 Oct**, numbered like the doc. 1 reported the names live. 2 said the existing Atom and Razorpay accounts can be reused, and asked them to (a) get the business name changed and `mannfleetpartners.com` approved, (b) share the API keys securely. It ended with the one open question: **Atom, Razorpay, or only one?** 3 said we'll upload car images when they arrive. A bare "both" or "Razorpay" in their reply answers point 2. We didn't ask about merging the two Ministry of External Affairs names.

## Waiting on the client (asked on WhatsApp, 11 Oct 2026)

The 11 Oct message reported everything from PRs #28, #30 and #31 together and asked three things. It replaced our 10 Oct WhatsApp, which was deleted. Their 10 Oct reply had answered our 8 Oct questions by number without quoting them, and point 1 never arrived.
- **1. Chatbot name:** asked them to resend point 1, which we think is the name. Currently "MANN Concierge"; see ChatWidget in CLAUDE.md for every place it appears.
- **2. Grand i10 Nios placement:** asked whether Sedans → Economy, next to the Aura, is right.
- **3. Team background and QR placement:** asked them to check both and say if they wanted a different colour or spot. We read their "any colour background" as the team photo backgrounds, and "next to contact" as the navbar, the only place where Contact sits next to Corporate. If they meant the page background or the footer, redo those.
- **Vehicle pictures:** they said "sending more". The first batch shipped in PR #28; add the rest when they arrive.
  - **5 Nov batch (Google Drive folder `1qdNcyGTYRgfdjoGq1p1SuHD4KSHL2L9W`):** live 5 Nov (PR #40). Real photos now lead the Hyundai Aura (5), both Invicto cards (4), Jet on Wheels (10) and Volvo Coach (Luxury) (9) galleries, with the AI renders kept after them. Folder names didn't match the contents, so photos were placed by what they show:
    - `invicto/IMG_7376` is the Aura's rear (UP16 ST6051), so it went to the Aura.
    - `aura/IMG_4914` is a byte-identical copy of a bus interior shot, so it was skipped.
    - The "49 seater without washroom" folder has the Jet on Wheels plate (UP16 JT3973), recliners, a lounge and a washroom, so it went to Jet on Wheels.
    - The "49 seater" folder (DL 1PD 8981, no washroom) went to Volvo Coach (Luxury), which lists 49/53 seaters.
    - Skipped `invicto/IMG_7354`, the same photo as the live `invicto-black-front-2.jpeg`; near-duplicates IMG_4917 and IMG_4920; and IMG_4952 (wiring/DVR box).
    - **Ask the client:** is that coach placement right, and should the real orange Jet on Wheels front replace the black studio cover?
  - **Sent on WhatsApp, 5 Nov**, in Pranav's own words, so the exact wording and numbering may differ from this draft. The draft reported the photos live and asked three questions. (1) Is the coach placement right? (2) Should the real orange Jet on Wheels front be the cover? (3) Real photos for the cars that still show only studio renders, most-booked first. Also nudge the open items: the test booking (31 Oct), Atom/Razorpay (19 Oct). The chatbot-name question (11 Oct) was left out on purpose. Point 1 never arrived, and the chatbot name was only our guess at what it was.
    - "Yes"/"correct" to (1) needs no change.
    - "Yes" to (2) means making `jet-on-wheels-front-real.jpeg` `image[0]` with an `imageIndexObjectPositions` entry, because it's portrait and needs its crop checked on the 4:3 card.
    - A "no" to (1) means swapping the two image sets between the `jet-on-wheels` and `volvo-luxury` entries.

## Done

- 7 Nov: Real photos for 8 more cars, and the orange Jet on Wheels as its cover, live (PR #41). Deployment of merge commit `fa1f373` reported `success`. On the live site, all 39 new photos md5-match the repo. In headless Chrome, all 21 cards for these cars across the 5 tabs show the new cover, and every gallery slide loads. All 19 routes return 200, with no console errors, failed requests or broken images.
- 5 Nov: Real fleet photos live (PR #40). Deployment of merge commit `47baf42` reported `success`. On the live site, all 28 new photos md5-match the repo, and the dropped duplicate (`invicto-black-front-3.jpeg`) returns 404. Every gallery slide of the Aura, both Invictos, Jet on Wheels and Volvo Coach (Luxury) was viewed in headless Chrome. All 19 routes return 200, with no console errors, failed requests or broken images. No nav overflow at 1440/1280/1200/1181px.
- 31 Oct: Booking email fixes live (PR #39). Bookings go to info@ only; inclusive day count; "Reporting Address"; Vehicle Type lists the cars in the chosen segment; WhatsApp 9810008008 for booking queries. Deployment of merge commit `58f92b2` reported `success`. On the live site, 20 form checks passed, plus the full flow (fleet card → Book Now → fill → submit, with the `/api/reservation` call intercepted so no email was sent). The page posted 2 days, the reporting address and the clicked car. All 15 routes return 200, no console errors.
- 19 Oct: Client names live (PR #33). On the live home page: 25 names, no broken logos, no console errors or failed requests, no horizontal overflow; the "Our Clients" heading now reads in light mode. Deployment of merge commit `882893e` reported `success`.

- 11 Oct: WhatsApp sent to the client reporting PRs #28, #30 and #31, with the three questions above. Live site re-checked after #31 first: all 14 routes clean, QR codes load before the panel opens (headless and real Chrome).
- 11 Oct: Thorough live check after PR #30. All 14 routes load with no console errors, failed requests or broken images. Every `public/teams` file md5-matches the repo, and the pages serve the new photos. The intro plays. The nav doesn't overflow at 1440/1280/1200/1181px, and the hamburger shows at 1180px. Both QR codes decode to the right store URLs. One fix shipped from it (PR #31): on the home page the QR tiles stayed blank for ~1.5s after opening, while the hero video was still downloading, so the panel is now always rendered (hidden) and the codes load with the page. The 483 asset paths referenced in pages all exist, so the GLE/GLS 404s in `notes/cars-needing-photos.md` are long fixed.
- 11 Oct: Built the two answers from the client's 10 Oct reply (PR #30). For point 2, every team member photo is cut out and placed on one warm studio-grey backdrop, across Meet the Team, the contact cards and the chat avatars. Ashwani Kumar's photo is a tight face crop and stays as it was. For point 4, a QR button between Contact and Corporate in the navbar opens the App Store and Google Play codes, and the mobile menu gets "Get the App". The nav pills also tighten on laptop widths so Book Now stops scrolling off the bar.
- 10 Oct: Intro now plays the client's `1s Logo.mp4` animation instead of the still ("Pls add this as the animation, don't fully remove it"). Real photos added: 2× black Invicto at the front of both Invicto galleries, and a new Hyundai Grand i10 Nios (white) card under Sedans → Economy (PR #28). Live files md5-verified, intro and cards checked in headless Chrome on the live site.
- 9 Oct (urgent, due 11am): Annual Report 2025-26 replaced with the client's full 116-page version, up from 71 pages (PR #27). Live copy md5-verified against the client's file and confirmed with them on WhatsApp.
- 8 Oct: Intro logo cut to 1 second, and an "Ask Us" box on `/faq` that sends the question to WhatsApp (PR #26, verified live).
- 5 Oct: Maharaja Agrasen Hospital utilisation certificate restored on We Care and the 13-3-24 donation receipt removed (PR #24). The client's "remove the CSR receipt" had been misread as "remove the certificate".
- Sept 30: Consolidated Financials 2025-26 added, Annual Report 2025-26 replaced (PR #23).
- Sept 23 chat: Board's Reports 2021-22 and 2022-23, Annual Report 2023-24, Industry Assessment Report added; restated report (31 Dec 2025) removed; Annual Return 2023-24 relabelled Form MGT-7 (PR via 9b6a91f).
