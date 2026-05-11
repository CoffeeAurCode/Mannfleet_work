# Cars Needing More Photos

Cars currently in the fleet with 0 valid images, only 1 image, or using a placeholder/Unsplash image.

---

## 🔴 Broken Images (404 / Invalid — 0 working photos)

These cars reference a folder (`GLS?/`) that **does not exist on disk**. All their images return 404.

| Vehicle ID | Display Name | Category | Type | Issue |
|---|---|---|---|---|
| `mercedes-gle` | Mercedes-Benz GLE | LUXURY | SUVs | All 6 images → missing `GLS?/` folder |
| `gls-450` | Mercedes-Benz GLS 400 / 450 | SUPER LUXURY | SUVs | All 6 images → missing `GLS?/` folder |

**Root cause:** folder on disk is named incorrectly or doesn't exist. The code references `/Mann car pictures/GLS%3F/...` (`?` encoded as `%3F`) but no such folder exists — only a single `GLS.png` file is present.

---

## Unique Models with ≤ 1 Image

| Model | Current Image | Appears In |
|---|---|---|
| Toyota Innova Crysta | `CRYSTA.png` | SUVs · Economy Plus, Self Driving (×2), Long Term Leasing (×2) |
| Toyota Fortuner | `Fortuner.png` | SUVs · Premium Plus, Self Driving |
| Tempo Traveller | Unsplash placeholder URL | Vanity Van · Economy |
| Toyota Coaster | `toyota commuter.jpeg` | Vanity Van · Premium Plus |
| Toyota Hiace | `14 seater toyota commuter.jpeg` | Vanity Van · Premium Plus |
| Vanity Coaches | `vellfire.jpeg` (wrong car!) | Coaches · Super Luxury |
| Kia Carnival Limousine | 1 image from Kia Carens folder | SUVs · Luxury |
| Mercedes-Benz GLS 400 (Monthly Lease) | `GLS.png` | Long Term Leasing |

---

## Full List of Affected Fleet Entries

| Vehicle ID | Display Name | Category | Type | Image Count | Status |
|---|---|---|---|---|---|
| `mercedes-gle` | Mercedes-Benz GLE | LUXURY | SUVs | 0 | 🔴 All 404 |
| `gls-450` | Mercedes-Benz GLS 400 / 450 | SUPER LUXURY | SUVs | 0 | 🔴 All 404 |
| `crysta` | Toyota Innova Crysta | ECONOMY PLUS | SUVs | 1 | |
| `fortuner` | Toyota Fortuner | PREMIUM PLUS | SUVs | 1 | |
| `kia-carnival-limousine` | Kia Carnival Limousine | LUXURY | SUVs | 1 | |
| `tempo-traveller` | Tempo Traveller | ECONOMY | Vanity van | 1 (Unsplash) | |
| `toyota-coaster` | Toyota Coaster | PREMIUM PLUS | Vanity van | 1 | |
| `toyota-hiace` | Toyota Hiace | PREMIUM PLUS | Vanity van | 1 | |
| `vanity-coach` | Vanity Coaches | SUPER LUXURY | Coaches | 1 (wrong car) | |
| `sd-crysta-7` | Toyota Innova Crysta (Self Drive) | SELF DRIVING | Self Driving | 1 | |
| `sd-crysta-8` | Toyota Innova Crysta (Self Drive) | SELF DRIVING | Self Driving | 1 | |
| `sd-fortuner` | Toyota Fortuner (Self Drive) | SELF DRIVING | Self Driving | 1 | |
| `lt-crysta-7` | Toyota Innova Crysta (Monthly Lease) | LONG TERM LEASING | Long Term Leasing | 1 | |
| `lt-crysta-8` | Toyota Innova Crysta (Monthly Lease) | LONG TERM LEASING | Long Term Leasing | 1 | |
| `lt-gls` | Mercedes-Benz GLS 400 (Monthly Lease) | LONG TERM LEASING | Long Term Leasing | 1 | |

---

## Priority Notes

- **Mercedes-Benz GLE & GLS 400/450** — completely broken, show no images at all. The `GLS?/` folder needs to be created and populated, or the image paths need to be fixed.
- **Vanity Coaches** — currently using `vellfire.jpeg` which is a photo of the Vellfire, not a vanity coach. Needs correct images.
- **Tempo Traveller** — using an Unsplash URL (external dependency). Should be replaced with local images.
- **Kia Carnival Limousine** — using a single image from the Kia Carens folder (different car). Needs its own dedicated photos.
- **Toyota Innova Crysta & Toyota Fortuner** — each used across 3–5 fleet entries; adding multiple photos to one set fixes all entries that share the same image path.
